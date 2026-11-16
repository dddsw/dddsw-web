// Reads the first sheet of an .xlsx file into rows keyed by the header row. Just enough for a
// Sessionize export, so the importer doesn't need a spreadsheet library.
import { readFileSync } from 'node:fs';
import { inflateRawSync } from 'node:zlib';

/** The files in a zip archive, by name. */
function unzip(zip: Buffer): Map<string, Buffer> {
	// The central directory, found from the "end of central directory" record at the end.
	let end = zip.length - 22;
	while (end >= 0 && zip.readUInt32LE(end) !== 0x06054b50) end--;
	if (end < 0) throw new Error('Not a zip file (is it an .xlsx?)');
	const count = zip.readUInt16LE(end + 10);
	let at = zip.readUInt32LE(end + 16);
	const files = new Map<string, Buffer>();
	for (let i = 0; i < count; i++) {
		const method = zip.readUInt16LE(at + 10);
		const size = zip.readUInt32LE(at + 20);
		const nameLength = zip.readUInt16LE(at + 28);
		const skip = nameLength + zip.readUInt16LE(at + 30) + zip.readUInt16LE(at + 32);
		const local = zip.readUInt32LE(at + 42);
		const name = zip.toString('utf8', at + 46, at + 46 + nameLength);
		const start = local + 30 + zip.readUInt16LE(local + 26) + zip.readUInt16LE(local + 28);
		const data = zip.subarray(start, start + size);
		files.set(name, method === 8 ? inflateRawSync(data) : Buffer.from(data));
		at += 46 + skip;
	}
	return files;
}

/** XML text, with entities and Excel's _xHHHH_ escapes (e.g. _x000D_ for a carriage return) decoded. */
function text(xml: string): string {
	return xml
		.replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
		.replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'")
		.replace(/&amp;/g, '&')
		.replace(/_x([0-9a-f]{4})_/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

/** All the <t> text inside an element: a rich text string is split into runs. */
const runs = (xml: string) =>
	[...xml.matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)].map((m) => text(m[1])).join('');

export function readXlsx(path: string): Record<string, string | undefined>[] {
	const files = unzip(readFileSync(path));
	const shared = [
		...(files.get('xl/sharedStrings.xml')?.toString('utf8') ?? '').matchAll(/<si>([\s\S]*?)<\/si>/g)
	].map((m) => runs(m[1]));
	const sheetName =
		[...files.keys()].filter((n) => /^xl\/worksheets\/sheet\d+\.xml$/.test(n)).sort()[0] ?? '';
	const sheet = files.get(sheetName)?.toString('utf8');
	if (!sheet) throw new Error(`No worksheet in ${path}`);

	const grid = [...sheet.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)].map((row) => {
		const cells = new Map<string, string>();
		for (const cell of row[1].matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
			const column = /\br="([A-Z]+)\d+"/.exec(cell[1])?.[1];
			const type = /\bt="(\w+)"/.exec(cell[1])?.[1];
			const body = cell[2] ?? '';
			const value = /<v>([\s\S]*?)<\/v>/.exec(body)?.[1];
			if (!column) continue;
			if (type === 's' && value !== undefined) cells.set(column, shared[Number(value)]);
			else if (type === 'inlineStr') cells.set(column, runs(body));
			else if (value !== undefined) cells.set(column, text(value));
		}
		return cells;
	});

	const [header, ...rows] = grid;
	if (!header) return [];
	return rows.map((cells) =>
		Object.fromEntries([...header].map(([column, name]) => [name, cells.get(column)]))
	);
}
