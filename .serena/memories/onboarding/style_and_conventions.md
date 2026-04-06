# Style and Conventions: dexhelper

## General Guidelines

- **Language**: TypeScript is the primary language.
- **Components**: Functional components with hooks.
- **Styling**: Use Tailwind CSS 4 utility classes.
- **State**: Use Zustand for global state and TanStack Query for server state.
- **Utilities**: Use `clsx` and `tailwind-merge` (`cn` utility in `src/utils/cn.ts`) for class composition.

## Testing Standards

Following the project's `testing_rules.md`:
- **New Features**: Must include appropriate tests (Unit, Component, Integration, or E2E).
- **Bug Fixes**: Write a test to reproduce the bug *before* fixing it (Test-First Approach).
- **Visual Accuracy**: Critical UI must have screenshot tests using Argos CI (`argosScreenshot`).
- **Visual Resolutions**:
  - Desktop FullHD: 1920x1080
  - Desktop 1440p: 2560x1440
  - Mobile Pixel 9: Pixel 9 standard viewport.
- **Mocking**: Follow existing patterns in `src/hooks/useAssistant.test.ts`.

## Code Formatting

- Relies on Vite/TypeScript defaults.
- Always run `npm run lint` (`tsc --noEmit`) to verify types.
