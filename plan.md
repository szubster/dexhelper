1. **Add new tests in `src/engine/saveParser/parsers/gen3.test.ts` for A/B bank flash memory architecture logic in `parseGen3PokemonPVAndIVs`.**
   - Specifically, we want an integration test that verifies extracting IVs and PVs from an offset located in Bank B (`0xE000`) and properly handles offsets simulating out-of-bounds relative errors (e.g. throwing `RangeError` translated to `The save file is corrupted or incomplete.`).
   - We will write a test similar to the existing `parseGen3PokemonPVAndIVs` known permutation test, but using `const offset = 0xE000` (which is `SAVE_BLOCK_B`) and an ArrayBuffer large enough. This ensures we are testing A/B bank boundaries.
   - We will check that `parseGen3PokemonPVAndIVs(view, 0xE000)` succeeds and properly parses when Bank B is active.
2. **Ensure `RangeError` bounds checking specifically checks A/B bank relative offset failures.**
   - We will add another test `should throw corrupted error on out-of-bounds reads within Bank B` that provides a buffer that fits Bank A but not Bank B (e.g., `new ArrayBuffer(0xE010)` which isn't big enough for a full 100-byte Pokemon at `0xE000`), testing that it correctly throws the corruption error.
3. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**
4. **Submit the changes via empty PR.**
