
## 2024-04-19 - engine/saveParser/index.ts
**Learning:** Testing `Uint8Array` properties heavily depends on correctly simulating the specific binary format of the `.sav` file. `isGen1Save` checks offset `0x2F2C` for party count (<= 6) and `0x2F2D` for `0xFF` terminator. `isGen2Save` does similar at different offsets depending on Crystal vs Gold/Silver.
**Action:** When mocking ArrayBuffers to verify fallback logic or corrupt saves, meticulously recreate the minimal set of valid bytes required by the structural checks (e.g., party terminators, Pikachu identifiers) before breaking checksums, otherwise the fallback won't be triggered.
