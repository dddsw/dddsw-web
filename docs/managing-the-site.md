# Managing the site

How to run the site through the year: what it shows at each stage, the switches that turn things on and off, how to preview a state before it happens, and the scripts you'll need.

- [How state works](#how-state-works)
- [What shows at each stage](#what-shows-at-each-stage)
- [Switches](#switches)
- [Previewing a state](#previewing-a-state)
- [Running the year](#running-the-year)
- [Scripts](#scripts)
- [Known gaps](#known-gaps)

## How state works

Two things decide what the site shows:

1. **The milestones** in `src/lib/milestones.ts`: the stages of the year, from planning to the day after the event. Each one is:
   - `Status.Done`: it has happened.
   - `Status.NotYet`: it hasn't, and has no date.
   - `Status.JustYouWait, '2027-04-24'`: it happens on that date, at midnight UTC.
2. **Switches** in `src/lib/eventDetails.ts` and `src/lib/content/sponsors.ts`: links and settings that, while empty or `false`, keep something hidden or show "coming soon".

Pages are rendered on each request, not at build time, so a milestone with a date takes effect on that date without a deploy. Marking one `Done` takes effect when the change is deployed (merged to `main`).

A milestone only has a date on the site if it's `JustYouWait`. Give one to any milestone whose date you want to announce: the timeline shows it, and the home page warns a month before the call for speakers opens.

## What shows at each stage

Each stage starts when its milestone happens. Pages not listed here (venue, about, sponsorship, past events and so on) are always there.

| Stage (milestone that starts it)                                                   | Header button    | Main nav adds or removes                                    | Home page                                                                         |
| ---------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Planning** (`StartPlanning`)                                                     | none             | Become a speaker                                            | "Planning has begun"                                                              |
| **Date set** (`SetADate`)                                                          | none             |                                                             | Event date and countdown, once `TheActualEventDay` has a date                     |
| **Call for papers open** (`OpenCallForSpeakers`)                                   | Submit a talk    |                                                             | "Call for speakers is open until…", with the Sessionize link                      |
| **Call for papers closed** (`CloseCallForSpeakers`)                                | none             | − Become a speaker                                          | "Session voting will be opening soon"                                             |
| **Voting open** (`OpenSessionVoting`)                                              | Vote on sessions | + Sessions (every proposed session)                         | "Session voting is now open", with the voting link                                |
| **Voting closed** (`CloseSessionVoting`)                                           | none             | − Sessions (until the schedule is announced)                | "Ticket registration will be opening on…"                                         |
| **Schedule announced, tickets open** (`AnnounceScheduleAndOpenTicketRegistration`) | Tickets          | + Schedule, + Speakers, + Sessions (accepted sessions only) | "Get your free ticket" button, schedule and speaker cards, "the schedule is live" |
| **Sold out** (`SoldOut`)                                                           | Tickets          |                                                             | "Sold out, join the waitlist"                                                     |
| **More tickets** (`FoundMoreTickets`)                                              | Tickets          |                                                             | "Some tickets have become available"                                              |
| **Event day** (`TheActualEventDay`)                                                | none             | + Pocket DDD                                                | "Today is the day", countdown says "Today!"                                       |
| **After the event** (`ConkedOut`, the day after)                                   | none             | − Pocket DDD                                                | "See you in <next year>", countdown says "See you next year"                      |

On every stage, the timeline on the home page ticks off what's done and shows the dates of what's coming.

The pages behind the header buttons are always reachable (from the footer and by address) and explain their own state:

| Page                     | Before                            | During                                                                             | After                               |
| ------------------------ | --------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------- |
| `/call-for-papers`       | "Isn't open yet"                  | "Go to Sessionize" button                                                          | "Has closed"                        |
| `/become-a-speaker`      | Guidance only                     | Adds a "Ready to speak?" box                                                       | Guidance only                       |
| `/session-voting`        | "Isn't open yet"                  | "Go to the voting form" (or "link hasn't been added yet")                          | "Has closed"                        |
| `/tickets`               | "Tickets aren't available yet"    | "Get your free ticket", as soon as `ticketTailorUrl` is set                        | (follows the link, not a milestone) |
| `/schedule`, `/speakers` | "To be announced" and not indexed | The programme from Sessionize, once `sessionizeJsonApiUrl` is set and has sessions |                                     |

If two buttons' windows overlap, the later one wins: tickets, then voting, then the call for papers.

## Switches

Things you can turn on and off without touching a milestone.

| To…                                  | Set                                                                              | In                            |
| ------------------------------------ | -------------------------------------------------------------------------------- | ----------------------------- |
| Show the schedule and speakers       | `sessionizeJsonApiUrl` to the event's Sessionize API URL                         | `src/lib/eventDetails.ts`     |
| Open ticket registration             | `ticketTailorUrl`                                                                | `src/lib/eventDetails.ts`     |
| Add the voting form                  | `votingUrl`                                                                      | `src/lib/eventDetails.ts`     |
| Enable "Support DDDSW" donations     | `giveUrl` (a Stripe payment link)                                                | `src/lib/eventDetails.ts`     |
| Show "To be confirmed" for the venue | `event.venue.name` and `city` to `null`                                          | `src/lib/eventDetails.ts`     |
| Show "To be confirmed" for the date  | `TheActualEventDay` to `NotYet` (also hides the countdown and "Add to calendar") | `src/lib/milestones.ts`       |
| Hide sponsor logos on the home page  | `showSponsors = false`                                                           | `src/lib/eventDetails.ts`     |
| Hide sponsorship prices              | `showSponsorPrices = false`                                                      | `src/lib/eventDetails.ts`     |
| Show a sponsor                       | Add them to `sponsors` (or move them from `sponsorArchive`)                      | `src/lib/content/sponsors.ts` |
| Mark a package or meal slot as taken | `claimed: true` on it                                                            | `src/lib/content/sponsors.ts` |
| Move the attendee progress bar       | `seatMilestonesReached` and `seatProgressToNext` (0–100)                         | `src/lib/content/sponsors.ts` |
| Change the year                      | `eventYear` (the call for papers and Pocket DDD links follow)                    | `src/lib/eventDetails.ts`     |

Everything with no sponsors is handled: the home page leaves the section out, and the sponsorship page says none have been announced yet.

## Previewing a state

Add `?preview=` to any address to see what's hidden. It only changes what's linked (the header button, nav and home page cards), not what a page says; to see a page's open state, change its milestone locally.

| Add to any address  | Shows                                                      |
| ------------------- | ---------------------------------------------------------- |
| `?preview=cfp`      | The **Submit a talk** button                               |
| `?preview=voting`   | The **Vote on sessions** button                            |
| `?preview=tickets`  | The **Tickets** button, plus **Schedule** and **Speakers** |
| `?preview=schedule` | **Schedule** and **Speakers** (`speakers` works too)       |
| `?preview=none`     | No header button                                           |
| `?preview=off`      | Back to the real state                                     |

Combine them with commas (`?preview=voting,schedule`). A preview lasts for the rest of the browser tab, and a previewed button has a dashed outline so it's never mistaken for the real one.

To try a whole stage locally, edit `src/lib/milestones.ts` and run `npm run dev`. Don't commit it.

## Running the year

### After a conference

1. Archive it: run the [past year import](#importing-a-past-year) while `sessionizeJsonApiUrl` still points at that event, and add the year to `src/lib/content/pastEvents.ts`.
2. Move this year's `sponsors` into `sponsorArchive`, clear any `claimed`, and set the progress bar back to `0`.
3. Set `eventYear` to the next year, and empty `sessionizeJsonApiUrl`, `votingUrl` and `ticketTailorUrl`.
4. In `milestones.ts`, set everything after `StartPlanning` back to `NotYet`, and give `TheActualEventDay` and `ConkedOut` their new dates once known.

### Through the year

| When                       | Do                                                                                                        |
| -------------------------- | --------------------------------------------------------------------------------------------------------- |
| Dates agreed               | Give each milestone its date (`JustYouWait`). The site moves through the stages on its own.               |
| Venue confirmed            | Fill in `event.venue`.                                                                                    |
| Before voting opens        | Set `sessionizeJsonApiUrl` and `votingUrl` (see [known gaps](#known-gaps)).                               |
| Before tickets open        | Set `ticketTailorUrl`.                                                                                    |
| Sold out, or tickets found | Set `SoldOut` or `FoundMoreTickets` to `Done` (no dates for these; they're decided on the day).           |
| Sponsors confirmed         | Add them to `sponsors` with their logo in `src/lib/assets/images/sponsors/`, and update the progress bar. |

## Scripts

You need Node 24 (`.node-version`). Pass a script's own options after `--`.

### Day to day

| Command                                | What it does                                                             |
| -------------------------------------- | ------------------------------------------------------------------------ |
| `npm run dev`                          | Runs the site locally at http://127.0.0.1:5173.                          |
| `npm run build`, `npm run preview`     | Builds the site as it's deployed, and serves that build.                 |
| `npm run check`                        | Type-checks the app.                                                     |
| `npm run lint`, `npm run lint:fix:all` | Checks, or fixes, formatting and lint across the repo.                   |
| `npm run test:unit`                    | The unit tests (Vitest). Also run on every commit.                       |
| `npm run test`, `npm run test:ui`      | The Playwright tests, in the terminal or the interactive runner.         |
| `npm run test:update-screenshots`      | Regenerates the visual comparison screenshots after a deliberate change. |

### Importing a past year

Fills in the past events page and speaker directory from Sessionize. Run it after each conference.

```sh
npm run import:past-year -- <year> <source> [--dry-run] [--no-photos]

# e.g. from Sessionize's "flattened accepted sessions" export
npm run import:past-year -- 2027 ~/Downloads/"ddd-south-west-2027 flattened accepted sessions - exported 2027-05-20.xlsx" --dry-run

# or from the Sessionize API id or URL
npm run import:past-year -- 2027 5mpx9tl7
```

Always do a `--dry-run` first and check the report, especially **Check: same person?**. Running it again with the same source changes nothing. The full guide, including what each part of the report means, is [importing-past-years.md](importing-past-years.md).

### Regenerating the social media images

```sh
npm run generate:social-assets
```

Rebuilds the profile pictures, banners and post backgrounds on `/media-assets` into `static/social-assets/`. Run it after changing `src/lib/socialAssets.ts`, the cow, or the brand colours, and commit the images. (The image shown when a link is shared, `/og-image.png`, is made by the build, so it needs no script.)

## Known gaps

Things to watch for until they're fixed:

- **`/sessions` errors while `sessionizeJsonApiUrl` is empty.** It appears in the nav once voting opens, so set the URL before `OpenSessionVoting`.
- **Messages link to empty addresses.** The home page messages and `/sessions` link to `votingUrl` and `ticketTailorUrl` without checking they're set. Set them before their milestones.
- **The "Speak at DDDSW" card stays on the home page** after the call for papers closes, though "Become a speaker" leaves the nav.
- **The home page message can lag a dated milestone.** It's worked out when the server starts rather than on each request, so it may change a little after midnight rather than exactly on it. A deploy updates it straight away.
