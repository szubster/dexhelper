# Epic Planner Journal

## Pattern: Handling Impossible Child Nodes
When a child node (e.g., an Epic or Story) is proven mathematically or technically impossible (such as static extraction of Gen 3 roamer locations per ADR-108-027) and must be permanently CANCELLED:
1. **Sibling Nodes Must Be Re-evaluated**: The cancellation of one child node often invalidates the assumptions or dependencies of its siblings.
2. **Orphan and Replace Strategy**: Do not attempt to salvage the existing sibling nodes if their scope was tied to the impossible feature. Instead, transition those orphaned sibling nodes to `CANCELLED` and dynamically generate new replacement nodes with an updated scope.
3. **DAG Constraint Compliance**: Crucially, the parent PRD *cannot* transition to `COMPLETED` if any of its generated child nodes remain in a PENDING state or if their checkboxes are left unchecked. When cancelling and replacing, ensure the checkboxes of the *failed/orphaned* nodes are checked off (`- [x]`) in the parent's markdown body to unblock the DAG, and append the new replacement nodes as unchecked items (`- [ ]`).

## Pattern: Handling Impossible Child Nodes
When a child node (e.g., an Epic or Story) is proven mathematically or technically impossible (such as static extraction of Gen 3 roamer locations per ADR-108-027) and must be permanently CANCELLED:
1. **Sibling Nodes Must Be Re-evaluated**: The cancellation of one child node often invalidates the assumptions or dependencies of its siblings.
2. **Orphan and Replace Strategy**: Do not attempt to salvage the existing sibling nodes if their scope was tied to the impossible feature. Instead, transition those orphaned sibling nodes to `CANCELLED` and dynamically generate new replacement nodes with an updated scope.
3. **DAG Constraint Compliance**: Crucially, the parent PRD *cannot* transition to `COMPLETED` if any of its generated child nodes remain in a PENDING state or if their checkboxes are left unchecked. When cancelling and replacing, ensure the checkboxes of the *failed/orphaned* nodes are checked off (`- [x]`) in the parent's markdown body to unblock the DAG, and append the new replacement nodes as unchecked items (`- [ ]`).
