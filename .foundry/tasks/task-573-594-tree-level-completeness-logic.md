---
id: task-573-594-tree-level-completeness-logic
type: TASK
status: READY
owner_persona: coder
parent: story-550-573-tree-level-completeness-logic
depends_on: []
---

# Implement Tree Level Completeness Logic

## Objective
Implement the logic to evaluate tree-level completeness for node archival.

## Context
When sweeping active nodes for archival (`sweepActiveNodes`), the logic currently evaluates nodes individually. We need to introduce tree-level completeness verification, evaluating the entire parent/descendant chain. If any node in the tree (parent, child, etc.) is non-terminal (not COMPLETED or CANCELLED), archival for the entire tree must be blocked. This relies on the `isHierarchicallyIncomplete` logic used by the orchestrator.

## Acceptance Criteria
- [ ] Implement tree-level completeness verification in archival filtering logic
- [ ] Ensure archival is blocked if any node in the tree is non-terminal
