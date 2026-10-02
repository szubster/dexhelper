---
id: task-640-642-extract-core-domain-logic
type: TASK
title: Migrate pure JS/TS logic from src/engine to packages/core
status: READY
owner_persona: coder
created_at: '2026-10-01'
updated_at: '2026-10-02'
depends_on:
  - task-640-641-create-core-package-infrastructure
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

# Migrate pure JS/TS logic from src/engine to packages/core

## Context
The core domain logic currently resides in `src/engine` and `src/utils`. We need to extract the pure logic files to `packages/core/src/`.

## Acceptance Criteria
- [ ] Move non-DOM, non-React specific files (e.g., save parsing logic, data extraction, pure utilities) from `src/` to `packages/core/src/`.
- [ ] Update import paths within the migrated files to ensure they still reference each other correctly.
- [ ] Ensure no React or DOM dependencies are introduced or remain in the migrated files.
