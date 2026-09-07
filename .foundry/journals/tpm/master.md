# TPM Journal

No critical learnings logged yet.

## Process Change: Late-Binding Hierarchy
A new process change regarding late-binding hierarchical dependencies has been documented.
In the orchestrator, a `PENDING` parent node will not block its children from starting *if* the parent node already has children. This exception to the normal hierarchical completion rule avoids circular dependency deadlocks where a parent waits for children that are waiting for the parent to become active.

## 2026-06-23
**Architectural Constraint (Archive File Path Linkage):**
When archiving completed nodes to `.foundry/archive/`, you must update all active files that reference them in inline markdown links to use the new archived path. However, the `depends_on` and `parent` arrays/fields in the YAML frontmatter MUST strictly remain as Node IDs to prevent DAG orchestrator deadlocks.


- Consolidated all the session-unique `.md` journal files across `.foundry/journals/` and `.jules/` into aggregated `master.md` files per persona.



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



# Session YYYY-MM-DD-HH-MM-SS

## Execution



<!-- Merged from 2026-08-25-10-00-00.md -->
