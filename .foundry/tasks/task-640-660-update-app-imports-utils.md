---
id: task-640-660-update-app-imports-utils
type: TASK
title: Update application imports to use @dexhelper/core for utils
status: CANCELLED
rejection_reason: '[ACKNOWLEDGED] Parent dependency permanently failed'

owner_persona: coder
created_at: '2026-10-03'
updated_at: '2026-10-03'
depends_on:
  - task-640-659-extract-utils-to-core
jules_session_id: null
pr_number: null
parent: story-526-640-extract-domain-logic
tags:
  - architecture
  - monorepo
  - pnpm
research_references: []
rejection_count: 0

notes: ''
locks: []
---

# Update application imports to use @dexhelper/core for utils

## Context
After migrating `src/utils` logic to `@dexhelper/core`, the main application in `src/` needs to update its import statements.

## Acceptance Criteria
- [ ] Update all references in the main application code (e.g., React components, hooks) to import from `@dexhelper/core` instead of relative paths in `src/utils/`.
- [ ] Run typescript checks to ensure all imports resolve correctly.
