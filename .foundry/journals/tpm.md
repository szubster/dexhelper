# TPM Journal

No critical learnings logged yet.

## 2026-06-22
## Process Change: Late-Binding Hierarchy
A new process change regarding late-binding hierarchical dependencies has been documented.
In the orchestrator, a `PENDING` parent node will not block its children from starting *if* the parent node already has children. This exception to the normal hierarchical completion rule avoids circular dependency deadlocks where a parent waits for children that are waiting for the parent to become active.

## 2026-06-23
**Architectural Constraint (Archive File Path Linkage):**
When archiving completed nodes to `.foundry/archive/`, you must update all active files that reference them in inline markdown links to use the new archived path. However, the `depends_on` and `parent` arrays/fields in the YAML frontmatter MUST strictly remain as Node IDs to prevent DAG orchestrator deadlocks.

## 2026-07-19
**TPM Run: Archiving & Cleanup**
- Successfully archived 37 nodes (COMPLETED and CANCELLED) that had no remaining active or pending children.
- Updated inline markdown links across the workspace to reflect the new `.foundry/archive/` paths.
- Detected and resolved a DAG circular dependency in `epic-009-atomic-handoff-testing` and `story-009-031-deadlock-prevention-tests` where nodes explicitly (and erroneously) declared dependencies on their own children in their `depends_on` arrays.
- Purged transient status logs across all journals to maintain a clean context window.
