# BugFlow

**Track issues, organize fixes, ship cleaner releases.**

A fully functional bug tracker built from scratch in React + TypeScript. Built as a learning project during a career transition from Software QA Engineering to Development.

---

## Live Demo

[bugflow-v2.vercel.app](https://bugflow-v2.vercel.app)

---

## Features

- **Create bugs** — title, description, severity, priority, status, estimate
- **Edit bugs** — modal pre-fills with existing data and updates in place
- **Delete bugs** — removes bugs from the list instantly
- **Search** — real-time filtering by title and description
- **Filter** — filter by severity, priority, and status simultaneously
- **Sort** — most recently updated bug appears first
- **Persist** — bugs are saved to localStorage and survive page refresh
- **Stats** — live bug counts by status in the Overview panel
- **Reset filters** — clears search and filter selections
- **Responsive UI** — works on mobile and desktop

---

## Tech Stack

| Layer       | Technology                 |
| ----------- | -------------------------- |
| Frontend    | React                      |
| Language    | TypeScript                 |
| Build tool  | Vite                       |
| Styling     | CSS (custom, no framework) |
| Persistence | localStorage               |
| Testing     | Playwright                 |
| CI          | GitHub Actions             |
| Deployment  | Vercel                     |

---

## Project Structure

```text
src/
├── App.tsx          # Main component — state, handlers, layout
├── BugCard.tsx      # Reusable bug card component
├── types.ts         # TypeScript interfaces and union types
├── dateUtils.ts     # Timestamp formatting utilities
├── options.ts       # Shared dropdown option values
├── App.css          # App styling
└── main.tsx         # Entry point
```

---

## Run Locally

```bash
git clone https://github.com/zujaja7/bugflow-v2
cd bugflow-v2
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Testing

This project includes Playwright end-to-end tests for creating, editing, deleting, searching, filtering, resetting filters, and empty states.

Run tests:

```bash
npx playwright test
```

Run production build:

```bash
npm run build
```

---

## CI/CD

This project uses GitHub Actions to run build and Playwright tests on pushes and pull requests.

---

## What I Learned

- React fundamentals — components, props, state, and controlled inputs
- `useState` and `useEffect` hooks
- Passing functions as props
- TypeScript interfaces, union types, typed state, and typed props
- localStorage persistence with JSON serialization
- Array methods — `.map()`, `.filter()`, `.sort()`
- Conditional rendering and empty states
- Component decomposition and shared utility files
- End-to-end testing with Playwright
- Git workflow — branching, committing, merging
- CI checks with GitHub Actions
- Deployment with Vercel

---

## What's Next

- Backend API with Node.js + Express
- MongoDB database to replace localStorage
- Deeper CI/CD workflow and deployment automation

---

_Built by a Software QA Engineer learning to build what she used to test._
