## Task Verification: Verify jest rules fix resolution
- **What**: Verified and fully enabled the `jest/no-disabled-tests` rule as `error` in `.oxlintrc.json` and ensured `jest/no-standalone-expect` is also appropriately configured to ignore custom Vitest block functions.
- **Why**: As part of the transition or verification of tests across the repo, these `jest/*` oxlint rules needed checking and enforcement.
- **Verification Details**:
  - `pnpm exec oxlint .` completely passes without errors.
  - The false positive with `jest/no-disabled-tests` in `src/engine/saveParser/parsers/saveFixtures.test.ts` where `baseTest.extend` is used is properly bypassed with an inline `// oxlint-disable-next-line jest/no-disabled-tests` directive.
  - `jest/no-standalone-expect` is correctly handled by providing `additionalTestBlockFunctions` in `.oxlintrc.json`.
  - Full test suite passed (node, browser, and e2e tests).
- **What**: Verified and fully confirmed the `jest/no-disabled-tests` rule as `error` in `.oxlintrc.json`. No code changes were necessary as the change was previously implemented. Validated with `pnpm exec oxlint .` and full `pnpm test` suite which completed successfully.
## Story 010-017: Fix jest rules reported by oxlint
- Verified that the generated tasks `task-017-041-fix-jest-standalone-expect` and `task-017-042-fix-jest-disabled-tests` exist and are COMPLETED.
- Verified that `pnpm exec oxlint .` passes with the rules enabled.
- Checked off the acceptance criteria in the story node.
