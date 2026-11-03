---
id: idea-735-core-domain-and-parser-extraction-to-workspace-package
type: IDEA
title: Core Domain, Binary Utilities, and Save Parser Extraction into @dexhelper/core Workspace Package
status: PENDING
owner_persona: product_manager
created_at: "2026-11-01"
updated_at: "2026-11-01"
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: null
priority: 50
confidence_score: 100
tags:
  - architecture
  - monorepo
  - saveParser
  - core
  - dx
  - refactor
research_references: []
experiment_variants: []
rejection_count: 0
system_failure_count: 0
rejection_reason: ""
notes: ""
---

# Core Domain, Binary Utilities, and Save Parser Extraction into @dexhelper/core Workspace Package

## Context & Problem Statement
Under the overarching pnpm monorepo architecture outlined in `.foundry/ideas/idea-157-pnpm-workspaces-architecture.md`, the repository established several workspace packages (`@dexhelper/ui`, `@dexhelper/vite-plugins`, `@dexhelper/antigravity-orchestrator`, and `@dexhelper/core`). While `@dexhelper/ui` and `@dexhelper/vite-plugins` have been integrated and leveraged, `packages/core` currently remains an empty stub export (`export const CORE_INIT = true;`).

Simultaneously, the main application root (`src/engine/saveParser/`, `src/engine/data/`, `src/utils/`) houses the core domain model types (`SaveData`, `Pokemon`, `BoxData`), binary reader utilities (`SaveDataReader`, `ISaveDataReader`), character decoding maps (`decodeGen12String`), and Gen 1–3 binary parsing logic. Because these pure computational engines reside inside the top-level frontend application workspace:
1. **Coupling with Frontend Bundler**: Pure domain logic and binary parsers cannot be independently imported, tested, or executed in Node CLI utilities, Cloudflare Worker backend functions (`functions/api/`), or headless benchmarking suites without pulling in or transpile-resolving top-level Vite/React aliases.
2. **WebWorker & Background Service Inefficiencies**: Offloading binary parsing to dedicated WebWorkers (`idea-731-wasm-save-parser-worker-offloading.md`) or CLI save editors (`idea-148-save-editor-cli.md`) requires referencing internal relative paths deep inside `src/engine/`, risking cyclic dependency violations and boundary leaks.
3. **Monorepo DX & Incremental Compilation**: Any change to pure save parser math or constant offsets invalidates root Vite dev caches, instead of benefiting from pnpm workspace package caching and discrete type-checking boundaries.

## Proposed Solution
Migrate and re-export the pure domain models, binary reader abstractions, and save file parsing logic from `src/engine/saveParser/` into `@dexhelper/core` (`packages/core/`):
1. **Package Architecture & Subpath Exports**: Configure `packages/core/package.json` with targeted subpath exports:
   - `@dexhelper/core`: Shared core primitives, common save types (`SaveData`, `GameVersion`), and binary interfaces (`ISaveDataReader`).
   - `@dexhelper/core/parsers`: Pure Gen 1, Gen 2, and Gen 3 save parser pipelines.
   - `@dexhelper/core/data`: Immutable static game constants, species tables, and bitwise flags.
2. **Zero-DOM Boundary Enforcement**: Ensure `@dexhelper/core` contains strictly zero DOM, browser, React, or CSS dependencies, ensuring 100% interoperability across Node.js, WebWorkers, Cloudflare Workers, and Vite client bundles.
3. **Backward-Compatible Application Re-Exports**: Following the Workspace Component Migration Strategy, re-export core contracts and parsers from `src/engine/saveParser/index.ts` to ensure existing application components and test suites transition seamlessly without breaking changes.
4. **Independent Test & Build Pipeline**: Establish isolated Vitest unit test scripts in `packages/core/` for fast feedback on parser logic and decoding routines.

## Impact & Value
- **Architectural Modularity**: Fulfills the domain separation vision of `idea-157-pnpm-workspaces-architecture.md`, isolating binary parsing from presentation components.
- **Worker & CLI Enablement**: Enables zero-overhead consumption of parsers by WebWorkers, Cloudflare serverless sync handlers, and CLI save manipulation tools.
- **Improved DX & Build Times**: Isolates parser type-checking and test execution, drastically speeding up CI runs and incremental builds.

## Acceptance Criteria
- [ ] Product Manager: Draft a comprehensive PRD detailing the phased extraction of save parsers and domain types into `@dexhelper/core`.
- [ ] Establish package build configuration, exports map, and TypeScript references in `packages/core/package.json` and `packages/core/tsconfig.json`.
- [ ] Migrate `ISaveDataReader`, `SaveDataReader`, and character decoding tables into `packages/core/`.
- [ ] Migrate Gen 1–3 parsers into `packages/core/` and maintain backward-compatible re-exports in `src/engine/saveParser/`.
- [ ] Verify that all existing unit and browser tests continue to pass without regression.
