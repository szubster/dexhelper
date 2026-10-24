---
id: prd-538-703-ast-linter-context-wiring
type: PRD
title: Static AST Linter Rule for React Context Application Root Wiring
status: READY
owner_persona: epic_planner
created_at: '2026-10-18'
updated_at: '2026-10-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-538-context-provider-root-wiring-linter
tags:
  - react
  - linter
  - context
  - architecture
rejection_count: 0
rejection_reason: ''
locks: []
priority: 80
---

# PRD: Static AST Linter Rule for React Context Application Root Wiring

## Problem
During QA verification of tasks involving new custom React Contexts, Context Provider components were defined and used via custom hooks, but omitted from the top-level application root wrapper (`src/main.tsx` or `src/App.tsx`). This resulted in runtime context errors.

## Solution
Create a static AST analysis rule or linter utility in `.github/scripts/` or Biome/ESLint that scans `src/` for custom React Context definitions, verifies that exported Context Providers are referenced/wrapped inside `src/main.tsx`, route definitions, generation-specific components, or other appropriately scoped application entry trees, and reports un-wired Context Providers during `pnpm lint` or build verification checks.

## Value
Prevents unwrapped Context runtime errors, guarantees proper context hierarchy integration across feature implementations, and reduces QA transient rejections.

## Acceptance Criteria
- [ ] Break down into Epics.
