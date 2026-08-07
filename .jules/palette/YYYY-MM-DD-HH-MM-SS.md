## Task
Find and implement ONE micro-UX improvement that makes the interface more intuitive, accessible, or pleasant.

## Action Taken
- Identified that `.glass-card` in `src/index.css` used a solid border (`1px solid`) which violated the project's tactical hardware aesthetic (ADR 008).
- Replaced the solid border with a dashed border (`1px dashed`) and explicitly added `border-radius: 0;` (sharp edges).

## Learnings & Constraints
- **Aesthetic Enforcement:** ADR 008 strictly dictates sharp edges (`rounded-none` or `border-radius: 0`) and dashed borders (`border-dashed` or `1px dashed`). Future styling components must ensure these patterns are followed instead of generic styling like solid borders.
