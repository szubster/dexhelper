# DexHelper

A premium Pokédex and storage viewer for Gen 1 and Gen 2 save files. Track your progress, view detailed stats, and use AI to complete your collection.

[View your app in AI Studio](https://ai.studio/apps/ee4bbb7f-4976-4972-af63-9c1344a51a04)

## Features
- **Save File Parsing**: Read Gen 1 and Gen 2 `.sav` files to analyze your collection and stats.
- **AI-Powered Insights**: Get tailored advice on completing your Pokédex using the Gemini API.
- **Detailed Storage Viewer**: Explore your PC boxes, party, and individual Pokémon stats.
- **Offline First**: Works locally and parses saves entirely in your browser.

## Tech Stack
- **Framework**: React 19, Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Routing & Data Fetching**: TanStack Router, TanStack Query
- **Testing**: Vitest, Playwright

## Getting Started

**Prerequisites:**
- Node.js (>=24.0.0)
- pnpm (>=10.33.0)

### 1. Install dependencies
```bash
pnpm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` (or create one) and set your Gemini API key:
```bash
GEMINI_API_KEY=your_api_key_here
```

### 3. Run the Development Server
```bash
pnpm dev
```
The app will be available at `http://localhost:3000`.

## Available Scripts

- `pnpm dev`: Starts the Vite development server.
- `pnpm build`: Builds the app for production.
- `pnpm preview`: Locally previews the production build.
- `pnpm lint`: Runs TypeScript type checking and style verification.

## Testing

This project uses **Vitest** for unit testing and **Playwright** for end-to-end (E2E) testing.

- `pnpm test`: Run unit tests using Vitest.
- `pnpm test:e2e`: Run Playwright E2E tests.
- `pnpm test:e2e:ui`: Run Playwright E2E tests in UI mode.
- `pnpm test:ct`: Run Playwright component tests.
