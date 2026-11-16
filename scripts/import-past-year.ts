// Imports a past year's talks and speakers from Sessionize into src/lib/content/past/, for the past
// events page and the speaker directory. Safe to run again: the same source changes nothing.
//
//   npm run import:past-year -- <year> <source> [--dry-run] [--no-photos]
//
// <source> is a Sessionize "accepted sessions" export (.xlsx), or the event's Sessionize API id or
// URL (https://sessionize.com/api/v2/<id>). See docs/importing-past-years.md.
import { readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as prettier from 'prettier';
import type { Talk } from '../src/lib/content/pastEvents.ts';
import type { PastSpeaker } from '../src/lib/content/pastSpeakers.ts';
import {
	fromSessionizeApi,
	fromSessionizeExport,
	importYear,
	type ImportedTalk
} from '../src/lib/content/past/importYear.ts';
import { readXlsx } from './xlsx.ts';

const root = (path: string) => fileURLToPath(new URL(`../${path}`, import.meta.url));
const pastDir = root('src/lib/content/past/');
const talksDir = `${pastDir}talks/`;
const photosDir = root('src/lib/assets/images/past-speakers/');

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const [yearArg, source] = args.filter((a) => !a.startsWith('--'));
const dryRun = flags.has('--dry-run');
const withPhotos = !flags.has('--no-photos');
const year = Number(yearArg);

if (!Number.isInteger(year) || year < 2000 || !source) {
	console.error(
		'Usage: npm run import:past-year -- <year> <export.xlsx | Sessionize API id or URL> [--dry-run] [--no-photos]'
	);
	process.exit(1);
}

async function readSource(): Promise<ImportedTalk[]> {
	if (/\.xlsx$/i.test(source)) {
		const named = /\b(20\d\d)\b/.exec(source.split('/').at(-1) ?? '')?.[1];
		if (named && Number(named) !== year) {
			throw new Error(`${source} looks like ${named}'s export, not ${year}'s`);
		}
		return fromSessionizeExport(readXlsx(source));
	}
	const id = /^(?:https:\/\/sessionize\.com\/api\/v2\/)?([a-z0-9]+)\/?/i.exec(source)?.[1];
	if (!id) throw new Error(`${source} isn't an .xlsx file or a Sessionize API id or URL`);
	const res = await fetch(`https://sessionize.com/api/v2/${id}/view/All`);
	if (!res.ok) throw new Error(`Sessionize responded ${res.status} for ${id}`);
	return fromSessionizeApi(await res.json());
}

const readJson = <T>(path: string): T => JSON.parse(readFileSync(path, 'utf8'));

async function writeJson(path: string, data: unknown) {
	const options = await prettier.resolveConfig(path);
	writeFileSync(path, await prettier.format(JSON.stringify(data), { ...options, filepath: path }));
}

const extensions: Record<string, string> = {
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/webp': 'webp',
	'image/gif': 'gif',
	'image/avif': 'avif'
};

/** Saves a speaker's photo as past-speakers/<id>.<ext>, replacing any they had. */
async function downloadPhoto(id: string, url: string): Promise<string> {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`${res.status} for ${url}`);
	const type = res.headers.get('content-type')?.split(';')[0] ?? '';
	const ext = extensions[type];
	if (!ext) throw new Error(`Unexpected image type "${type}" at ${url}`);
	for (const file of readdirSync(photosDir)) {
		if (file.replace(/\.[^.]+$/, '') === id) rmSync(`${photosDir}${file}`);
	}
	writeFileSync(`${photosDir}${id}.${ext}`, Buffer.from(await res.arrayBuffer()));
	return `past-speakers/${id}.${ext}`;
}

const talksByYear: Record<number, Talk[]> = Object.fromEntries(
	readdirSync(talksDir)
		.filter((f) => /^\d{4}\.json$/.test(f))
		.map((f) => [Number(f.slice(0, 4)), readJson<Talk[]>(`${talksDir}${f}`)])
);
const speakers = readJson<Record<string, PastSpeaker>>(`${pastDir}speakers.json`);
const aliases = readJson<Record<string, string>>(`${pastDir}aliases.json`);

const imported = await readSource();
const result = importYear({ year, talks: imported, talksByYear, speakers, aliases });
const { report } = result;

const list = (heading: string, items: string[]) => {
	if (!items.length) return;
	console.log(`\n${heading} (${items.length}):`);
	for (const item of items) console.log(`  - ${item}`);
};

console.log(
	`${year}: ${report.talks} talks from ${source}${dryRun ? ' (dry run: nothing written)' : ''}`
);
list('Added talks', report.added);
list('Removed talks (in the file, not in the source)', report.removed);
list('Left out: accepted but never scheduled', report.unscheduled);
list('New speakers', report.newSpeakers);
list(
	'Changed job titles (earlier talks keep the old one)',
	report.jobChanges.map((c) => `${c.id}: "${c.from}" → "${c.to}"`)
);
list(
	'Check: same person? If so, add their name to src/lib/content/past/aliases.json and run again',
	report.possibleDuplicates.map((d) => `"${d.name}" (${d.id}) looks like "${d.like}"`)
);

if (!dryRun && withPhotos) {
	for (const { id, url } of result.photos) {
		try {
			result.speakers[id].photo = await downloadPhoto(id, url);
			console.log(`Photo: ${result.speakers[id].photo}`);
		} catch (err) {
			console.warn(`Couldn't download ${id}'s photo: ${(err as Error).message}`);
		}
	}
} else if (result.photos.length) {
	console.log(
		`\n${dryRun ? 'Would download' : 'Skipped (--no-photos)'}: ${result.photos.length} photos`
	);
}

const sortedSpeakers = Object.fromEntries(
	Object.entries(result.speakers).sort(([a], [b]) => a.localeCompare(b))
);
const changes: [file: string, data: unknown][] = [
	...Object.entries(result.talksByYear).map(([y, talks]): [string, unknown] => [
		`talks/${y}.json`,
		talks
	]),
	...(JSON.stringify(sortedSpeakers) !== JSON.stringify(speakers)
		? [['speakers.json', sortedSpeakers] as [string, unknown]]
		: [])
];
if (!changes.length) {
	console.log('\nNo changes: the data files already match the source.');
}
for (const [file, data] of changes) {
	if (dryRun) {
		console.log(`Would change ${file}`);
	} else {
		await writeJson(`${pastDir}${file}`, data);
		console.log(`Wrote ${file}`);
	}
}

// The talks only appear once the year has an entry on the past events page.
const pastEvents = readFileSync(root('src/lib/content/pastEvents.ts'), 'utf8');
if (!new RegExp(`\\byear: ${year},`).test(pastEvents)) {
	console.log(
		`\nNext: add ${year} to \`events\` in src/lib/content/pastEvents.ts (title, date, venue, summary…).` +
			' Its talks show once it is there; until then a unit test fails to remind you.'
	);
}
