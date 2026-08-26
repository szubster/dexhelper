# TPM Journal

No critical learnings logged yet.

## Process Change: Late-Binding Hierarchy
A new process change regarding late-binding hierarchical dependencies has been documented.
In the orchestrator, a `PENDING` parent node will not block its children from starting *if* the parent node already has children. This exception to the normal hierarchical completion rule avoids circular dependency deadlocks where a parent waits for children that are waiting for the parent to become active.

## 2026-06-23
**Architectural Constraint (Archive File Path Linkage):**
When archiving completed nodes to `.foundry/archive/`, you must update all active files that reference them in inline markdown links to use the new archived path. However, the `depends_on` and `parent` arrays/fields in the YAML frontmatter MUST strictly remain as Node IDs to prevent DAG orchestrator deadlocks.


- Consolidated all the session-unique `.md` journal files across `.foundry/journals/` and `.jules/` into aggregated `master.md` files per persona.

# TPM Journal
Session ID: jules-session

## Actions Taken
1. Executed node archiving rule. Scanned `.foundry` directory for nodes marked as `COMPLETED` or `CANCELLED`.
2. Skipped nodes with active (non-completed/non-cancelled) descendants.
3. Moved 26 compliant nodes into the corresponding `.foundry/archive/` directories using `git mv`.
4. Updated inline markdown references in remaining active documents to point to the new `.foundry/archive/` paths, ensuring the DAG orchestrator YAML relationships were left untouched (strictly using Node IDs).
5. Checked for orchestrator deadlocks (circular dependencies among active nodes) and found none.

## Notes
- Node paths correctly updated without altering node IDs in frontmatter `depends_on` or `parent` fields.

---
id: journal-2026-08-15-00-45-14
type: journal
status: COMPLETED
author: tpm
created_at: "2026-08-15"
updated_at: "2026-08-15"
---

Moved COMPLETED and CANCELLED nodes to their respective archive directories.

- idea-068-hidden-items-finder
- idea-115-remove-obsolete-orphaned-node-manual-cancellation
- prd-068-037-hidden-items-finder
- epic-037-060-hidden-items-ui
- story-070-245-implement-dag-provider-state-management
- story-133-273-gen3-lottery-matching-algorithm
- story-138-295-gen3-static-encounters-ui
- task-280-306-item-runtime-qa
- task-360-418-multi-save-integration-e2e-impl
- task-363-415-trade-extraction-e2e-impl
- task-363-416-trade-extraction-e2e-qa
- task-408-415-gen3-trainer-flags-integration-impl
- task-408-415-orchestrator-archive-bypass-implementation

No deadlocks were detected during this run.

# TPM Session Journal
Date: 2026-08-16 00:45:00

## Architectural Findings and Rules
- Always identify terminal trees before archiving. A tree is only terminal if all nodes (the parent chain and all children) are in `COMPLETED` or `CANCELLED` states.
- The `depends_on` and `parent` fields in YAML frontmatter must strictly contain node IDs, not file paths.
- It is crucial to preserve the integrity of inline markdown links when files are moved to the archive directory.
- Node types correspond to subdirectories (e.g., RESEARCH goes to `.foundry/research/` and `.foundry/archive/research/`).

## Archiving Constraints
- Nodes cannot be archived individually unless their entire hierarchy satisfies terminal conditions. We must archive the entire tree.
- A test node (such as QA or E2E) should be identified and archived if its tree is terminal.
- Node paths in memory often lack file extensions, requiring correct mapping during directory creation and file movement.

# TPM Session 2026-08-18-00-46-22
During this session, I resolved several minor DAG orchestrator deadlocks where node paths (e.g. `.foundry/epics/epic-336-349-multi-save-infrastructure.md`) were incorrectly used in the `depends_on` array instead of their pure node IDs (`epic-336-349-multi-save-infrastructure`). This violation of the DAG ID strictness rule prevents the orchestrator from properly resolving dependencies. I updated multiple files in the `.foundry/archive/tasks/`, `.foundry/epics/`, and `.foundry/prds/` directories to use strict node IDs. Future nodes should enforce strict Node IDs without file paths or extensions.


# TPM Run Log: 16747268697032179285

- `research-425-421-wasm-emulator-options.md` moved to `.foundry/archive/research/research-425-421-wasm-emulator-options.md`

No inline markdown references needed to be updated as the trace confirmed there were none.

# Session YYYY-MM-DD-HH-MM-SS

## Execution

- Concluded that there is no actionable work to perform in this run.
