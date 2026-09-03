---
id: prd-157-519-pnpm-workspaces-architecture
type: PRD
title: Step-by-Step Monorepo Architectural Migration to pnpm Workspaces
status: READY
owner_persona: epic_planner
created_at: '2025-02-14'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-157-pnpm-workspaces-architecture
tags:
  - architecture
  - monorepo
  - pnpm
  - dx
  - cloudflare
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# PRD: Step-by-Step Monorepo Architectural Migration to pnpm Workspaces

## 1. Context & Vision
The current project structure is semi-flat, with application logic, build scripts, custom Vite plugins, data extraction pipelines, and Foundry orchestrator scripts loosely organized in the root directory. This architecture makes it challenging to maintain clear dependency boundaries, scale the codebase, and cleanly decouple distinct operational domains.

The vision is to refactor the repository into a fully structured pnpm workspace monorepo. This transition will yield isolated packages for frontend apps, backend functions, shared domain logic, UI components, and build pipelines. The migration must occur in discrete, incremental phases to ensure that ongoing development, CI/CD pipelines, and Cloudflare Pages deployments remain uninterrupted.

## 2. Proposed Architecture & Package Hierarchy
The new pnpm monorepo will be organized into three primary directories:

### Applications (`apps/`)
- **`@dexhelper/web` (`apps/web`)**: The main frontend application powered by Vite, React, TanStack Router, and Tailwind CSS.
- **`@dexhelper/functions` (`apps/functions`)**: Cloudflare Pages / Workers backend containing serverless API routes, authentication logic, and R2 cloud sync capabilities.

### Shared Libraries (`packages/`)
- **`@dexhelper/core` (`packages/core`)**: Pure JavaScript/TypeScript domain logic. Includes Gen 1-3 save file parsers, game data structures, and utilities. **Strict Constraint**: Must contain zero DOM, React, or browser-specific dependencies.
- **`@dexhelper/ui` (`packages/ui`)**: Shared React component library, design system elements, dynamic hooks, and visual primitives.
- **`@dexhelper/config` (`packages/config`)**: Shared configurations including `tsconfig.json` bases, Biome/Oxlint rules, and common build tool configurations.

### Build Tooling & Data Pipelines (`tools/`)
- **`@dexhelper/pokedata-extractor` (`tools/pokedata-extractor`)**: Pipeline scripts for fetching raw data from external sources and generating compressed MsgPack binary artifacts (`pokedata.msgpack`).
- **`@dexhelper/vite-plugins` (`tools/vite-plugins`)**: Custom Vite build plugins (e.g., `pokedata-plugin.ts`, `foundry-plugin.ts`).
- **`@dexhelper/foundry` (`tools/foundry` or `packages/foundry`)**: Core orchestration system, DAG engine, heartbeat scripts, schema validators, and persona workflow logic (currently situated in `.github/scripts/`).

## 3. Technical Guardrails & Boundary Rules
- **Layering Enforcement:** Core libraries (e.g., `@dexhelper/core`) MUST NOT depend on frontend UI frameworks (`react`, `@dexhelper/ui`) or build-time tools.
- **Backend Isolation:** Backend serverless handlers (`functions`) MUST NOT import frontend-only or browser-specific libraries.
- **Pipeline Isolation:** Data extraction tools (`pokedata-extractor`) execute strictly during build or data synchronization phases and MUST NOT be bundled into browser runtime assets.
- **Foundry Isolation:** Orchestrator scripts (`tools/foundry`) MUST be completely insulated from runtime application dependencies, governed by highly specific and isolated `tsconfig` configurations.
- **Dependency Linkage:** Internal cross-package dependencies MUST exclusively utilize the `workspace:*` specifier.
- **Dependency Management:** Utilize pnpm catalogs defined in `pnpm-workspace.yaml` for unified dependency versioning across the workspace.

## 4. Incremental Migration Plan (Phases)
The migration must be executed step-by-step:

- **Phase 1: Workspace Infrastructure & Tooling Setup**
  - Create and configure `pnpm-workspace.yaml` defining `apps/*`, `packages/*`, and `tools/*`.
  - Introduce architectural linting (e.g., Oxlint rules, `dependency-cruiser`) to enforce cross-package boundaries.
- **Phase 2: Extract Build Tooling & Data Pipelines**
  - Isolate Vite plugins into `@dexhelper/vite-plugins`.
  - Extract data generation scripts into `@dexhelper/pokedata-extractor`.
  - Relocate `.github/scripts/` into `@dexhelper/foundry`.
- **Phase 3: Extract Core Domain Logic & Parsers**
  - Move domain logic, game constants, and save file parsers into `@dexhelper/core`.
- **Phase 4: Extract Shared UI Component Library**
  - Relocate generic UI components, tokens, and hooks into `@dexhelper/ui`.
- **Phase 5: Isolate Backend Functions & Frontend App**
  - Move Cloudflare functions to `apps/functions` and the main Vite application to `apps/web`.
- **Phase 6: CI/CD & Deployment Configuration Updates**
  - Update GitHub Actions workflows to leverage `pnpm --filter ...` commands and adapt cache paths.
  - Revise Cloudflare Pages deployment configurations.

## 5. Cloudflare Pages Build Adjustments Guidance
Deployment configurations must be carefully updated to accommodate the monorepo structure:
- **Build Root Directory:** Set to `apps/web` (or keep the repo root and use `pnpm --filter @dexhelper/web build`).
- **Build Command:** Update to `pnpm --filter @dexhelper/web build`, ensuring pnpm automatically builds workspace prerequisites.
- **Output Directory:** Set to `dist` (if the root directory is `apps/web`) or `apps/web/dist` (if the root directory is the repository root).
- **Functions Directory:** Update the path to point to `apps/functions` or `apps/functions/functions` depending on the exact target directory configuration.

## 6. Acceptance Criteria
- [x] Epic Planner: Create an EPIC to break down this PRD into discrete stories representing the migration phases.
- [ ] epic-519-524-workspace-infrastructure
- [ ] epic-519-525-extract-build-tooling
- [ ] epic-519-526-extract-core-domain
- [ ] epic-519-527-extract-ui-components
- [ ] epic-519-528-isolate-backend-frontend
- [ ] epic-519-529-cicd-configuration
