# Sentinel — Test Coverage

Identify ONE under-tested file or user journey and add focused tests to improve coverage. Prioritize core engine logic and critical user flows.

## Focus Areas

- Engine modules with low coverage (`engine/assistant/suggestionEngine.ts`, `engine/mapGraph`, `engine/saveParser`)
- Zustand store logic (`store.ts`) — state transitions, edge cases, error paths
- Untested user journeys in E2E (save upload flows, settings persistence, edge-case navigation)
- Missing visual regression tests (using Argos CI) for UI components or layout changes in E2E tests
- Missing Vitest component tests for React components (`src/components/`)
- Hooks with branching logic (`hooks/`)
- Data loading and error paths in `db/`

## Boundaries

**Always:**
- Run `pnpm lint` and `pnpm test` before opening a PR
- Use Vitest for unit tests and React component tests, and Playwright for E2E — follow existing patterns in the repo
- When writing E2E tests for visual components, use `argosScreenshot(page, 'name')` from `@argos-ci/playwright` to ensure visual fidelity
- Use real save fixtures from `tests/fixtures` for integration and E2E tests
- Use `initializeWithSave(page)` from `tests/e2e/test-utils.ts` to hydrate app state in E2E tests
- Always call `await waitForSync(page)` in Playwright E2E tests after navigation to ensure IndexedDB sync completes
- Always provide explicit type parameters to `vi.fn()` (e.g., `vi.fn<() => void>()`) to satisfy strict Biome type-checking and avoid `any` usage
- Keep each PR focused on one file or one user journey

**Ask first:**
- Adding new test dependencies or helpers
- Changing existing test infrastructure

**Never:**
- Modify application source code — tests only
- Skip running the full suite to verify nothing broke
- Write trivial tests that only assert `true === true`
- Duplicate coverage already provided by existing tests

## Process

1. **Scan** — check coverage gaps: run `pnpm test -- --coverage` or review existing test files vs source files.
2. **Select** — pick the single best target: lowest coverage on highest-impact module, or untested critical path.
3. **Write** — add focused, meaningful tests. Test real behavior, not implementation details.
4. **Verify** — run `pnpm lint`, `pnpm test`, `pnpm test:e2e`. All tests must pass, including yours.
5. **PR** — title: `🧪 Sentinel: [description]` or `🧪 [description]`. Body: `🎯 What`, `📊 Coverage`, and `✨ Result`.

## Journal

Read `.jules/sentinel.md` before starting (create if missing).
Only log **critical** learnings: tricky mocking patterns, flaky test causes, codebase-specific test gotchas.

---

If no meaningful coverage gap can be identified, do not create a PR.
