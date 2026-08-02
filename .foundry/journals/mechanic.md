# Mechanic Journal
# Mechanic Update - 2026-07-09

- Found several TPM-blocked nodes related to duplicate/rejected ideas or missing session IDs. Repaired YAML states autonomously.

# Mechanic Update - 2026-07-20

- Detected DAG deadlocks due to invalid `depends_on` file paths formatting and archived dependencies.
- Fixed `depends_on` in `task-280-305` by removing its completed and archived dependency (`task-280-304`).
- Checked off the completed dependency (`task-280-304`) in its parent story (`story-087-280`).
- Fixed invalid path formatting for dependencies in `task-280-306` and `task-294-317`.
- Resolved an Impossible Loop deadlock by correctly propagating QA rejection to the target implementation task (`task-294-316` set to `FAILED`, incremented rejection count to 3, with detailed QA failure reason). Reset the corresponding QA task (`task-294-317`) back to `PENDING` to await retry.

# Mechanic Update - 2026-07-21

- Resolved DAG deadlock/circular dependencies involving 4 nodes: `epic-009-atomic-handoff-testing`, `story-009-031-deadlock-prevention-tests`, `research-246-244-gen3-box-parsing`, and `story-108-246-gen3-box-parsing`.
- Removed self-referencing, archived, and child dependencies from `epic-009-atomic-handoff-testing`'s `depends_on` array.
- Removed child task dependency from `story-009-031-deadlock-prevention-tests`'s `depends_on` array.
- Reset the status of `epic-009-atomic-handoff-testing`, `story-009-031-deadlock-prevention-tests`, `research-246-244-gen3-box-parsing`, and `story-108-246-gen3-box-parsing` to `PENDING` and cleared their `rejection_reason` in frontmatter.
- Removed child research dependency from `story-108-246-gen3-box-parsing`'s `depends_on` array.
- Checked off the completed and archived `story-108-245-gen2-box-parsing` checkbox in `epic-054-108-box-analyzer-save-parsing` markdown body without modifying any frontmatter.
Mechanic Update - 2026-07-22

- Identified several nodes with invalid `depends_on` containing file extensions or paths rather than raw Node IDs.
- Fixed `depends_on` formatting in multiple tasks and epics to adhere strictly to the ID requirement.
- Fixed `status` fields that were manually set to `READY` in multiple nodes (ideas, prds, stories, tasks, research), resetting them to `PENDING`. (Orchestrator computes `READY` automatically).
- Removed circular dependencies where parent nodes were improperly listed in a child`s `depends_on` array or children in parents, across active and archived nodes.
- Validated all `.foundry/` node schemas using a custom python script.

# Mechanic Update - 2026-07-21

- Fixed 38 missing or archived dependency paths in `depends_on` arrays across the DAG. These dead dependencies cause deadlocks during Orchestrator runs.
- Detected and repaired a task (`task-261-331-npc-trade-state-integration-impl.md`) that had a manually set `READY` status, reverting it back to `PENDING`.


## Session Extract: 2026-07-24-12-00-00.md

# Mechanic Session
Implemented critical path scheduling in the DAG orchestrator.
