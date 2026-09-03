---
id: idea-157-pnpm-workspaces-architecture
type: IDEA
title: Step-by-Step Monorepo Architectural Migration to pnpm Workspaces
status: ACTIVE
owner_persona: product_manager
created_at: '2026-08-19'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: '8833268239473052736'
pr_number: null
parent: null
tags:
  - architecture
  - monorepo
  - pnpm
  - dx
  - cloudflare
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Step-by-Step Monorepo Architectural Migration to pnpm Workspaces

## Context & Vision
The repository currently relies on a semi-flat workspace structure (`.` and `.github/scripts`) where application logic, build scripts, custom Vite plugins, data extraction pipelines, serverless functions, and the Foundry orchestration suite are somewhat coupled in the root directory. To support scaling, modularization, clear boundary isolation, and future feature expansion, the project should be cleanly refactored into a structured pnpm monorepo using proper pnpm workspace packages (`apps/*`, `packages/*`, `tools/*`).

This migration needs to occur in incremental, step-by-step phases to ensure ongoing development is not disrupted, CI/CD pipelines remain stable, and deployment setups (such as Cloudflare Pages) are updated with clear instructions.

## Proposed Package Hierarchy & Module Breakdown
A comprehensive modular package hierarchy with clear architectural boundaries:

### Applications (`apps/`)
1. **`@dexhelper/web` (`apps/web`)**: Main DexHelper frontend Vite application (React, TanStack Router, Tailwind CSS).
2. **`@dexhelper/functions` (`apps/functions`)**: Cloudflare Pages / Workers serverless API routes and backend handlers (R2 cloud sync, auth, etc.).

### Shared Libraries (`packages/`)
3. **`@dexhelper/core` (`packages/core`)**: Pure domain logic, save file parsers (Gen 1-3), game data structures, and pure JS/TS utilities (strictly zero DOM/React or browser dependencies).
4. **`@dexhelper/ui` (`packages/ui`)**: Shared React component library, design system elements, dynamic UI hooks, and visual primitives.
5. **`@dexhelper/config` (`packages/config`)**: Shared tsconfig bases, Biome/Oxlint rules, and build configurations.

### Build Tooling & Data Pipelines (`tools/`)
6. **`@dexhelper/pokedata-extractor` (`tools/pokedata-extractor`)**: Data pipeline scripts (`scripts/generate-pokedata.ts`, `scripts/sync-pokedata.sh`, `scripts/gen3-fetch-locations.ts`) responsible for fetching raw data from PokeAPI/data sources and generating compressed MsgPack binary artifacts (`pokedata.msgpack`).
7. **`@dexhelper/vite-plugins` (`tools/vite-plugins`)**: Custom Vite build plugins (`vite-plugins/pokedata-plugin.ts` for compiling/watching MsgPack data and `vite-plugins/foundry-plugin.ts` for local dev server DAG integrations).
8. **`@dexhelper/foundry` (`tools/foundry` or `packages/foundry`)**: Core orchestration system, DAG engine, heartbeat scripts, schema validators, and persona workflow scripts currently in `.github/scripts/`.

## Technical Guardrails & Boundary Rules
- **Layering Enforcements:** Lower-level packages (`core`) MUST NOT depend on frontend UI frameworks (`react`, `@dexhelper/ui`) or build-time tools.
- **Backend Isolation:** Backend serverless handlers (`functions`) MUST NOT import frontend-only or browser-specific libraries.
- **Pipeline Isolation:** Data extraction pipelines (`pokedata-extractor`) run only during build/data update steps and MUST NOT be bundled into browser runtime assets.
- **Foundry Isolation:** Foundry orchestrator scripts (`tools/foundry`) MUST remain insulated from runtime application dependencies, using isolated tsconfig configurations.
- **Dependency Scope:** All internal package dependencies must be linked using `workspace:*` specifiers.

## Incremental Migration Plan
1. **Phase 1: Workspace Infrastructure & Boundary Tooling**
   - Refine `pnpm-workspace.yaml` to define `apps/*`, `packages/*`, and `tools/*`.
   - Introduce architectural linting / boundary rules (e.g. Oxlint import restrictions or `dependency-cruiser`) to enforce layer boundaries.
2. **Phase 2: Extract Build Tooling & Data Pipeline (`tools/vite-plugins`, `tools/pokedata-extractor`, `tools/foundry`)**
   - Isolate `vite-plugins/` into `@dexhelper/vite-plugins`.
   - Move `scripts/generate-pokedata.ts` and data processing tools into `@dexhelper/pokedata-extractor`.
   - Refactor `.github/scripts/` into a formal `@dexhelper/foundry` workspace package.
3. **Phase 3: Extract Core Domain & Save Parsers (`@dexhelper/core`)**
   - Isolate save file parsers, game engine constants, and utilities into `@dexhelper/core`.
   - Update internal imports and run test suites.
4. **Phase 4: Extract Shared UI Component Library (`@dexhelper/ui`)**
   - Move generic UI components, design tokens, and hooks into `@dexhelper/ui`.
5. **Phase 5: Isolate Backend Functions (`apps/functions`) & Frontend Web App (`apps/web`)**
   - Re-organize Cloudflare functions and the Vite web app shell into discrete workspace apps.
6. **Phase 6: CI/CD & Cloudflare Pages Configuration Update**
   - Update GitHub Actions workflows (`pnpm --filter ...`, cache paths).
   - Document Cloudflare Pages build settings changes.

## Exploiting pnpm Features
- **Filtering & Selective Execution:** Use `pnpm --filter <package>...` for scoped building, testing, and linting (e.g., `pnpm --filter @dexhelper/core test`).
- **Catalog Feature:** Leverage `pnpm` catalogs in `pnpm-workspace.yaml` for unified dependency version management across packages (`catalog:` specifiers).
- **Shared Workspace Protocol:** Utilize `workspace:*` for strict internal package dependency linkage.

## Cloudflare Pages Build Adjustments Guidance
When migrating to `apps/web` or nested workspace packages:
- **Root Directory:** Set Cloudflare Pages Build Root Directory to `apps/web` (or maintain repo root with `pnpm --filter @dexhelper/web build`).
- **Build Command:** `pnpm --filter @dexhelper/web build` (which automatically invokes prerequisite build steps via pnpm workspace dependency graph).
- **Output Directory:** `dist` (if root directory is `apps/web`) or `apps/web/dist` (if root is repo root).
- **Functions Directory:** Point Cloudflare Pages Functions path to `apps/functions/functions` or `apps/functions` depending on CF Pages monorepo settings.

## Acceptance Criteria
- [ ] Product Manager: Convert this IDEA into a PRD detailing the incremental migration phases, workspace boundaries, and Cloudflare Pages configuration instructions.
- [ ] Tech Lead: Break down the architectural refactoring into isolated TASK nodes per phase.
