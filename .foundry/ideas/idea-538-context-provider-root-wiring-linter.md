---
id: idea-538-context-provider-root-wiring-linter
type: IDEA
title: Static AST Linter Rule for React Context Application Root Wiring
status: PENDING
owner_persona: product_manager
created_at: '2026-10-14'
updated_at: '2026-10-24'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - react
  - linter
  - context
  - architecture
rejection_count: 1
rejection_reason: ''
locks: []
priority: 80
---

# Idea: Static AST Linter Rule for React Context Application Root Wiring

## Problem
During QA verification of tasks involving new custom React Contexts (e.g. `task-520-552-feature-flags-qa`), Context Provider components (such as `FeatureFlagProvider`) were defined and used via custom hooks (`useFeatureFlags`), but omitted from the top-level application root wrapper (`src/main.tsx` or `src/App.tsx`). This resulted in runtime context errors (`useFeatureFlags must be used within FeatureFlagProvider`) when components were rendered in the application view hierarchy.

## Proposed Solution
Create a static AST analysis rule or linter utility in `.github/scripts/` or Biome/ESLint that:
1. Scans `src/` for custom React Context definitions (`createContext` / custom Provider components).
2. Verifies that exported Context Providers are referenced/wrapped inside `src/main.tsx` or top-level application entry trees.
3. Reports un-wired Context Providers during `pnpm lint` or build verification checks.

## Value
Prevents unwrapped Context runtime errors, guarantees proper context hierarchy integration across feature implementations, and reduces QA transient rejections.

## Acceptance Criteria
- [x] PRD generated detailing static AST context wiring validation specifications.
- [ ] prd-538-703-ast-linter-context-wiring
- [ ] Linter rule or verification script integrated into `pnpm lint` workflow.
