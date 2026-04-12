# Task Completion Guidelines: dexhelper

Before finalizing any task, the following steps must be completed:

1.  **Code Quality**:
    - Ensure code adheres to defined styles and conventions.
    - Use `src/utils/cn.ts` for consistent Tailwind class management.

2. **Testing**:
    - Run `npm run test` (Vitest) for unit tests.
    - Run `npm run test:e2e` (Playwright) for all UI changes.
    - Ensure tests handle uninitialized state using `initializeWithSave`.
    - Verify that no existing tests or visual regressions are broken.

3.  **Analysis and Type Safety**:
    - Run `npm run lint` which triggers Type Checking (`tsc`) and Biome Checks (`biome check`).
    - **Zero-Diagnostic Policy**: All Biome errors and warnings must be addressed. Additionally, you MUST manually verify and fix any `info` level diagnostics to ensure a completely clean output.

4.  **Visual Verification**:
    - For UI changes, ensure Argos screenshot tests are updated or added where necessary.
    - Verify responsiveness across Desktop (FullHD, 1440p) and Mobile (Pixel 9).

5.  **Documentation**:
    - Update `README.md` or other documentation if public APIs or major features changed.

6.  **Memory Maintenance**:
    - Reflect on the session and update Serena memories (`.serena/memories`) with new architectural decisions, bug patterns, or feature knowledge.
    - Ensure onboarding memories remain the source of truth for the project.
