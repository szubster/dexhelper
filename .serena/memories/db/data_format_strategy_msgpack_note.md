### PokeData Optimization: MessagePack
- **Context**: Refactored pokedata to split JSONL files for source readability.
- **Decision (April 2026)**: Stuck with minified JSON for now due to small size (~226KB).
- **Future**: If data size grows significantly (e.g. Gen 3+), consider using `msgpackr`.
- **Benefits**: Smaller binary footprint, faster parsing than `JSON.parse` for complex objects.
