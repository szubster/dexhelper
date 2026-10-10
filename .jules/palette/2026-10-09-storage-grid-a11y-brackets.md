# StorageGrid Decorative Telemetry Brackets Accessibility

## Date
2026-10-09

## Micro-UX / Accessibility Improvement
Wrapped decorative telemetry brackets (`[` and `]`) around OT names, time capsule readiness status badges (`READY` / `ERR`), and box `EMPTY` state indicators in `StorageGrid.tsx` with `<span aria-hidden="true">`.

## Key Learnings
- **Screen Reader Clarity**: Text elements in grid displays that present telemetry data formatted with ASCII brackets (e.g. `[RED]`, `[ READY ]`, `[ EMPTY ]`) should isolate the brackets in `<span aria-hidden="true">`. This prevents screen readers from redundantly voicing "left bracket" and "right bracket" for every card in large storage box grids while preserving the tactical hardware aesthetic visually.
