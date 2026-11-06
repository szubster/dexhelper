---
id: task-640-720-extract-engine-data-to-core-retry-v3
type: TASK
title: Migrate pure JS/TS logic from src/engine/data to packages/core (Retry v3)
status: CANCELLED
owner_persona: coder
created_at: '2026-10-23'
updated_at: '2026-11-03'
depends_on:
  - task-640-719-qa-extract-utils-retry-v3
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
  task-640-717-extract-utils-to-core-retry-v3
notes: ''
locks: []
---

# Migrate pure JS/TS logic from src/engine/data to packages/core (Retry v3)

## Context
As part of the domain extraction, we will extract the src/engine/data directory to packages/core/src/.

## Acceptance Criteria
- [ ] Move non-DOM, non-React specific files from src/engine/data/ to packages/core/src/.
- [ ] Ensure no React or DOM dependencies are introduced or remain in the migrated files.
