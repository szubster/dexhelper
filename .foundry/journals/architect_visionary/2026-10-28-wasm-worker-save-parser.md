# Architect Visionary Journal — 2026-10-28

## Critical Learnings & Observations
- **Off-Main-Thread Processing for Save File Operations**: Offloading heavy binary parsing and multi-save matrix comparisons into Web Workers prevents main-thread rendering frame drops and UI jank during save imports and WASM emulator synchronization.
- **Foundry Global Sequence Numbering**: Sequence numbers for new nodes must be calculated by finding the global maximum across all `.foundry/` node directories to avoid sequence collisions.
