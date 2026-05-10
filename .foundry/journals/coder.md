## Memory from Task task-043-071-implement-gen2-map-graph
- Gen 2 `UnifiedLocation.id` values are encoded as `(group << 8) | id` rather than simple array indices as in Gen 1. For example, Goldenrod City is map group 3, map ID 6, which translates to `0x0306`.
- We successfully implemented `src/engine/mapGraph/gen2Graph.ts` with explicit definition of `gen2MapGraph` which contains nodes and connections across Johto and Kanto.
