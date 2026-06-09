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

## 2026-04-21 - Archivist Run Learnings

**Learning:** `.serena/memories` is mapped (symlinked or otherwise configured) to `.foundry/docs/knowledge_base/`. Automated code reviewers might flag edits to `.serena/memories` as out of scope if they are unaware of this underlying mapping.
**Action:** Update the archivist schedule/prompt to explicitly note this mapping, so reviewers do not block valid cleanup tasks.


## 2026-04-22 - Archivist Run Learnings

**Learning:** Keeping the single most impactful cleanup as the core focus is critical to respect boundaries.
**Action:** Found that `jules_agents_dispatch.md` had an outdated list of agents. Updated it to properly reflect the 13 agents deployed, instead of 11.

## 2026-04-26 - Archivist Run Learnings

**Learning:** When refactoring drops a dependency (like `pokenode-ts`), references to it often persist in onboarding documents, creating an inaccurate view of the tech stack.
**Action:** Routinely search onboarding and project overview documents for deprecated dependencies after a major migration.

## 2026-05-15 - Archivist Run Learnings

**Learning:** Memory entries describing the removal of fields (like `pr_number`) can become contradictory if later features (like `human-in-the-loop`) reintroduce them partially.
**Action:** Updated `conflict-resolution-v1.md` to clarify that `pr_number` was only removed for automated tasks, resolving the contradiction with `human-in-the-loop.md`.

## 2026-06-25 - Archivist Run Learnings

**Learning:** `.foundry/docs/knowledge_base/infrastructure/jules_agents_dispatch.md` had an outdated list of agents.
**Action:** Updated it to properly reflect the 15 agents deployed, by adding the missing `researcher` agent to the list.

## 2026-06-26 - Archivist Run Learnings

**Learning:** Memory entries that reference specific external instruction files (like `testing_rules.md`) can become inaccurate or broken if the referenced file is moved to a new directory structure (like `.agents/rules/`).
**Action:** Corrected path references in `onboarding/style_and_conventions.md` to point to `.agents/rules/testing_rules.md` to ensure onboarding rules point to actual existent files.

## 2026-07-02
**Learning:** Multiple agents (Coder, QA, Tech Lead, Sweeper, Testing) were using their journals to log "I did X" actions, task verification records, and status updates instead of critical learnings. This bloats context windows and provides no value to future runs. The Empty PR Policy and Core Agent Policies are centralized, so agents do not need to log routine empty PRs.
**Action:** Cleared out action logs and status updates from the affected journals. Ensure agents are strictly adhering to only logging universally applicable knowledge or constraints.

## 2026-05-25 - Archivist Run Learnings
**Learning:** Agents frequently append "correction" or "update" entries to their journals instead of modifying the original entry, leading to contradictions and bloat.
**Action:** Replaced and consolidated contradictory/duplicate entries. Agents must be reminded to rewrite/update existing learnings rather than appending corrections.
