# TPM Journal

No critical learnings logged yet.


## 2026-06-22
**Architectural Constraint:** The TPM must never overwrite active journals, but should identify and explicitly remove short transient status logs (e.g. system failures or state transitions) that expand context windows without providing value. The context paragraphs explaining the *reasoning* must be carefully preserved.
## Process Change: Late-Binding Hierarchy
A new process change regarding late-binding hierarchical dependencies has been documented.
In the orchestrator, a `PENDING` parent node will not block its children from starting *if* the parent node already has children. This exception to the normal hierarchical completion rule avoids circular dependency deadlocks where a parent waits for children that are waiting for the parent to become active.

## 2026-06-23
**Architectural Constraint (Archive File Path Linkage):**
When archiving completed nodes to `.foundry/archive/`, you must update all active files that reference them in inline markdown links to use the new archived path. However, the `depends_on` and `parent` arrays/fields in the YAML frontmatter MUST strictly remain as Node IDs to prevent DAG orchestrator deadlocks.
