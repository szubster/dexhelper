### PokeData Serialization Analysis (April 2026)
- **Objective**: Explore alternatives to JSON for PokeData storage.
- **Key Findings**:
    - Current JSON (Gen 1+2) is ~177 KB.
    - Projected Gen 1-9 JSON is ~700 KB.
    - MsgPack (`msgpackr`) offers ~35% reduction with low overhead (+3KB bundle).
    - Protobuf offers ~50% reduction but high complexity (+6.5KB bundle + schema).
- **Decision**: Recommended staying with JSON for now, switching to MsgPack when Gen 3 or performance limits are reached.
- **Reference**: [Analysis Report](file:///home/tszuba/.gemini/antigravity/brain/d48e4073-336d-4831-b00e-206afc10a4e1/data_format_analysis.md)
