# Style and Conventions: dexhelper

## General Guidelines

- **Language**: TypeScript is the primary language.
- **Components**: Functional components with hooks.
- **Styling**: Use Tailwind CSS 4 utility classes.
- **State**: Use Zustand for global state and TanStack Query for server state.
- **Utilities**: Use `clsx` and `tailwind-merge` (`cn` utility in `src/utils/cn.ts`) for class composition.

## Testing Standards

Following the project's `.agents/rules/testing_rules.md` and `.foundry/docs/knowledge_base/agents/core_policies.md`:
- **New Features**: Must include appropriate tests (Unit or E2E). We prioritize an **E2E-First Strategy** for all UI-facing features.
- **Initialization**: All E2E tests must use `initializeWithSave(page)` from `tests/e2e/test-utils.ts` to ensure the application is correctly hydrated with a save file fixture.
- **Bug Fixes**: Write a test to reproduce the bug *before* fixing it (Test-First Approach).
- **Mocking**: Follow existing patterns in `src/hooks/useAssistant.test.tsx`.

## Visual Excellence & Design Standards

- **Tactical Hardware Aesthetic**: Adhere strictly to the "tactical hardware/snooping" aesthetic as defined in ADR 024. Use sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts (`font-mono`). Avoid rounded glassmorphism or overly slick holographic elements.
- **Modern Retro**: Blend classic Pokédex utility with specialized hardware UI patterns to evoke the feeling of a real device.
- **No Placeholders**: Never use placeholder images. Use `generate_image` or real assets.
- **Animations**: Prefer immediate, utilitarian state changes or blocky segmented loading effects over smooth web-standard transitions.

## Code Analysis and Formatting

- **Biome**: Primary linter and formatter.
  - All CI checks and Git Hooks are strictly enforced to treat both errors and warnings as failures (using `--error-on-warnings`).
  - **Zero-Diagnostic Policy**: Even though `info` level diagnostics do not block the build, you MUST manually verify them during every check and fix them to maintain a zero-diagnostic state.
- **TypeScript**: Always run `pnpm lint` (`tsc --noEmit`) to verify types.
