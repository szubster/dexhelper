# Project Overview: dexhelper

`dexhelper` is a React-based web application designed as a Pokédex helper, likely for older generations of Pokémon games (Gen 1 and Gen 2). It includes features for parsing game saves, providing assistance for catching Pokémon, and viewing Pokémon details.

## Tech Stack

- **Core**: React 19, TypeScript 6, Vite 8.
- **Styling**: Tailwind CSS 4, Vanilla CSS, Lucide React (Icons), clsx & tailwind-merge.
- **State Management**: Zustand.
- **Routing**: TanStack React Router.
- **Data Fetching**: TanStack React Query.
- **Testing**:
  - **Unit Tests**: Vitest.
  - **E2E Tests (Primary)**: Playwright (E2E-first strategy).
  - **Visual Regression**: Argos CI (with `argosScreenshot`).
- **Game Engine**: Custom logic for parsing saves (`engine/saveParser`), navigating maps (`engine/mapGraph`), and suggesting actions (`engine/assistant`).

## Codebase Structure

- `src/`: Root of the source code.
  - `routes/`: Application routes and layout (TanStack Router).
  - `components/`: UI components, organized by domain (assistant, pokemon).
  - `hooks/`: Custom React hooks.
  - `engine/`: Core game logic, data, and assistant strategies.
  - `utils/`: Utility functions and API logic.
  - `store.ts`: Global state management with Zustand.
- `tests/`: End-to-end tests.
- `docs/`: Project documentation and guides.
- `public/`: Static assets.
