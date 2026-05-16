# BugFlow

**Track issues, organize fixes, ship cleaner releases.**

A fully functional bug tracker built from scratch in React + TypeScript. Built as a learning project during a career transition from Software QA Engineering to Development.

---

## Live Demo

[bugflow-v2.vercel.app](https://bugflow-v2-hd7vhsowm-zujaja-s-projects.vercel.app)

---

## Features

- **Create bugs** — title, description, severity, priority, status, estimate
- **Edit bugs** — modal pre-fills with existing data, updates in place
- **Delete bugs** — removes from list instantly
- **Search** — real-time filtering by title and description
- **Filter** — filter by severity, priority, and status simultaneously
- **Sort** — most recently updated bug always appears first
- **Persist** — bugs saved to localStorage, survive page refresh
- **Stats** — live bug counts by status in the Overview panel
- **Responsive** — works on mobile and desktop

---

## Tech Stack

| Layer       | Technology                 |
| ----------- | -------------------------- |
| Frontend    | React 18                   |
| Language    | TypeScript                 |
| Build tool  | Vite                       |
| Styling     | CSS (custom, no framework) |
| Persistence | localStorage               |
| Deployment  | Vercel                     |

---

## Project Structure

```
src/
├── App.tsx          # Main component — state, handlers, layout
├── BugCard.tsx      # Reusable bug card component
├── types.ts         # TypeScript interfaces and union types
├── dateUtils.ts     # Timestamp formatting utilities
├── App.css          # All styles
└── main.tsx         # Entry point
```

---

## What I Learned

- React fundamentals — components, props, state, controlled inputs
- `useState` and `useEffect` hooks
- Lifting state up — passing functions as props
- TypeScript — interfaces, union types, typed state, typed props
- localStorage persistence with JSON serialization
- Array methods — `.map()`, `.filter()`, `.sort()`
- Conditional rendering
- Component decomposition
- Git workflow — branching, committing, merging
- Deployment with Vercel

---

## Run Locally

```bash
git clone https://github.com/zujaja7/bugflow-v2
cd bugflow-v2
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## What's Next

- Backend API with Node.js + Express
- MongoDB database (replace localStorage)
- Playwright automated tests
- GitHub Actions CI/CD pipeline
- TypeScript depth — typed hooks, reusable types

---

_Built by a Software QA Engineer learning to build what she used to test._
