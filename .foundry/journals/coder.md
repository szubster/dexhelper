# 2026-04-23 - Task 018

Successfully implemented the Scheduled Agent Registry by creating the GitHub Actions workflows for TPM and Agile Coach personas.

Verified empty state prompt inclusion in scheduled-agent workflow by extracting the jq construction step and confirming the format locally. Also checked the task as completed.

### Task: task-017-041-fix-jest-standalone-expect
- Re-enabled `jest/no-standalone-expect` in `.oxlintrc.json`.
- To avoid oxlint throwing false positives on `expect` calls inside Vitest's custom test functions, added `additionalTestBlockFunctions` to the rule configuration:
  `"jest/no-standalone-expect": ["error", { "additionalTestBlockFunctions": ["customTest", "customTest.for", "customTest.each"] }]`
- Verified `pnpm exec oxlint .` and `pnpm test` passed.

## 2026-04-29
- **task-016-039-oxlint-type-aware**: Successfully updated package.json to enable oxlint's `--type-aware` and `--type-check` flags. Verified changes by resolving TypeScript errors in `.github/scripts/foundry-orchestrator.ts` and `.github/scripts/foundry-heartbeat.ts`. Also added a tech debt task `task-016-056-fix-heartbeat-test-types` to address the type mismatch in `foundry-heartbeat.test.ts`. Verified the final state via pnpm lint, test, and test:e2e.

## 2026-04-29
- Fixed type errors in `.github/scripts/foundry-heartbeat.test.ts`.
- Removed `// @ts-nocheck` directive.
- Verified by running `pnpm exec oxlint --type-check --type-aware`, `pnpm test`, and `pnpm lint`.

## 2026-04-29 (Update)
- CodeQL caught incomplete substring matching of URL string in `.github/scripts/foundry-heartbeat.test.ts`. Fixed it to use `startsWith('https://jules.googleapis.com')` instead of `includes('jules.googleapis.com')`. This avoids CWE-285 vulnerabilities as noted in `.foundry/docs/knowledge_base/onboarding/autonomous_memory_protocol.md` and standard security practices.

## 2026-04-29 (CodeQL Follow-up)
- CodeQL caught incomplete substring matching of URL string in `.github/scripts/foundry-heartbeat.test.ts`. Modified `startsWith('https://jules.googleapis.com')` to `startsWith('https://jules.googleapis.com/')` (adding trailing slash) to satisfy the arbitrary host name vulnerability check (e.g. preventing `https://jules.googleapis.com.evil.com/`). This adheres to the strict URL validation principles outlined in `.foundry/docs/knowledge_base/onboarding/autonomous_memory_protocol.md` to prevent CWE-285 vulnerabilities.
