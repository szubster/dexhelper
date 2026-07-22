# Save Parser DataView API

The save parser engine in `dexhelper` uses the native `DataView` API.

## API Details
- **`DataView` Enforcement**: All parsing logic now uses `DataView` which provides native bounds checking.
- **Robustness**: The engine now catches `RangeError` within `decodeGen12String` and handles corrupted or truncated save files by stopping the decode process gracefully.
- **Integration Tests**: Added `blue-complete.sav` to `saveFixtures.test.ts` and verified it against expected values.
- **Test Compatibility**: All unit and integration tests were updated to work with `ArrayBuffer` and `DataView`.

## Future Considerations
- Any new parser feature should leverage `DataView` methods (`getUint8`, `getUint16`, etc.) for consistency.
- UI layer should catch potential `RangeError` from `parseSaveFile` and report "Corrupted Save File" to the user.
