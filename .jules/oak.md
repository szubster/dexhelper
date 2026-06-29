# Oak Learnings

* When updating Pokémon data, always modify the source scripts or hardcoded lists (e.g., in `src/engine/exclusives/`), then regenerate the data using `pnpm data:gen` or `pnpm data:gen-maps`. Never patch the output JSON files directly.
* In `src/engine/exclusives/`, the version-specific arrays (e.g., `red`, `gold`) explicitly list Pokémon that are **UNOBTAINABLE** in that version. For instance, putting Weedle in the `gold` array means Weedle cannot be caught in Gold (it is a Silver exclusive).
* If `pnpm lint` (specifically `type-coverage`) crashes with exit code 134 due to out-of-memory errors on large data sets or types, run it with increased memory: `NODE_OPTIONS=--max-old-space-size=4096 pnpm lint`.
