# Sentinel Learnings

## DataView vs ArrayBuffer for Testing
- TypeScript configuration (`noUncheckedIndexedAccess: true`) makes working with direct `Uint8Array` assignments in tests difficult, as it complains about `Object is possibly 'undefined'` when indexing `buffer[offset]`.
- Using `DataView` methods (`view.getUint8()` and `view.setUint8()`) correctly avoids the indexing strictness checks while ensuring safe access bounds.

## 2026-04-24 - DataView vs ArrayBuffer for Testing
- TypeScript configuration (`noUncheckedIndexedAccess: true`) makes working with direct `Uint8Array` assignments in tests difficult, as it complains about `Object is possibly 'undefined'` when indexing `buffer[offset]`.
- Using `DataView` methods (`view.getUint8()` and `view.setUint8()`) correctly avoids the indexing strictness checks while ensuring safe access bounds.
