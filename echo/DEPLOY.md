# Deploying Echo

Echo is a static site: no build step, no server code. Upload the **contents of this folder**
(`index.html`, `src/`, `styles/`, …) and it runs. `serve.ps1` / `start.cmd` are only for running it
locally and can be ignored (or kept) on the web.

---

## Which destination?

| Destination | URL you get | Best for |
| --- | --- | --- |
| New GitHub repo **`echo`** on your personal account | `https://sanjeevsharmasan.github.io/echo/` | Clean, isolated, doesn't touch your existing homepage. **Recommended.** |
| A folder **`echo/`** inside the repo behind `gccventuresindia.com` | `https://gccventuresindia.com/echo/` | Company/branded URL, already HTTPS, no DNS work. |

> Do **not** upload these files to the root of an existing site repo — `index.html` would replace
> the homepage. Always put them in their own repo, or inside an `echo/` folder.

Both destinations are already GitHub Pages, so no new hosting account is needed.

---

## Option A — new repo `echo` (recommended)

1. Go to **github.com/new**.
2. Repository name: `echo` → **Public** → **Create repository**.
3. On the empty repo page, click **uploading an existing file**.
4. Drag the **contents** of this folder into the upload box.
   - `index.html` must end up at the **root** of the repo (next to `src` and `styles`), not inside an
     `Echo-Website` folder.
5. Click **Commit changes**.
6. Repo **Settings → Pages**:
   - Source: **Deploy from a branch**
   - Branch: **main**, folder **/(root)**
   - **Save**
7. Wait 1–2 minutes. Open **https://sanjeevsharmasan.github.io/echo/**.

To link it from your personal site, add a card/link in the **Apps by Sanjeev** section pointing to
`https://sanjeevsharmasan.github.io/echo/` (or simply `/echo/`).

---

## Option B — `gccventuresindia.com/echo`

1. Open the GitHub repository that powers `gccventuresindia.com` (the one with the `CNAME` file
   containing `gccventuresindia.com`).
2. Create the folder first: **Add file → Create new file**, type `echo/.nojekyll` as the name,
   commit. This creates the `echo` folder.
3. Open the `echo` folder in the repo, then **Add file → Upload files**.
4. Drag the **contents** of this folder into `echo/` so the result is:
   ```
   echo/index.html
   echo/src/...
   echo/styles/...
   ```
5. Commit. No Pages or DNS changes are needed — the custom domain is already configured.
6. Wait 1–2 minutes, then open **https://gccventuresindia.com/echo/**.

If GitHub's upload box refuses a folder, upload the top-level files first, then use **Add file →
Upload files** again from inside `src/` and `styles/` to add those folders.

---

## After deploying

- **Phone:** open the URL → browser menu → **Add to Home Screen**. HTTPS is automatic, so the
  microphone permission works.
- **Microphone:** browsers only allow it on `https://` or `localhost` — both destinations qualify.
- **First Whisper use** downloads the model (~45–260 MB) from the CDN, then it is cached per browser.
  Choose **Tiny** on phones.
- **Data stays local:** transcripts, projects, settings and audio live in each browser's storage and
  IndexedDB. The public site only contains the app code. Nothing is sent to GitHub.
- **Never hard-code a Soniox key.** Keys are entered in Settings and stay in that browser only.
- **Backups:** Settings → Your data → **Export** downloads a JSON with all transcripts/projects.
  Audio recordings are not in that JSON — download them per transcript (**More → Download audio**).

## Updating the site

Upload the changed files again (or push with git). Then hard-refresh (`Ctrl+F5`) or open the URL with
`?v=2` to bypass browser cache. GitHub Pages itself usually updates within a minute.

## Notes

- Repo must be **public** for free GitHub Pages. Only the code is public — never your transcripts.
- `.nojekyll` is included to stop GitHub's Jekyll processing. It is harmless and can stay.
- `README.md` is the full app documentation; it will show on the repo's front page.
- If a file 404s after upload, confirm the folder layout: `index.html` at the app root, with `src/`
  and `styles/` beside it.
