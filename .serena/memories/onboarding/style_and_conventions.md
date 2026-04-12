# Style and Conventions: dexhelper

## General Guidelines

- **Language**: TypeScript is the primary language.
- **Components**: Functional components with hooks.
- **Styling**: Use Tailwind CSS 4 utility classes.
- **State**: Use Zustand for global state and TanStack Query for server state.
- **Utilities**: Use `clsx` and `tailwind-merge` (`cn` utility in `src/utils/cn.ts`) for class composition.

## Testing Standards

Following the project's `testing_rules.md`:
- **New Features**: Must include appropriate tests (Unit or E2E). We prioritize an **E2E-First Strategy** for all UI-facing features.
- **Initialization**: All E2E tests must use `initializeWithSave(page)` from `tests/e2e/test-utils.ts` to ensure the application is correctly hydrated with a save file fixture.
- **Bug Fixes**: Write a test to reproduce the bug *before* fixing it (Test-First Approach).
- **Visual Accuracy**: Critical UI must have screenshot tests using Argos CI (`argosScreenshot`).
- **Visual Resolutions**:
  - Desktop FullHD: 1920x1080
  - Desktop 1440p: 2560x1440
  - Mobile Pixel 9: Pixel 9 standard viewport.
- **Mocking**: Follow existing patterns in `src/hooks/useAssistant.test.ts`.

## Visual Excellence & Design Standards

- **Premium UI**: Use curated color palettes, glassmorphism, and smooth gradients. Avoid generic styles.
- **Modern Retro**: Blend classic Pokédex aesthetics with high-fidelity modern UI patterns.
- **No Placeholders**: Never use placeholder images. Use `generate_image` or real assets.
- **Animations**: Implement subtle micro-animations and interactive transitions (hover effects, smooth state changes) to make the UI feel "alive".

## Code Analysis and Formatting

- **Biome**: Primary linter and formatter.
  - All CI checks and Git Hooks are strictly enforced to treat both errors and warnings as failures (using `--error-on-warnings`).
  - **Zero-Diagnostic Policy**: Even though `info` level diagnostics do not block the build, you MUST manually verify them during every check and fix them to maintain a zero-diagnostic state.
- **TypeScript**: Always run `npm run lint` (`tsc --noEmit`) to verify types.
