# Portfolio Site — uk0430.github.io

Personal portfolio for Uzair Khan, Network Operations Engineer.

## Structure
- index.html — main portfolio page
- assets/style.css — all shared styles (dark/light mode vars, components)
- assets/main.js — theme toggle, accordion, scroll animations
- projects/tankpit.html — TankPit Discord Bot deep dive page

## Deploy
git add . && git commit -m "message" && git push
GitHub Pages auto-deploys from main branch.

## Design
- Dark default, light mode toggle (saved to localStorage)
- Fonts: Syne (display), IBM Plex Mono, IBM Plex Sans
- Colors: --accent #38bdf8, --green #34d399, --amber #fbbf24, --purple #a78bfa
- No phone/email on public site — LinkedIn and GitHub only

## Next features to build
- Resume auto-update via GitHub Action + Claude API
- More project pages
- Blog/notes section
