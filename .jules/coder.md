- Ran full test suite (lint, node, browser, e2e) to verify no regressions were introduced. Note: The initial browser test failure was due to missing playwright browsers which was resolved with `pnpm exec playwright install`. The browser and e2e tests both passed successfully after the browser installation.

Also created `.github/scripts/tsconfig.json` to configure TypeScript to allow importing `.ts` extensions without emitting files, resolving the final oxlint errors during verification.
