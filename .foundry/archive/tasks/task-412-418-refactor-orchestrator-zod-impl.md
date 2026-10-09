---
id: task-412-418-refactor-orchestrator-zod-impl
type: TASK
title: Refactor Foundry Orchestrator Zod Types (Impl)
status: COMPLETED
owner_persona: coder
created_at: '2026-08-12'
updated_at: '2026-08-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-335-412-integrate-zod-schema
tags:
  - foundry
  - orchestrator
  - typescript
  - zod
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Refactor Foundry Orchestrator Zod Types (Implementation)

## Description
The DAG Orchestrator script (`.github/scripts/foundry-orchestrator.ts`) currently uses some manual `any` casts when interacting with the node frontmatter. The `.github/scripts/schema.ts` file already provides the `NodeFrontmatterSchema` Zod schema and corresponding `NodeFrontmatter` type. We need to replace the `any` casts with properly typed property access.

Specifically:
- Locate `const fmAny = node.frontmatter as any;` (around line 273/274 in `compilePromptForNode`). Update it to use proper typings, perhaps checking if `layers` exists on the frontmatter type. Note that `layers` was added as an optional array to `NodeFrontmatterSchema` in `schema.ts`.
- Locate `const item: any = {` (around line 727 in `main`). The output node structure should be correctly typed instead of defaulting to `any`. You can define a specific interface for the extended item output or rely on standard intersection types.

## Acceptance Criteria
- [x] Replace `any` casts with proper type usage based on `NodeFrontmatterSchema`.
- [x] Ensure that TypeScript compiles successfully (`pnpm type-check` or via your editor) after removing the `any` casts.
- [x] Ensure tests pass after the refactoring.
