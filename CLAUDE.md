# Portfolio Site — uk0430.github.io

Personal portfolio for Uzair Khan, Network Operations Engineer.

## Structure
- index.html — main portfolio page
- assets/style.css — all shared styles (dark/light mode vars, components)
- assets/main.js — theme toggle, accordion, scroll animations
- projects/tankpit.html — TankPit Discord Bot deep dive page
- tracker.html — job application tracker (private, localStorage)
- ops.html — private ops dashboard (kanban, scraper log, bot status, quick links)
- noc.html — NOC/Jira project tracker (reads noc-data.json)
- noc-data.json — SOURCE OF TRUTH for all projects and tickets (Claude edits this)

## Deploy
git add . && git commit -m "message" && git push
GitHub Pages auto-deploys from main branch.

## Design
- Dark default, light mode toggle (saved to localStorage)
- Fonts: Syne (display), IBM Plex Mono, IBM Plex Sans
- Colors: --accent #38bdf8, --green #34d399, --amber #fbbf24, --purple #a78bfa
- No phone/email on public site — LinkedIn and GitHub only

## NOC / Project Tracker
noc.html reads noc-data.json on every load. To update the board:
1. Edit noc-data.json (tickets array)
2. Update "lastUpdated" field at top
3. git add noc-data.json && git commit -m "noc: ..." && git push

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

### Projects
- TANKPIT — TankPit Discord Bot (Python, SQLite, Railway)
- BIBLE — Bible RAG system (16,914 chunks, SQLite embeddings)
- PORTFOLIO — uk0430.github.io website
- MAIL — Mail/job email scraper scripts
- HOMELAB — Raspberry Pi, SNMP, Grafana, home network
- SCRIPTS — General automation and utility scripts

## Private pages (not in public nav)
- /ops.html — linked from footer [ops] and terminal `cd ops`
- /noc.html — linked from footer [noc] and terminal `cd noc`
- /tracker.html — linked from footer [tracker] and terminal `cd tracker`

## Next features to build
- Resume auto-update via GitHub Action + Claude API
- More project pages
- Blog/notes section
- GoatCounter analytics (needs signup at goatcounter.com)
