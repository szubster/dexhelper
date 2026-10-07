1. Add `_emulator_set_joypad_state(state: number): void;` to `BinjgbModule`.
2. Add `setJoypadState(state: number): void;` to `BinjgbInstance`, `BinjgbWrapper`, `BinjgbContextValue` (and `BinjgbContext.tsx`).
3. In `BinjgbEmulator.tsx`, add a `useEffect` for 'keydown' and 'keyup', and a `requestAnimationFrame` loop for `navigator.getGamepads()`.
4. The bitmask mapping (commonly: Right=1, Left=2, Up=4, Down=8, A=16, B=32, Select=64, Start=128). Calculate state and call `setJoypadState`.
