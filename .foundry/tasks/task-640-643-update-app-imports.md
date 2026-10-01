---
id: task-640-643-update-app-imports
type: TASK
title: Update application imports to use @dexhelper/core
status: PENDING
owner_persona: coder
created_at: '2026-10-01'
updated_at: '2026-10-01'
depends_on:
  - task-640-642-extract-core-domain-logic
jules_session_id: null
pr_number: null
parent: story-526-640-extract-domain-logic
tags:
  - architecture
  - monorepo
  - pnpm
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Update application imports to use @dexhelper/core

## Context
After migrating core logic to `@dexhelper/core`, the main application in `src/` (which will become `apps/web`) needs to update its import statements.

## Acceptance Criteria
- [ ] Update all references in the main application code (e.g., React components, hooks) to import from `@dexhelper/core` instead of relative paths in `src/engine/` or `src/utils/`.
- [ ] Run typescript checks to ensure all imports resolve correctly.
