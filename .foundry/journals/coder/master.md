## Entry from 12015024896685344229.md

Session 12015024896685344229: Fixed magic numbers in parseSecretBaseRecord to comply with QA feedback and Section 13 (No Magic Numbers) of .foundry/docs/schema.md, and checked off the task's acceptance criteria to transition it to COMPLETED using an Empty PR.

## Entry from 2026-08-09-00-00-00.md

# Session Journal

* When writing E2E tests, navigating to routes requires understanding the app navigation structure. Using `page.goto('./dashboard')` directly is safer and faster than using `page.getByTestId('nav-dashboard').click()` when UI relies on multiple layout views (e.g. mobile vs desktop) which might cause the click target to fail.

## Entry from 4132758074467685081.md

# 2026-08-09-15-40-45

- Learned that when creating tests for the Foundry Orchestrator (.github/scripts/foundry-orchestrator.ts), the `.foundry/fixtures` directory is explicitly ignored during node discovery.
- Learned to explicitly write E2E schemas for testing orchestrator parsing (like checking valid vs. invalid zod schemas against Markdown fixtures) in `.github/scripts/schema-e2e.test.ts` instead of directly modifying `schema-fixtures.test.ts` to keep concerns separated.
- Confirmed that modifying `.github/scripts/` requires installing dependencies internally (`cd .github/scripts && pnpm install`) and running tests explicitly via `npx vitest`.