---
id: idea-157-pnpm-workspaces-architecture
type: IDEA
title: Step-by-Step Monorepo Architectural Migration to pnpm Workspaces
status: READY
owner_persona: product_manager
created_at: '2026-08-19'
updated_at: '2026-08-19'
depends_on: []
jules_session_id: null
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
The repository currently relies on a semi-flat workspace structure where application logic, backend serverless functions (Cloudflare Workers/Pages), build scripts, and shared utilities are somewhat coupled in the root directory. To support scaling, modularization, and future feature expansion, the project should be cleanly refactored into a structured pnpm monorepo using proper pnpm workspace packages.

This migration needs to occur in incremental, step-by-step phases to ensure ongoing development is not disrupted, CI/CD pipelines remain stable, and deployment setups (such as Cloudflare Pages) are updated with clear instructions.

## Proposed Package Hierarchy & Module Structure
A modular package hierarchy with clear architectural boundaries:
1. `@dexhelper/core` (`packages/core`): Domain logic, save file parsers, game data structures, pure JS/TS utilities (no DOM/React dependencies).
2. `@dexhelper/ui` (`packages/ui`): Shared React component library, design system elements, dynamic hooks, and visual primitives.
3. `@dexhelper/web` (`apps/web`): Main DexHelper frontend Vite application (React, Tailwind CSS).
4. `@dexhelper/functions` (`apps/functions` or `packages/functions`): Cloudflare Pages / Workers functions backend routes and API handlers.
5. `@dexhelper/config` (`packages/config` or `internal/config`): Shared tsconfig, linter, and build tool configurations.

## Technical Guardrails & Boundary Rules
- **Layering Enforcements:** Lower-level packages (`core`) MUST NOT depend on frontend UI frameworks (`react`, `@dexhelper/ui`).
- **Backend Isolation:** Backend serverless handlers (`functions`) MUST NOT import frontend-only or browser-specific libraries.
- **Dependency Scope:** Shared internal dependencies linked using `workspace:*` specifiers.

## Incremental Migration Plan
1. **Phase 1: Workspace Infrastructure & Boundary Tooling**
   - Refine `pnpm-workspace.yaml` and configure package scopes (`apps/*`, `packages/*`).
   - Introduce architectural linting / boundary rules (e.g. via dependency-cruiser, ESLint/Oxlint import constraints, or custom script checks) to prevent invalid imports (e.g., UI code in `core`).
2. **Phase 2: Extract Core Domain & Save Parsers (`@dexhelper/core`)**
   - Isolate save file parsers and game constants into `packages/core`.
   - Update internal references and verify unit test suites.
3. **Phase 3: Extract Shared UI Component Library (`@dexhelper/ui`)**
   - Move generic UI components, design tokens, and hooks into `packages/ui`.
4. **Phase 4: Isolate Backend Functions (`@dexhelper/functions`) & App Shell (`apps/web`)**
   - Re-organize Cloudflare functions and Vite web app into discrete workspace apps.
5. **Phase 5: CI/CD & Cloudflare Pages Configuration Update**
   - Update GitHub Actions workflows (`pnpm --filter ...`, cache paths).
   - Document Cloudflare Pages build settings changes (Root Directory, Build Command, Output Directory adjustments).

## Exploiting pnpm Features
- **Filtering & Selective Execution:** Use `pnpm --filter <package>...` for scoped building, testing, and linting.
- **Catalog Feature:** Leverage `pnpm` catalogs in `pnpm-workspace.yaml` for unified dependency version management across packages.
- **Shared Workspace Protocol:** Utilize `workspace:*` for strict internal package dependency linkage.

## Cloudflare Pages Build Adjustments Guidance
When migrating to `apps/web` or nested workspace packages:
- **Root Directory:** Set Cloudflare Pages Build Root Directory to `apps/web` (or repository root with `pnpm --filter @dexhelper/web build`).
- **Build Command:** `pnpm run build` or `pnpm --filter @dexhelper/web build`.
- **Output Directory:** `dist` (relative to app build directory) or `apps/web/dist`.
- **Functions Directory:** Point Cloudflare Pages Functions path to `apps/functions` or maintain root `/functions` depending on CF Pages monorepo configuration.

## Acceptance Criteria
- [ ] Product Manager: Convert this IDEA into a PRD detailing the incremental migration phases, workspace boundaries, and Cloudflare Pages configuration instructions.
- [ ] Tech Lead: Break down the architectural refactoring into isolated TASK nodes per phase.
