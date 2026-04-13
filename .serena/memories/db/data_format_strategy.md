### PokeDB Data Format Strategy
- **Current Status**: Using JSON for Pokedex data (Gen 1 & 2).
- **Size Constraint**: ~1MB is manageable with JSON + Brotli compression.
- **Trigger for Revisit**:
    1. If Gen 3 or later generations are added.
    2. If the uncompressed JSON file exceeds 5MB or causes noticeable parsing lag on mobile.
- **Future Alternative**: Switch to a binary buffer (Protobuf or BSON) or a compressed stream if the above triggers are met.