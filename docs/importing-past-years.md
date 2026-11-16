# Importing a past year's talks and speakers

The [past events page](../src/routes/past-events/+page.svelte) and the [speaker directory](../src/routes/speaker-directory/+page.svelte) are built from data files. You don't need to change any page code to add a year. `npm run import:past-year` fills in the data files from Sessionize after each conference, and can rebuild any year since 2023.

## After each conference

1. **Get the year's sessions from Sessionize.** Use either of these:
   - **The export:** Sessionize's Excel export of the event's **accepted sessions**, in the **flattened** layout: the file Sessionize names like `ddd-south-west-2027 flattened accepted sessions - exported ….xlsx`. Keep the year in the file name; the script checks it matches.
   - **The API:** the event's Sessionize API id, e.g. `5mpx9tl7`, or its URL, `https://sessionize.com/api/v2/5mpx9tl7`. This is the id that `sessionizeJsonApiUrl` in `src/lib/eventDetails.ts` uses during the year, so do this before that's changed for the next event.

2. **Do a dry run.** It shows what would change and writes nothing:

   ```sh
   npm run import:past-year -- 2027 ~/Downloads/"ddd-south-west-2027 flattened accepted sessions - exported 2027-05-20.xlsx" --dry-run
   ```

3. **Go through the report** (see [What the report tells you](#what-the-report-tells-you)), especially **Check: same person?**

4. **Run it for real.** Use the same command without `--dry-run`. It writes the data files and downloads new speakers' photos.

5. **Add the year to the past events page.** If `src/lib/content/pastEvents.ts` doesn't have the year yet, the script reminds you. Add an entry to `events` (newest first) with what Sessionize doesn't know: `title`, `date`, `venue`, `summary`, `sponsors`, `committee`, `logo`, `photos`, `archiveUrl`. A unit test fails until the entry is there, so a year's talks can't be left off the page.

6. **Check it and commit.** Run `npm run dev`, look at `/past-events` and `/speaker-directory`, run the tests (`npm run test:unit`, then `npm run test:update-screenshots` if pages changed on purpose), and commit the data files, photos and screenshots together.

## Usage

```sh
npm run import:past-year -- <year> <source> [--dry-run] [--no-photos]
```

| Argument      | What it does                                                                               |
| ------------- | ------------------------------------------------------------------------------------------ |
| `<year>`      | The conference year, e.g. `2027`.                                                          |
| `<source>`    | A Sessionize export (`.xlsx`), or the event's Sessionize API id or URL.                    |
| `--dry-run`   | Prints the report without writing anything.                                                |
| `--no-photos` | Writes the data but doesn't download photos (e.g. offline). Run again later to fetch them. |

You need Node 24, the version in `.node-version`, which runs the TypeScript script directly.

Running it again with the same source changes nothing. That makes it safe to re-run after fixing something in Sessionize, adding an alias, or importing years out of order.

## Where the data lives

| File                                     | What's in it                                                                                                                                                       | Written by                            |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `src/lib/content/past/talks/<year>.json` | That year's talks: title, abstract, who gave it (`speaker`, `speakerIds`) and, in `speakerTaglines`, a speaker's job then if it isn't what their profile says now. | The importer (or by hand before 2023) |
| `src/lib/content/past/speakers.json`     | One profile per speaker, by id: name, tagline, bio, photo, and `year`, the most recent year they spoke, which the rest is from.                                    | The importer                          |
| `src/lib/content/past/aliases.json`      | Other names people have spoken under, pointing at the id they're known by. Shared with the speaker directory.                                                      | You                                   |
| `src/lib/assets/images/past-speakers/`   | Speaker photos, named by id.                                                                                                                                       | The importer                          |
| `src/lib/content/pastEvents.ts`          | Everything else about each year (date, venue, summary, sponsors, committee, logo, photos). It picks up each year's talks file automatically.                       | You                                   |

A speaker's id is their name in lower case with hyphens (`Ada Lovelace` → `ada-lovelace`), unless `aliases.json` says otherwise. It's also their anchor in the directory, e.g. `/speaker-directory#ada-lovelace`.

## What the importer does

The rules are in `src/lib/content/past/importYear.ts`, with tests alongside. `scripts/import-past-year.ts` only reads the source and writes the files.

- **It replaces the year's talks with what's in Sessionize.** Talks are listed in the order of the day: by time slot, then track.
- **It tidies the text.** It drops Windows line breaks, trailing spaces, runs of blank lines, and Markdown `**bold**` (the page shows abstracts as plain text). It also removes sponsor tags such as `[Brought to you by Seccl]` from titles.
- **It leaves out sessions that were accepted but never scheduled** (no time or room), e.g. a withdrawn talk. They're listed in the report.
- **It includes co-presenters.** In the export they're extra rows with a blank title. The talk's `speaker` reads "A and B" (or "A, B and C").
- **Speakers keep their latest job, and each talk keeps the job they had at the time:**
  - A new speaker gets a profile from this year, and their photo is downloaded.
  - If this is the most recent year a speaker has spoken, their profile takes this year's tagline, bio and photo. If their tagline changed, their earlier talks keep the old one in `speakerTaglines`, so the past events page shows the job they had then.
  - If they've spoken since (you're importing an older year), their profile is left alone. This year's talk records their tagline at the time if it was different.
  - A blank tagline or bio never replaces one we already have.
  - Profile names don't change. Someone who spoke as "Stu Lang" one year stays "Stuart Lang" if that's the name in their profile.

## What the report tells you

| Section                                    | What to do                                                                                                                                                                                                                                            |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Added talks** / **Removed talks**        | Check they're expected. Removed means it's in the file but not in Sessionize any more.                                                                                                                                                                |
| **Left out: accepted but never scheduled** | Usually a withdrawn talk. If it was actually given, give it a time slot in Sessionize and run again.                                                                                                                                                  |
| **New speakers**                           | People getting a profile for the first time.                                                                                                                                                                                                          |
| **Changed job titles**                     | Returning speakers whose profile moves to their new job; their earlier talks keep the old one.                                                                                                                                                        |
| **Check: same person?**                    | A new speaker's name is close to someone we know, e.g. "Stu Lang" and "Stuart Lang". If they're the same person, add their new name to `aliases.json`, pointing at their existing id (`"Stu Lang": "stuart-lang"`), and run again. If not, ignore it. |

## Rebuilding

Every year from 2023 can be rebuilt from its export, and the result matches what's committed. To rebuild everything, import the years oldest first:

```sh
for y in 2023 2024 2025 2026; do
  npm run import:past-year -- $y ~/Downloads/"ddd-south-west-$y"*"accepted sessions"*.xlsx
done
```

Years before 2023 weren't on Sessionize. Their talks came from archived copies of the old website, so their `talks/<year>.json` files are edited by hand. Those talks only have the speaker's name (no `speakerIds`). The speaker directory still lists them, and puts them with any later talks by the same person through their id or `aliases.json`.
