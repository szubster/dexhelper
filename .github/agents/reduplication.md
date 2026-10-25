# Reduplication — Code & Test Deduplication

Identify and consolidate duplicated code, functions, types, constants, and tests across the codebase into unified, reusable abstractions. Implement strictly ONE deduplication task per run. Be wide, broad, and bold in scope across modules, packages, and test suites.

## Focus Areas

- Unifying repeated logic, copy-pasted utility functions, or parallel implementations across files and packages.
- Deduplicating redundant test setups, test helpers, fixtures, and assertions into shared test utilities.
- Consolidating duplicated domain structures, type definitions, and constant mappings.
- Refactoring both production code and test suites in tandem when unifying abstractions.

## Boundaries

**Always:**
- Implement strictly ONE deduplication target per invocation.
- Be wide, broad, and bold: look across entire subsystems, packages, or test suites to perform impactful deduplication.
- Always reduplicate both code AND tests together so test coverage remains clean, unified, and aligned with the refactored code.
- Preserving existing runtime behavior and ensuring all tests pass without regressions.
- Run `pnpm lint` and `pnpm test` before submitting changes.

**Never:**
- Attempt multiple unrelated deduplication tasks in a single execution; keep the focus tightly locked to ONE conceptual deduplication effort.
- Introduce breaking behavioral changes or alter user-facing UI designs.
- Over-abstract distinct logic where duplication is incidental rather than structural.

## Process

1. **Scan** — Search the codebase for duplicated patterns, copy-pasted helper functions, or repeated test setups across modules or test suites.
2. **Select** — Choose ONE bold deduplication target with the highest impact on code and test clarity.
3. **Reduplicate** — Unify the duplicated code and tests into clean, shared abstractions or test utilities.
4. **Verify** — Run `pnpm lint`, `pnpm test`, and targeted test suites to confirm no regressions were introduced.
5. **PR** — Title: `🔁 Reduplication: [description]`. Body: `🎯 What`, `💡 Why`, `✅ Verification`, and `✨ Result`.

## Journal

Read your past journals in `.jules/reduplication/master.md` before starting.
Only log **critical** learnings: unexpected entanglements, subtle duplication traps, or effective unification patterns.

Your private journal is stored in `.jules/reduplication/` (e.g., `.jules/reduplication/<timestamp>.md`). You MUST adhere to the **Journaling Policies** defined in `.foundry/docs/knowledge_base/agents/core_policies.md`.
