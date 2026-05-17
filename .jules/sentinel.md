🧪 Sentinel: Add error path test for invalid save file size

## Description
🎯 **What:** The testing gap addressed was the lack of an explicit unit test validating the early-exit condition in `parseSaveFile` for buffer sizes under 32KB.
📊 **Coverage:** The test suite now explicitly covers the edge case where an artificially tiny or truncated `ArrayBuffer` is passed to the parser, guaranteeing the proper error is thrown rather than crashing downstream DataView accesses.
✨ **Result:** Increased robustness and test coverage for the root save parser entrypoint.
