# TPM Journal

No critical learnings logged yet.

---

---

## Process Change: Late-Binding Hierarchy
A new process change regarding late-binding hierarchical dependencies has been documented.
In the orchestrator, a `PENDING` parent node will not block its children from starting *if* the parent node already has children. This exception to the normal hierarchical completion rule avoids circular dependency deadlocks where a parent waits for children that are waiting for the parent to become active.

---

## 2026-06-23
**Architectural Constraint (Archive File Path Linkage):**
When archiving completed nodes to `.foundry/archive/`, you must update all active files that reference them in inline markdown links to use the new archived path. However, the `depends_on` and `parent` arrays/fields in the YAML frontmatter MUST strictly remain as Node IDs to prevent DAG orchestrator deadlocks.

- Consolidated all the session-unique `.md` journal files across `.foundry/journals/` and `.jules/` into aggregated `master.md` files per persona.

---

# TPM Session Journal
Date: 2026-08-16 00:45:00

---

## Architectural Findings and Rules
- Always identify terminal trees before archiving. A tree is only terminal if all nodes (the parent chain and all children) are in `COMPLETED` or `CANCELLED` states.
- The `depends_on` and `parent` fields in YAML frontmatter must strictly contain node IDs, not file paths.
- It is crucial to preserve the integrity of inline markdown links when files are moved to the archive directory.
- Node types correspond to subdirectories (e.g., RESEARCH goes to `.foundry/research/` and `.foundry/archive/research/`).

---

## Archiving Constraints
- Nodes cannot be archived individually unless their entire hierarchy satisfies terminal conditions. We must archive the entire tree.
- A test node (such as QA or E2E) should be identified and archived if its tree is terminal.
- Node paths in memory often lack file extensions, requiring correct mapping during directory creation and file movement.

---

# TPM Session 2026-08-18-00-46-22
During this session, I resolved several minor DAG orchestrator deadlocks where node paths (e.g. `.foundry/epics/epic-336-349-multi-save-infrastructure.md`) were incorrectly used in the `depends_on` array instead of their pure node IDs (`epic-336-349-multi-save-infrastructure`). This violation of the DAG ID strictness rule prevents the orchestrator from properly resolving dependencies. I updated multiple files in the `.foundry/archive/tasks/`, `.foundry/epics/`, and `.foundry/prds/` directories to use strict node IDs. Future nodes should enforce strict Node IDs without file paths or extensions.

---

# Session YYYY-MM-DD-HH-MM-SS

---

## Execution

<!-- Merged from 2026-08-25-10-00-00.md -->

---

# TPM Session Journal
Date: 2026-09-28 06:50:00

## Architectural Findings and Lessons Learned

### Terminal Tree Verification and Archival Scope
- **Tree Completeness Rule**: Archiving must strictly operate at the whole DAG tree level. A completed node cannot be archived if any descendant or parent in its hierarchy is in an active or incomplete state (e.g., PENDING, READY, ACTIVE, VERIFYING).
- **In-Memory Tree Traversal**: When evaluating terminal state trees, non-archived node files across all subdirectories (`ideas`, `prds`, `epics`, `stories`, `tasks`, `research`) must be traversed from root down to leaf nodes to guarantee 100% terminal state (COMPLETED or CANCELLED) before performing file relocations.
- **Node Linkage Preservation**: Moving node files to `.foundry/archive/` preserves historical reference while keeping active directory context windows slim. Internal `depends_on` and `parent` YAML frontmatter fields strictly remain node IDs without paths to avoid DAG orchestrator circular dependency resolution failures.

### Summary of Archived DAG Tree
- Successfully archived the completed terminal tree rooted at `idea-118-centralize-prompt-reminders-complete` (9 nodes total):
  - `idea-118-centralize-prompt-reminders-complete`
  - `prd-118-517-centralize-prompt-reminders-cleanup`
  - `epic-517-521-centralize-prompt-reminders-cleanup`
  - `story-521-520-prompt-cleanup-tasks`
  - `task-520-549-coder-prompt-cleanup-coder`
  - `task-520-550-qa-prompt-cleanup-qa`
  - `story-521-521-integration-e2e`
  - `task-521-578-integration-e2e-coder`
  - `task-521-579-integration-e2e-qa`

---

# TPM Session Journal
Date: 2026-09-30 03:20:00

## Architectural Findings and Lessons Learned

### Terminal Tree Verification and Archival Scope
- **Tree Completeness Rule**: Archiving must strictly operate at the whole DAG tree level. A completed node cannot be archived if any descendant or parent in its hierarchy is in an active or incomplete state (e.g., PENDING, READY, ACTIVE, VERIFYING, BLOCKED, DRAFT).

### Summary of Archived DAG Tree
- Successfully archived the completed terminal tree rooted at `idea-120-conflictless-agent-journals` (14 nodes total):
  - `idea-120-conflictless-agent-journals`
  - `prd-120-335-conflictless-agent-journals`
  - `epic-335-401-implement-conflictless-journals-retry`
  - `story-401-408-persona-specific-journal-directories`
  - `task-408-430-implement-persona-specific-journals-impl`
  - `task-408-431-implement-persona-specific-journals-qa`
  - `story-401-409-tpm-journal-aggregation`
  - `task-409-493-tpm-journal-aggregation-script-impl`
  - `task-409-494-tpm-journal-aggregation-script-tests`
  - `task-409-495-tpm-journal-aggregation-qa`
  - `story-401-410-update-downstream-journal-scripts`
  - `task-410-493-update-journal-paths-impl`
  - `task-410-494-update-journal-paths-qa`
  - `story-401-411-conflictless-journals-e2e-verification`
