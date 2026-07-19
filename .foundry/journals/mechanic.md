# Mechanic Journal
# Mechanic Update - 2026-07-09

- Found several TPM-blocked nodes related to duplicate/rejected ideas or missing session IDs. Repaired YAML states autonomously.
- Verified that Orchestrator Phase 3.6 correctly handles Impossible Loops for both FAILED and CANCELLED nodes, as previously requested in `task-154-278`. Completed the task's acceptance criteria to unblock its PR.

# Mechanic Update - 2026-07-20

- Detected DAG deadlocks due to invalid `depends_on` file paths formatting and archived dependencies.
- Fixed `depends_on` in `task-280-305` by removing its completed and archived dependency (`task-280-304`).
- Checked off the completed dependency (`task-280-304`) in its parent story (`story-087-280`).
- Fixed invalid path formatting for dependencies in `task-280-306` and `task-294-317`.
- Resolved an Impossible Loop deadlock by correctly propagating QA rejection to the target implementation task (`task-294-316` set to `FAILED`, incremented rejection count to 3, with detailed QA failure reason). Reset the corresponding QA task (`task-294-317`) back to `PENDING` to await retry.

# Mechanic Update - 2026-07-21

- Investigated DAG resolution warnings reporting circular dependency involving 4 nodes: `epic-009-atomic-handoff-testing`, `story-009-031-deadlock-prevention-tests`, `research-246-244-gen3-box-parsing`, and `story-108-246-gen3-box-parsing`.
- Identified that the circular dependencies were caused by parent nodes explicitly listing their child nodes in their `depends_on` array.
- Resolved circular dependencies and deadlock loop by setting node statuses to `PENDING`, clearing `rejection_reason` values, and cleaning up `depends_on` arrays:
  - Cleared `depends_on` in `epic-009-atomic-handoff-testing` (removed child stories and archived dependencies).
  - Cleared `depends_on` in `story-009-031-deadlock-prevention-tests` (removed child task dependency).
  - Cleared `depends_on` in `story-108-246-gen3-box-parsing` (removed child research dependency).
  - Reset `research-246-244-gen3-box-parsing` to `PENDING` with cleared rejection reason.
- Verified that dry-run orchestrator executes successfully without circular dependency warnings or resolution errors.
