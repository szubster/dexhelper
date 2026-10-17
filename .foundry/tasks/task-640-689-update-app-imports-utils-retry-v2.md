---
id: task-640-689-update-app-imports-utils-retry-v2
type: TASK
title: Update application imports to use @dexhelper/core for utils (Retry v2)
status: READY
owner_persona: coder
created_at: '2026-10-14'
updated_at: '2026-10-14'
depends_on:
  - task-640-688-extract-utils-to-core-retry-v2
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

# Update application imports to use @dexhelper/core for utils (Retry v2)

## Context
After migrating `src/utils` logic to `@dexhelper/core`, the main application in `src/` needs to update its import statements.

## Acceptance Criteria
- [ ] Update all references in the main application code (e.g., React components, hooks) to import from `@dexhelper/core` instead of relative paths in `src/utils/`.
- [ ] Run typescript checks to ensure all imports resolve correctly.
