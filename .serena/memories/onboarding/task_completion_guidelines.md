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

3.  **Type Safety**:
    - Run `npm run lint` (`tsc --noEmit`) to ensure no TypeScript errors were introduced.

4.  **Visual Verification**:
    - For UI changes, ensure Argos screenshot tests are updated or added where necessary.
    - Verify responsiveness across Desktop (FullHD, 1440p) and Mobile (Pixel 9).

5.  **Documentation**:
    - Update `README.md` or other documentation if public APIs or major features changed.
