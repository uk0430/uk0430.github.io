# Portfolio Site — uk0430.github.io

> Master context: `~/.claude/CLAUDE.md`
> Last synced: 2026-03-19

**Repo:** `~/uk0430.github.io/`
**Status:** Offline (GitHub Pages disabled). Local preview at localhost:8888.
**Deploy:** `git add . && git commit -m "..." && git push` → re-enable Pages in GitHub Settings first.

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Main portfolio page |
| `assets/style.css` | All styles — 5 theme variable blocks, components |
| `assets/main.js` | cycleTheme(), scroll animations, terminal, GitHub activity |
| `assets/auth.js` | Password gate for private pages (uk0430 / 1) |
| `changelog.json` | Devlog data — edit this to add notebook entries |
| `changelog.html` | Notebook page — renders changelog.json with category filters |
| `noc-data.json` | NOC board source of truth |
| `projects/tankpit.html` | TankPit Bot deep-dive |
| `projects/scraper.html` | Data Pipeline deep-dive |
| `projects/homelab.html` | Home Network Lab deep-dive |

## Private Pages (gitignored — local only, auth: uk0430 / 1)

`ops.html`, `noc.html`, `tracker.html`, `runbook.html`, `vault.html`

## Theme System

5 themes cycled via `data-theme` attribute on `<html>`:
- `dark` (default) — near-black + sky blue accent
- `warm` — cream + rust (also sets `html.light` class for legacy compat)
- `sepia` — paper brown + warm brown accent
- `terminal` — black + green
- `nord` — muted blue-gray palette

FOUC prevented by blocking IIFE at top of `main.js` and `auth.js`.
Theme stored in localStorage, restored on every page load.

## Design Tokens

```css
--accent: #38bdf8   --green: #34d399
--amber:  #fbbf24   --purple: #a78bfa
```

Fonts: Syne (display), IBM Plex Mono, IBM Plex Sans
No phone/email on public site — LinkedIn + GitHub only.

## Notebook / Devlog

Add entries by prepending to `changelog.json`:
```json
{ "date": "YYYY-MM-DD", "cat": "portfolio|tankpit|homelab|learning|ops", "title": "...", "body": "..." }
```
Git commits auto-log via `~/.git-hooks/post-commit`.

## Next Steps

- [ ] GoatCounter analytics (signup at goatcounter.com)
- [ ] Resume auto-update via GitHub Action
- [ ] Re-enable GitHub Pages when ready to go public
