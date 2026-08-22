# Session Memory
- Successfully implemented Progression Timeline UI using `SaveHistoryDB`.
- Mocking IndexedDB `openCursor` with vitest requires properly typing recursive structure chains (e.g., `mockTx`, `mockStore`, `mockIndex`) using generics inside `vi.fn()` to appease biome.
- Used `Array.from` when iterating but IDB cursors do not yield traditional arrays; used `iterCursor.continue()`.
- Successfully deleted `plan.md` to prevent repo pollution.
