## 2026-04-18 - Archivist Run Learnings

**Learning:** Case sensitivity issues (e.g., `.Jules` vs `.jules`) can cause duplication of agent journals, making it harder to track critical learnings.
**Action:** Ensure that all tools and scripts consistently use lowercase for `.jules` directories.

**Learning:** Agent journals tend to duplicate learning for recurring accessible patterns over time (e.g., `aria-label` missing on icon buttons, `role="switch"` missing on custom toggles, etc.).
**Action:** Periodically review and consolidate journal entries into a single comprehensive entry per topic to avoid repetition.

**Learning:** Transient PR status notes (e.g., `pr-119-blockers.md` or `pr_209_cleanup_done.md`) often get left behind in `.serena/memories/status` and become stale once the PRs are merged and the migration is complete.
**Action:** Ensure that status files are deleted or marked as resolved/archived as part of the final PR merge process or clean them up systematically during archivist runs.

## 2026-04-20 - Archivist Run Learnings

**Learning:** It is crucial to verify test coverage claims in memories against the actual coverage numbers produced by `vitest run --coverage`, as these can easily become stale or inaccurate after refactoring.
**Action:** Before updating coverage numbers, always run the actual tests and parse the resulting coverage report rather than relying on assumed values. When combining cleanups, always keep one PR focused on one type of cleanup to avoid scope creep and accidental deletions of valid knowledge.
