### PokeDB Data Format Strategy
- **Current Status**: Using JSON for Pokedex data (Gen 1 & 2).
- **Size Constraint**: ~1MB is manageable with JSON + Brotli compression.
- **Trigger for Revisit**:
    1. If Gen 3 or later generations are added.
    2. If the uncompressed JSON file exceeds 5MB or causes noticeable parsing lag on mobile.
- **Future Alternative**: Switch to a binary buffer (Protobuf or BSON) or a compressed stream if the above triggers are met.

### Runtime Inflation & Optimization (Patterns)
- **Compact Storage**: Omit redundant default values (e.g., `tr: 1`, `gr: 4`, `mh: 160`) and symmetric level ranges (`max === min`) in the generation pipeline.
- **Hydration**: Use `inflateChain` and `syncData` in `PokeDB.ts` to recursively restore these defaults at runtime via declarative object spreads. 
- **Evolution Safety**: Evolution chains should be filtered by `maxDex` during rendering to prevent pre-evolutions from later generations bleeding into legacy views.
- **Strict Matching**: Location verifying in E2E tests must use exact text matches to avoid partial string collisions.