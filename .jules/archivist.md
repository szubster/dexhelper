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

## 2026-04-26 - Archivist Run Learnings

**Learning:** When refactoring drops a dependency (like `pokenode-ts`), references to it often persist in onboarding documents, creating an inaccurate view of the tech stack.
**Action:** Routinely search onboarding and project overview documents for deprecated dependencies after a major migration.

## 2026-05-15 - Archivist Run Learnings

**Learning:** Memory entries describing the removal of fields (like `pr_number`) can become contradictory if later features (like `human-in-the-loop`) reintroduce them partially.
**Action:** Updated `conflict-resolution-v1.md` to clarify that `pr_number` was only removed for automated tasks, resolving the contradiction with `human-in-the-loop.md`.

## 2026-06-26 - Archivist Run Learnings

**Learning:** Memory entries that reference specific external instruction files (like `testing_rules.md`) can become inaccurate or broken if the referenced file is moved to a new directory structure (like `.agents/rules/`).
**Action:** Corrected path references in `onboarding/style_and_conventions.md` to point to `.agents/rules/testing_rules.md` to ensure onboarding rules point to actual existent files.

## 2026-07-06 - Archivist Run Learnings
**Learning:** Over time, agents logging redundant failures or rejections for the same task (e.g., `task-085-142`) creates duplicated entries in their journals (e.g., QA journal).
**Action:** Consolidated the repeated rejection learnings in `.foundry/journals/qa.md` into a single canonical entry explaining the Missing Architectural Integration for ADR 013 & ADR 017. Also verified that `.foundry/journals/tpm.md` is cleared of routine status updates.

## 2026-07-08 - Archivist Run Learnings
**Learning:** Foundry journals (e.g., `coder.md`, `tech_lead.md`, `auditor.md`, `qa.md`, `product_manager.md`) continually accumulate pure operational execution logs ("I did X", "Permanently failed", "I verified", task verification records, and orchestrator state changes) despite existing guidelines. This bloats context windows and provides no value to future runs. The Empty PR Policy and Core Agent Policies are centralized, so agents do not need to log routine actions.
**Action:** Systematically scrubbed operational execution trace lines starting with "I did", "Permanently failed", "I rejected", "I verified", "I implemented", "I reviewed", "Suspended", "Anomaly", and "Updated generation logic" using scripts. Agents are reminded to strictly adhere to logging only universally applicable architectural constraints and critical learnings.
- The directory `.serena/memories/` is a symbolic link mapping to `../.foundry/docs/knowledge_base/`. Agents must be careful not to mistake it for a duplicate directory or attempt recursive operations that result in duplicate changes.

## 2026-07-15 - Archivist Run Learnings

**Learning:** High-level onboarding documents (like `style_and_conventions.md`) are highly susceptible to knowledge rot when overarching application aesthetics or paradigms change. For example, the project's design standard shifted from "glassmorphism" to a "tactical hardware/snooping" aesthetic (ADR 024, logged heavily in Canvas journals), but the onboarding document still instructed agents to use generic premium UI and smooth gradients, causing contradictory behaviors.
**Action:** Resolved the contradiction in `onboarding/style_and_conventions.md` by explicitly pointing to the "tactical hardware" guidelines in ADR 024. Going forward, when sweeping architectural or aesthetic decisions are made, maintainers and planning agents MUST ensure that introductory/onboarding documentation is explicitly updated to reflect the new paradigms to prevent confusing future agents.

## 2026-07-16 - Archivist Run Learnings

**Learning:** Duplicate entries inside journals (e.g. `.foundry/journals/auditor.md`) frequently happen when the same or similar concept is independently observed multiple times and recorded by the auditor without checking if it already exists. The auditor journal had heavily duplicated learnings for "Tailwind v4 @utility Consolidation", "QA Task Verification Pairing Flexibility", "Strict Hierarchical Verification for Macro Nodes", and "Pokerus Bitwise Parsing".
**Action:** Consolidated duplicated pattern insights into canonical architectural constraints in the auditor journal, removing redundancy. Agents should check journals for existing similar entries before appending new ones.

## 2026-07-20 - Archivist Run Learnings

**Learning:** Purely operational execution traces (e.g., "I did X", "Permanently failed task-YYY") continually find their way into journals like `.foundry/journals/coder.md` and `.foundry/journals/qa.md` despite existing guidelines, which bloats context.
**Action:** Used `sed` / a Python script to scrub out operational trace lines starting with "Permanently failed", "I rejected", "I verified", and "Updated generation logic" while being careful to leave canonical architectural constraints untouched. Confirmed that limiting the PR scope strictly to these specific log lines keeps the diff manageable and safe.

## 2026-07-12 - Archivist Run Learnings

**Action:** Systematically cleaned up more operational execution trace lines ("I did", "Permanently failed", "I verified", "Anomaly") from `.foundry/journals/coder.md`, `.foundry/journals/architect.md`, `.foundry/journals/agile_coach.md` and `.foundry/journals/tech_lead.md`.

## 2026-07-21 - Archivist Run Learnings
**Learning:** The `.foundry/journals/qa.md` accumulated redundant learnings about absolute offsets vs relative offsets (ADR 028) across multiple tasks (e.g. Feebas and Volcanic Ash).
**Action:** Consolidated these multiple entries into a single canonical entry in `qa.md` to reduce duplication and improve clarity for future agents reading the journal.

**Learning:** Execution traces (e.g., 'I verified', 'Permanently failed', 'I implemented') continued to bloat journals like `coder.md` and `qa.md`.
**Action:** Ran cleanup scripts to strip out these purely operational lines from the journals to keep them focused on critical learnings.

## 2026-07-28 - Archivist Run Learnings

**Learning:** Consolidated multiple security audit vectors and error logging patterns in `.jules/shield.md` into canonical blocks to reduce redundancy and improve the prompt's effectiveness.
**Action:** Re-wrote `.jules/shield.md` to combine duplicated 'Adding New Security Audit Vectors' and 'Sanitize Error Logging' sections.

## 2026-08-01 - Archivist Run Learnings

**Learning:** Migration memories (e.g. `pnpm_v11_migration.md`, `vitest-4-migration-and-browser-patterns.md`, `dataview_migration.md`) eventually become stale once the migration is complete and fully integrated into the codebase.
**Action:** Re-framed enduring migration documents as standard API/pattern docs, and deleted purely historical migration docs to keep the knowledge base focused on the current state of the project.
