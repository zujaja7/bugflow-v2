# BugFlow

**A bug tracking app built by a QA engineer who spent 5 years filing bug reports.**

Live: bugflow-v2.vercel.app

---

## Why I built this

After 5+ years in manual QA — writing hundreds of bug reports, tracking issues
across releases, and watching teams lose context on unstructured trackers — I
decided to build the tool I wished existed: clean, fast, and focused on what
matters to QA engineers and developers.

BugFlow is a fully functional bug tracker built in React + TypeScript with
Playwright end-to-end tests covering core user flows.

---

## Features

- Create, edit, delete bugs with title, description, severity, priority, status
- Real-time search and multi-filter (severity, priority, status)
- Sort by most recently updated
- Live stats overview by status
- Persistent storage — bugs survive page refresh
- Fully responsive — mobile and desktop

---

## Playwright test coverage

Covers: create, edit, delete, search, filter by all fields,
reset filters, and empty state rendering.

  npx playwright test

CI runs on every push via GitHub Actions.

---

## Tech stack

React + TypeScript · Vite · CSS (custom) · Playwright · GitHub Actions · Vercel

---

*Built by a QA engineer. Tested by a QA engineer.*