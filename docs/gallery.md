# Photo galleries

Each past conference can have a photo gallery, shown on that year's tab on
[/past-events](https://dddsouthwest.com/past-events) (e.g. `/past-events#2024`).

The photos live in a Cloudflare R2 bucket, not in this repo. Each top-level folder in the bucket is
one year's gallery. The site reads the bucket when it builds, so adding or removing photos is a
dashboard upload followed by a rebuild. No code changes, no pull request.

> **Status:** this is the agreed design. The build-time code, the `/past-events` changes and the
> "Run workflow" button described below have not been built yet. See
> [Implementation plan](#implementation-plan) at the end of this file.

---

## At a glance

| What              | Where                                                              |
| ----------------- | ------------------------------------------------------------------ |
| Bucket            | R2 bucket `dddsw-gallery` in the DDD South West Cloudflare account |
| Public address    | `https://photos.dddsouthwest.com/<year>/<file>`                    |
| Where they show   | The year's tab on `/past-events`                                   |
| Make changes live | GitHub → Actions → **Deploy** → **Run workflow** (on `main`)       |
| Captions/alt text | Optional `_captions.json` in each year folder                      |

---

## Adding photos to a year

1. **Remove location data first.** The original files are publicly downloadable, and phone or
   camera photos often include GPS coordinates. Do one of:
   - macOS Photos: _File → Export_ and untick **Include location information**.
   - Lightroom: in Export → Metadata, tick **Remove Location Info**.
   - Command line: `exiftool -gps:all= -overwrite_original *.jpg`
2. **Resize if they're huge (optional).** Anything up to about 4000px on the long edge is fine. The
   site serves resized copies, so the originals only need to be big enough to look good full screen.
3. Open the Cloudflare dashboard → **R2** → **dddsw-gallery**.
4. Open the year's folder, or create it with **Create folder**. The folder name must be just the
   four-digit year (`2026`), because it is matched to the year on `/past-events`. A folder for a
   year that isn't in `src/lib/content/pastEvents.ts` is ignored.
5. Upload the photos into that folder. For very large sets, see
   [Uploading lots of files](#uploading-lots-of-files).
6. **Rebuild the site** (see [Making changes live](#making-changes-live)).

### File names and order

Photos are shown in **filename order**. Camera filenames (`IMG_4012.jpg`, `DSC_0031.jpg`) are
already in the order they were taken, so usually there's nothing to do. To control the order
yourself, prefix the names with numbers:

```
2026/
├── 001-registration.jpg
├── 002-opening-keynote.jpg
├── 010-lunch.jpg
└── _captions.json
```

Use lowercase letters, numbers and hyphens, and keep `.jpg`, `.jpeg`, `.png`, `.webp` or `.avif`
as the extension. Files of other types, and files whose names start with `_`, are not shown as
photos.

---

## Captions, alt text and credits

Every photo needs alt text for screen readers. Without anything else, a photo gets a generic one
("Photo from DDD South West 2026"). Better descriptions go in an optional `_captions.json` file in
the year's folder:

```json
{
	"credit": "Photos by Jane Smith",
	"photos": {
		"002-opening-keynote.jpg": {
			"alt": "A full lecture theatre watching the opening keynote"
		},
		"010-lunch.jpg": {
			"alt": "Attendees queueing for lunch in the café",
			"featured": true
		}
	}
}
```

- `credit`: shown once under the gallery.
- `photos.<file>.alt`: the alt text. Describe what's in the photo, not "photo of…".
- `photos.<file>.featured`: shown first on the year's tab, before "Show all photos".
- `photos.<file>.credit`: overrides the gallery credit for one photo.

The dashboard can't edit files in place. To change captions, download `_captions.json`, edit it,
upload it again (replacing the old one), then rebuild. A broken JSON file fails the build with an
error naming the file, so the live site keeps the previous version.

---

## Removing a photo (takedown requests)

If someone asks for a photo of them to be removed:

1. Delete the file from the year's folder in the dashboard. It stops loading straight away, though
   Cloudflare's cache can keep serving resized copies for a short while.
2. Remove its entry from `_captions.json` if it has one.
3. **Rebuild the site** so the gallery stops listing it.
4. If it needs to disappear immediately: Cloudflare dashboard → `dddsouthwest.com` zone →
   **Caching** → **Purge cache** → purge by prefix `photos.dddsouthwest.com/<year>/<file>`.

Reply to the person once it's done. Our [privacy policy](https://dddsouthwest.com/privacy-policy)
is the place to say how to ask.

---

## Making changes live

The site only learns what's in the bucket when it builds. After uploading, deleting or changing
captions:

1. GitHub → **Actions** → **Deploy** workflow.
2. **Run workflow**, branch `main`.
3. The new gallery is live when the run goes green (a few minutes).

Any normal merge to `main` also picks up bucket changes, so if a deploy is going out anyway you
don't need to trigger one separately.

Pull request previews read the same bucket, so they show the real galleries too.

---

## Uploading lots of files

The dashboard is fine for a few dozen photos at a time. For a few hundred, use
[rclone](https://developers.cloudflare.com/r2/examples/rclone/) or wrangler with an R2 API token
that has **Object Read & Write** on `dddsw-gallery`:

```sh
# rclone, after configuring a remote called "r2"
rclone copy ./ddd-2026-photos r2:dddsw-gallery/2026 --progress

# or one file at a time with wrangler
npx wrangler r2 object put dddsw-gallery/2026/001-registration.jpg --file=./001-registration.jpg --remote
```

The same rules apply: strip location data first, then rebuild.

---

## How it works

For people working on the site code.

### Serving

- The bucket is connected to `photos.dddsouthwest.com` as an R2 custom domain. The `r2.dev` public
  URL stays **disabled**.
- Pages never link to the originals. Every `<img>` uses Cloudflare
  [Image Transformations](https://developers.cloudflare.com/images/transform-images/) on that
  domain, e.g.
  `https://photos.dddsouthwest.com/cdn-cgi/image/width=800,quality=80,format=auto/2026/001-registration.jpg`.
  That gives each browser an AVIF/WebP at a suitable size, and strips camera metadata from what is
  served. The originals are still public at their plain URL, which is why location data has to be
  removed before uploading.
- `srcset` offers a few fixed widths (e.g. 400, 800, 1200, 1600, 2400). Keep the list short:
  billing counts each unique image + options combination.

### At build time

Pages on this site are rendered by the Cloudflare worker on each request, not prerendered, and the
worker has no R2 credentials. So the bucket is read by a Vite plugin, in Node, during `vite build`
(the same pattern as the social card plugin in `vite.config.ts`). The plugin bakes the result into
the bundle as a virtual module that `/past-events` imports. The plugin:

1. Lists the bucket's top-level folders (`ListObjectsV2` with `delimiter=/`) via R2's
   S3-compatible API, signed with `aws4fetch`.
2. Keeps the folders whose name is a year in `pastEvents`.
3. Lists each year's objects, keeps the image files, sorts them by key and reads `_captions.json`
   if there is one.
4. Gets each photo's width and height from
   `https://photos.dddsouthwest.com/cdn-cgi/image/format=json/<key>`, so the layout reserves the
   right space before photos load. This works for any upload, including dashboard ones.
5. Exports `{ year → photos[] }` for the page. The year's tab shows the featured photos (or the first
   few) in the existing grid, with "Show all N photos" to expand, and opens a photo full screen in
   a `<dialog>` with keyboard and swipe navigation.

If the R2 credentials aren't set (e.g. a contributor's machine), the plugin exports no
galleries and logs a warning, so the site still builds and runs. A request that fails during a
build **with** credentials fails the build, so production never deploys with galleries silently
missing.

The 2024 photos currently stored in `src/lib/assets/images/past/` (the `photos` field in
`pastEvents.ts`) move into the bucket's `2024/` folder, and that field and the folder are removed.

### Configuration

| Variable                | Used for                                         | Set in                                 |
| ----------------------- | ------------------------------------------------ | -------------------------------------- |
| `CLOUDFLARE_ACCOUNT_ID` | R2 S3 endpoint (`<id>.r2.cloudflarestorage.com`) | GitHub secret (already exists), `.env` |
| `R2_ACCESS_KEY_ID`      | Read-only R2 token, access key                   | GitHub secret, `.env`                  |
| `R2_SECRET_ACCESS_KEY`  | Read-only R2 token, secret                       | GitHub secret, `.env`                  |
| `R2_GALLERY_BUCKET`     | Bucket name (`dddsw-gallery`)                    | `deploy.yml` env, `.env`               |
| `GALLERY_BASE_URL`      | `https://photos.dddsouthwest.com`                | `deploy.yml` env, `.env`               |

`deploy.yml` also gets a `workflow_dispatch:` trigger for the **Run workflow** button.

---

## One-time setup

Done once by someone with admin access to the Cloudflare account and the GitHub repo.

1. **Create the bucket:** R2 → **Create bucket** → `dddsw-gallery`, location automatic.
2. **Public domain:** bucket → **Settings** → **Custom Domains** → **Connect Domain** →
   `photos.dddsouthwest.com`. Leave **R2.dev subdomain** disabled.
3. **Enable transformations:** `dddsouthwest.com` zone → **Images** → **Transformations** → enable
   for the zone. Under allowed origins, allow `photos.dddsouthwest.com` only.
4. **Read-only token for the build:** R2 → **Manage API tokens** → **Create API token** →
   permission **Object Read only**, applied to `dddsw-gallery` only. Save the access key ID and
   secret as the GitHub secrets `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY`.
5. **Dashboard access for organisers:** anyone who uploads needs a Cloudflare account member role
   with R2 access to the account.
6. **Move the 2024 photos** from `src/lib/assets/images/past/` into `2024/` in the bucket, with
   their existing alt text in `2024/_captions.json`.

### Costs

At our size this should stay within the free tiers:

- **R2:** 10 GB storage and millions of reads a month free, and no charge for downloads.
- **Image Transformations:** 5,000 unique transformations a month free, then $0.50 per 1,000. Each
  photo uses one per width in `srcset` plus one for the build's size lookup, mostly in the month
  it's added.

Check the Cloudflare billing page after the first big upload.

---

## Implementation plan

> **Remove this section once the gallery is built.** It is a working plan, not documentation. When
> the last step is done, delete everything from this heading down, delete the **Status** note at
> the top, and make sure [How it works](#how-it-works) describes what was actually built (names,
> paths, anything that changed along the way).

Each step is meant to be a separate pull request. Steps 2–4 can merge before the bucket has any
photos in it: with no credentials, or an empty bucket, nothing changes on the site.

### 1. Cloudflare and GitHub setup

- [ ] Steps 1–4 of [One-time setup](#one-time-setup): bucket, `photos.dddsouthwest.com`,
      transformations, read-only token saved as GitHub secrets.
- [ ] Upload a test photo to `2024/` and check that both of these load in a browser:
  - `https://photos.dddsouthwest.com/cdn-cgi/image/width=400,format=auto/2024/<file>`
  - `https://photos.dddsouthwest.com/cdn-cgi/image/format=json/2024/<file>` (returns the width and
    height as JSON)

### 2. Gallery data: types and pure functions

Code that turns a bucket listing into gallery data, kept free of network calls so it can be unit
tested.

- [ ] `src/lib/gallery/types.ts`: `GalleryPhoto` (`key`, `width`, `height`, `alt`, `credit?`,
      `featured`) and `Gallery` (`year`, `credit?`, `photos`).
- [ ] `src/lib/gallery/captions.ts`: parse and check `_captions.json`. Unknown fields, captions
      for files that don't exist, and invalid JSON are errors that name the file and year.
- [ ] `src/lib/gallery/build.ts`: from a list of keys, the captions and the image sizes, build one
      year's `Gallery`. Keeps image extensions only, skips `_`-prefixed files, sorts by key, puts
      featured photos first and fills in the generic alt text.
- [ ] `src/lib/gallery/urls.ts`: `photoUrl(key, width)` and `photoSrcset(key)` for the
      `/cdn-cgi/image/` URLs, with the widths list (400, 800, 1200, 1600, 2400) in one place.
- [ ] Vitest tests next to each file (`*.test.ts`), covering ordering, featured, skipped files,
      missing captions, bad captions.

### 3. Reading the bucket: Vite plugin

- [ ] Add `aws4fetch` (request signing) and `fast-xml-parser` (S3 list responses are XML) as dev
      dependencies. Both are build-time only and never reach the worker.
- [ ] `src/lib/server/gallery/r2.ts`: list the year folders (`delimiter=/`), list each folder
      (following `ContinuationToken` past 1,000 objects), fetch `_captions.json`, and fetch each
      photo's size from the `format=json` URL with a limit of about 8 requests at a time.
- [ ] `src/lib/server/gallery/plugin.ts`: a Vite plugin `dddsw:gallery` that serves a virtual
      module `virtual:dddsw/gallery` exporting `galleries: Record<number, Gallery>`.
  - Reads the variables in [Configuration](#configuration) with Vite's `loadEnv`.
  - No credentials: exports `{}` and logs one warning.
  - Credentials set but R2 fails, or a captions file is invalid: throws, so the build fails.
  - A year folder that isn't in `pastEvents`: logs a warning and skips it.
  - `GALLERY_FIXTURE=<path to JSON>`: exports that file instead of calling R2, for tests and
    offline work.
  - Dev server: reads the bucket once at start-up. Restart it to pick up new uploads.
- [ ] Register the plugin in `vite.config.ts` and declare the virtual module's type (e.g. in
      `src/app.d.ts`).
- [ ] `.env.example` listing the variables, with the secrets left blank.

### 4. Gallery on the year tabs

- [ ] `src/lib/components/Gallery.svelte`: the existing grid from `/past-events`, fed by a
      `Gallery`. Shows the featured photos, or the first 6, then a **Show all N photos** button
      (`aria-expanded`) that reveals the rest. Plain `<img>` with `srcset`, `sizes` (the values
      already in the page), `width`/`height`, `loading="lazy"` and `decoding="async"`. Credit
      underneath.
- [ ] `src/lib/components/Lightbox.svelte`: a `<dialog>` opened by clicking a photo. Previous and
      next buttons, arrow keys, swipe, "3 of 120", the alt text as a caption, Escape to close, and
      focus returned to the photo that opened it. Loads the 2400px version only for the photo on
      screen and its neighbours.
- [ ] `src/routes/past-events/+page.svelte`: import `galleries` from `virtual:dddsw/gallery` and
      replace the current `e.photos` section with `<Gallery>` when the year has one.
- [ ] Playwright:
  - Set `GALLERY_FIXTURE` to a small fixture (e.g. `tests/fixtures/gallery.json`) in the web
    server env in `playwright.config.ts`, so tests never depend on R2.
  - Use `page.route('https://photos.dddsouthwest.com/**', …)` to answer image requests with a
    local placeholder, so tests don't go out to the network.
  - Add a spec for show all, opening and closing the lightbox, keyboard navigation and focus
    return. The axe test for Past events then covers the gallery too.
  - Update the visual comparison screenshots.

### 5. Deploying from the bucket

- [ ] `.github/workflows/deploy.yml`:
  - Add `workflow_dispatch:` to `on:`.
  - Run the production deploy step for `push` **or** `workflow_dispatch`, and only when
    `github.ref == 'refs/heads/main'`, so the button can't deploy another branch to production.
  - Pass `CLOUDFLARE_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`,
    `R2_GALLERY_BUCKET` and `GALLERY_BASE_URL` to the **Build** step.
- [ ] Check that a PR preview shows the real galleries, and that **Run workflow** on `main`
      deploys production.

### 6. Move the 2024 photos into the bucket

- [ ] Upload `src/lib/assets/images/past/*.jpg` to `2024/` and write `2024/_captions.json` with the
      existing alt text from `pastEvents.ts`, keeping their current order with number prefixes.
- [ ] Remove the `photos` field and `Photo` type from `src/lib/content/pastEvents.ts`.
- [ ] Remove `past` from the photos glob in `src/lib/images.ts`, delete
      `src/lib/assets/images/past/`, and drop the `photos` part of
      `src/lib/content/images.test.ts`.

### 7. Finish

- [ ] Rewrite [How it works](#how-it-works) to match the code as built.
- [ ] Delete the **Status** note at the top and this whole section.

### Later, if it's needed

- Rebuild automatically on upload: R2 event notifications → a Queue → a small Worker that sends a
  `repository_dispatch` to GitHub, debounced so a batch upload starts one build.
- A local upload script that resizes, strips location data and drafts `_captions.json`, if the
  dashboard turns out to be too manual.
