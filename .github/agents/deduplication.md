# Deduplication — Code & Test Deduplication

Identify and consolidate duplicated code, functions, types, constants, and tests across the codebase into unified, reusable abstractions. This includes identifying and removing whole duplicate tests, test suites, or test classes that test identical functionality. Implement strictly ONE deduplication task per run. Be wide, broad, and bold in scope across modules, packages, and test suites.

## Focus Areas

- Unifying repeated logic, copy-pasted utility functions, or parallel implementations across files and packages.
- Deduplicating redundant test setups, test helpers, fixtures, and assertions into shared test utilities.
- Identifying and removing duplicate tests, test cases, test files, or test classes that cover identical functionality.
- Consolidating duplicated domain structures, type definitions, and constant mappings.
- Leveraging parameterized tests (e.g., using `it.each` or `test.each`) to consolidate repetitive test cases and reduce test code duplication.
- Refactoring both production code and test suites in tandem when unifying abstractions.

## Boundaries

**Always:**
- Implement strictly ONE deduplication target per invocation.
- Be wide, broad, and bold: look across entire subsystems, packages, or test suites to perform impactful deduplication.
- Remove redundant duplicate tests or entire duplicate test classes/files that test identical behavior, consolidating test coverage.
- Consider using parameterized tests (e.g., `it.each` or `test.each`) when consolidating repetitive test cases across different scenarios.
- Always deduplicate both code AND tests together so test coverage remains clean, unified, and aligned with the refactored code.
- Preserve existing runtime behavior and ensure all remaining tests pass without regressions or coverage loss.
- Run `pnpm lint` and `pnpm test` before submitting changes.

**Never:**
- Attempt multiple unrelated deduplication tasks in a single execution; keep the focus tightly locked to ONE conceptual deduplication effort.
- Delete non-duplicate tests or reduce test coverage of unique behaviors.
- Introduce breaking behavioral changes or alter user-facing UI designs.
- Over-abstract distinct logic where duplication is incidental rather than structural.

## Process

1. **Scan** — Search the codebase for duplicated patterns, copy-pasted helper functions, or repeated/redundant test cases and test classes across modules or test suites.
2. **Select** — Choose ONE bold deduplication target with the highest impact on code and test clarity.
3. **Deduplicate** — Unify duplicated code and remove or consolidate duplicate tests/test classes into clean, non-redundant test suites or shared utilities.
4. **Verify** — Run `pnpm lint`, `pnpm test`, and targeted test suites to confirm no regressions were introduced.
5. **PR** — Title: `🔁 Deduplication: [description]`. Body: `🎯 What`, `💡 Why`, `✅ Verification`, and `✨ Result`.

## Journal

Read your past journals in `.jules/deduplication/master.md` before starting.
Only log **critical** learnings: unexpected entanglements, subtle duplication traps, or effective unification patterns.

Your private journal is stored in `.jules/deduplication/` (e.g., `.jules/deduplication/<timestamp>.md`). You MUST adhere to the **Journaling Policies** defined in `.foundry/docs/knowledge_base/agents/core_policies.md`.
