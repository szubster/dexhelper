---
id: task-640-646-extract-core-domain-logic-replacement
type: TASK
title: Migrate pure JS/TS logic from src/engine to packages/core (Replacement)
status: FAILED
owner_persona: coder
created_at: '2026-10-02'
updated_at: '2026-10-04'
depends_on:
  - research-640-645-investigate-extract-core-domain-timeout
jules_session_id: null
pr_number: null
parent: story-526-640-extract-domain-logic
tags:
  - architecture
  - monorepo
  - pnpm
research_references: []
rejection_count: 2
rejection_reason: '[ACKNOWLEDGED] Session terminated with state: COMPLETED'
notes: ''
locks: []
---

# Migrate pure JS/TS logic from src/engine to packages/core (Replacement)

## Context
The core domain logic currently resides in `src/engine` and `src/utils`. We need to extract the pure logic files to `packages/core/src/`. This replaces the failed task-640-642-extract-core-domain-logic.

## Acceptance Criteria
- [ ] Incorporate recommendations from research-640-645-investigate-extract-core-domain-timeout.
- [ ] Move non-DOM, non-React specific files (e.g., save parsing logic, data extraction, pure utilities) from `src/` to `packages/core/src/`.
- [ ] Update import paths within the migrated files to ensure they still reference each other correctly.
- [ ] Ensure no React or DOM dependencies are introduced or remain in the migrated files.
