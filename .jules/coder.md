## Task Verification: Verify jest rules fix resolution
- **What**: Verified and fully enabled the `jest/no-disabled-tests` rule as `error` in `.oxlintrc.json` and ensured `jest/no-standalone-expect` is also appropriately configured to ignore custom Vitest block functions.
- **Why**: As part of the transition or verification of tests across the repo, these `jest/*` oxlint rules needed checking and enforcement.
- **Verification Details**:
  - `pnpm exec oxlint .` completely passes without errors.
  - The false positive with `jest/no-disabled-tests` in `src/engine/saveParser/parsers/saveFixtures.test.ts` where `baseTest.extend` is used is properly bypassed with an inline `// oxlint-disable-next-line jest/no-disabled-tests` directive.
  - `jest/no-standalone-expect` is correctly handled by providing `additionalTestBlockFunctions` in `.oxlintrc.json`.
  - Full test suite passed (node, browser, and e2e tests).
- **What**: Verified and fully confirmed the `jest/no-disabled-tests` rule as `error` in `.oxlintrc.json`. No code changes were necessary as the change was previously implemented. Validated with `pnpm exec oxlint .` and full `pnpm test` suite which completed successfully.

## Verification Log: Task task-029-047-write-gastown-adr
- Verified creation of `.foundry/docs/adrs/003-gastown-migration-decision.md` containing Cloudflare Workers evaluation, D1 schema, and migration plan.
- The document conforms to the ADR format.
