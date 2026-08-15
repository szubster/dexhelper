# Session: 2024-08-07-01-56-00

Explored splitting bundles and static Pokedex data by game generation. The idea is to reduce initial load payload for users by emitting generation-specific Code extensions and `msgpack` data bundles, utilizing `React.lazy` and dynamic imports for game-specific parsing logics and rendering strategies. Drafted the proposal as an IDEA node (`idea-136-split-bundles-and-data.md`) to be reviewed for scheduling.

## Analysis
Found that `BattleFrontierDashboard.tsx` was using `@xyflow/react` (React Flow) simply to render 7 disconnected static nodes for each of the Battle Frontier facilities. This introduced significant memory allocation overhead, DOM element bloat, and required the user to download an additional ~90kb chunk of JavaScript (`dag-<hash>.js`).

## Action Taken
1. Replaced the `ReactFlow` rendering block entirely with direct standard React components inside a CSS flexbox wrapper, perfectly preserving the existing styling.
2. Removed the `@xyflow/react` and `@xyflow/react/dist/style.css` imports from `BattleFrontierDashboard.tsx`.
3. Added `React.memo` wrappers to both `ProgressNode` and `BattleFrontierDashboard` to prevent unnecessary React re-renders when parent dashboards or states update.

## Outcome
- Reduced rendering memory profile.
- Decreased bundle delivery for users loading the Battle Frontier Dashboard.
- Eliminated extraneous lifecycle processing from ReactFlow engine for non-interactive node views.

# Session Details

- **Date:** 2026-08-06
- **Persona:** Bolt

## Summary of actions

Refactored `calculateBreedingPairs` in `src/engine/breeding/pair_algorithm.ts` from O(N²) to a partitioned approach (grouping by gender and egg groups) to reduce nested iterations. This removes redundant comparisons and significantly optimizes BreedingPair calculation.

# Bolt Session Journal

Identified `PokemonCaughtDetails` as a relatively large bundle that can be lazy loaded similar to `PokemonCatchProbability`.
- Replaced static import in `src/components/PokemonDetails.tsx` with a `React.lazy` component wrapped in a suspense boundary.
- Updated `vite.config.ts` chunking function and `.bundlemonrc.json` limits for the new component.


<!-- Source: performance-lazy-load.md -->
# Performance Optimization: Lazy Load Save Parsers\n\n- Extracted detection logic to `src/engine/saveParser/utils/detection.ts` to prevent `INEFFECTIVE_DYNAMIC_IMPORT` warnings from Rollup.\n- Used dynamic imports in `parseSaveFile` to lazily load `parseGen1`, `parseGen2`, and `parseGen3` depending on the detected save generation.\n- Configured Vite's `manualChunks` to break out `saveParserGen1`, `saveParserGen2`, and `saveParserGen3` into independent bundles.\n- Adjusted `.bundlemonrc.json` limits to accept the newly split chunk files.\n- Verified with `pnpm test:bundle` and E2E tests passing.\n- Added `// ⚡ Bolt:` inline comment documenting the optimization.\n\n


<!-- Source: 2026-08-06.md -->
# Session: 2024-08-07-02-15-00
Persona: Bolt

Identified multiple React components that frequently re-render with large data sets or complex interactive parent nodes (like the DAG dashboard).
- Added `React.memo` to `DagNode` in `src/components/dag/DagNode.tsx` to prevent unnecessary DOM re-evaluations during DAG pan/zoom.
- Added `React.memo` to `DagFilterPanel` in `src/components/dag/DagFilterPanel.tsx` to isolate its render cycle from the complex parent DAG context changes.
- Added `React.memo` to `PokemonSprite` in `src/components/pokemon/PokemonSprite.tsx` to prevent cascading render evaluations across large list views (like PC storage grids and Pokedex lists).
- Annotated all changes with `// ⚡ Bolt:` comments explaining the memoization context.


<!-- Source: session-bundle-fix.md -->
Session completed successfully. Optimized the Vite build by adding a saveParserCommon chunk, eliminating the +6KB overhead duplication between saveParserGenX chunks and clarifying the 49KB Rollup chunk-drop in the GlobalRibbonChecklistDashboard.
Learned that Vite and Rollup automatically handle chunk splitting for dynamic imports. Removed hardcoded manual chunks from vite.config.ts and confirmed correct splitting without duplication.
