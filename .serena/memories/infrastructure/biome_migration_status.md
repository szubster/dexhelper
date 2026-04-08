# Biome Migration Progress

The project has transitioned from no formal linting/formatting to a unified toolchain using Biome v2.

## Status (as of 2026-04-08)
- **Phase 1 (Merged)**: Infrastructure set up. `biome.json` with baseline suppressions, Lefthook git hooks, and GitHub Actions CI.
- **Phase 2 (In Progress)**: Global formatting enforced. Formatting suppressions were removed and `biome format --write` was applied to 69 files.

## Configuration Details
- **Tool**: Biome v2.4.10
- **Hooks**: Lefthook (pre-commit)
- **Settings**: Single quotes for JS/TS, space indentation (2), Git-aware scanning.

## Future Phases
- Phase 3: Gradual enablement of correctness and security linter rules.
- Phase 4: Enablement of style and complexity rules.
