# Playwright Navigation Paths Violation
- **Date**: 2026-09-17T21:58:39Z
- **Task**: task-536-564-playwright-style-guide-mock-utils
- **Issue**: The coder used an absolute path (`/dashboard`) in a Playwright E2E testing code example.
- **Rule**: Playwright tests must use relative paths (e.g., `./dashboard`) for navigation to avoid Vite base URL configuration test failures.
- **Action**: Rejected the task and sent it back to the coder for correction.
