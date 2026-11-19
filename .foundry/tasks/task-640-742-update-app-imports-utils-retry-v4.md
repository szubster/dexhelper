---
id: task-640-742-update-app-imports-utils-retry-v4
type: TASK
title: Update application imports to use @dexhelper/core for utils (Retry v4)
status: CANCELLED
owner_persona: coder
created_at: '2026-11-03'
updated_at: '2026-11-10'
depends_on:
  - task-640-741-extract-utils-to-core-retry-v4
jules_session_id: null
pr_number: null
parent: story-526-640-extract-domain-logic
tags:
  - architecture
  - monorepo
  - pnpm
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  research-640-740-investigate-extract-utils-timeout-v5
notes: ''
locks: []
---

# Update application imports to use @dexhelper/core for utils (Retry v4)

## Context
After migrating src/utils logic to @dexhelper/core, the main application in src/ needs to update its import statements.

## Acceptance Criteria
- [ ] Update all references in the main application code (e.g., React components, hooks) to import from @dexhelper/core instead of relative paths in src/utils/.
- [ ] Run typescript checks to ensure all imports resolve correctly.
