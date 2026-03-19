# Portfolio Site — uk0430.github.io

> Full master context: `~/.claude/CLAUDE.md`

**Repo:** `~/uk0430.github.io/` | **Live:** uk0430.github.io
**Deploy:** `git add . && git commit -m "..." && git push` → GitHub Pages auto-deploys

## Key Files
| File | Purpose |
|------|---------|
| `index.html` | Main portfolio page |
| `assets/style.css` | All shared styles (dark/light mode vars, components) |
| `assets/main.js` | Theme toggle, accordion, scroll animations |
| `noc-data.json` | **SOURCE OF TRUTH** for NOC board — Claude edits this |
| `projects/tankpit.html` | TankPit Bot deep-dive page |
| `tracker.html` | Job tracker (private, localStorage) |
| `ops.html` | Ops dashboard (kanban, scraper log, bot status) |
| `noc.html` | NOC/Jira project tracker (reads noc-data.json) |

## Design
- Dark default, light mode toggle (saved to localStorage)
- Fonts: Syne (display), IBM Plex Mono, IBM Plex Sans
- Colors: `--accent #38bdf8`, `--green #34d399`, `--amber #fbbf24`, `--purple #a78bfa`
- No phone/email on public site — LinkedIn and GitHub only

## Private Pages (not in public nav)
- `/ops.html` — linked from footer `[ops]` and terminal `cd ops`
- `/noc.html` — linked from footer `[noc]` and terminal `cd noc`
- `/tracker.html` — linked from footer `[tracker]` and terminal `cd tracker`

## NOC Board Updates
1. Edit `noc-data.json` (tickets array), update `"lastUpdated"` at top
2. `git add noc-data.json && git commit -m "noc: ..." && git push`

### Ticket schema
```json
{
  "id": "PROJECT-NNN",
  "project": "TANKPIT|BIBLE|PORTFOLIO|MAIL|HOMELAB|SCRIPTS",
  "title": "short title",
  "description": "longer description",
  "status": "backlog|in-progress|review|done|idea",
  "priority": "P1|P2|P3|idea",
  "notes": "any notes",
  "created": "YYYY-MM-DD",
  "updated": "YYYY-MM-DD"
}
```

## Next Steps
- [ ] GoatCounter analytics (needs signup at goatcounter.com)
- [ ] Resume auto-update via GitHub Action (auto-regenerate from work history)
- [ ] More project pages + blog/notes section
