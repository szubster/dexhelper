---
id: task-640-647-update-app-imports-replacement
type: TASK
title: Update application imports to use @dexhelper/core (Replacement)
status: CANCELLED
owner_persona: coder
created_at: '2026-10-02'
updated_at: '2026-10-05'
depends_on:
  - task-640-646-extract-core-domain-logic-replacement
jules_session_id: null
pr_number: null
parent: story-526-640-extract-domain-logic
tags:
  - architecture
  - monorepo
  - pnpm
research_references: []
rejection_count: 0
rejection_reason: '[ACKNOWLEDGED] Parent task failed permanently'
notes: ''
locks: []
---

# Update application imports to use @dexhelper/core (Replacement)

## Context
After migrating core logic to `@dexhelper/core`, the main application in `src/` (which will become `apps/web`) needs to update its import statements. This replaces task-640-643-update-app-imports.

## Acceptance Criteria
- [ ] Update all references in the main application code (e.g., React components, hooks) to import from `@dexhelper/core` instead of relative paths in `src/engine/` or `src/utils/`.
- [ ] Run typescript checks to ensure all imports resolve correctly.
