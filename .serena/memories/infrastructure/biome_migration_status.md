# Biome Migration Progress

The project has transitioned from no formal linting/formatting to a unified toolchain using Biome v2.

## Status (as of 2026-04-08)
- **Phase 1 (Merged)**: Infrastructure set up. `biome.json` baseline, Lefthook hooks, GHA CI.
- **Phase 2 (Merged)**: Global formatting enforced across 69 files.
- **Phase 3 (In Progress)**: Enabling Core Linter Rules.
    - **Phase 3.1 (Completed)**: Security and Critical Correctness (unused code) enabled.
- **Phase 3.2 (Completed)**: General Correctness & Imports (parseInt radix, exhaustive deps, import sorting, import type). 61 files fixed.
- **Phase 3.3 (Completed)**: Suspicious & Style Rules. Remaining warnings resolved and PR raised.
- **Phase 4 (Completed)**: Configured `biome.jsonc`. Re-enabled all rules except for `a11y` (pending UI baseline stabilization) and `useSimpleNumberKeys` (required for binary save file hex parsing).
- **Phase 5 (Completed)**: Domain Enablement / Activation based on project dependencies (e.g., project, react, test).
- **Phase 6 (Completed)**: Comprehensive Rule Analysis (cautious evaluation of non-default/nursery rules). Enabled `nursery/useSortedClasses` to natively sort Tailwind and custom CSS classes.
- **Phase 7 (Completed)**: Plugin & Tooling Exploration (exploring Biome's integration with Vite, Tailwind, Lefthook, and other stack tools). Replaced external CSS formatters with native Biome Tailwind directives and `functions` mapping for `clsx`, `twMerge`, and `cn`.

## Configuration Details
- **Tool**: Biome v2.4.10
- **Config**: `biome.jsonc` (JSON with comments)
- **Hooks**: Lefthook (pre-commit)
- **Settings**: Single quotes for JS/TS, space indentation (2), Git-aware scanning.

## Future Phases
- **Phase 8**: UI Baseline Stabilization / Enablement of `a11y` rules (Currently marked as TODO in `biome.jsonc`).
- **Phase 9 (Completed)**: Enforce Errors. Escalated all violations to error severity in CI/CD via `package.json` and config.
