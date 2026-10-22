---
id: task-640-688-extract-utils-to-core-retry-v2
type: TASK
title: Migrate pure JS/TS logic from src/utils to packages/core (Retry v2)
status: READY
owner_persona: coder
created_at: '2026-10-14'
updated_at: '2026-10-22'
depends_on:
  - research-640-687-investigate-extract-utils-timeout-v3
jules_session_id: null
pr_number: null
parent: story-526-640-extract-domain-logic
tags:
  - architecture
  - monorepo
  - pnpm
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
locks: []
---

# Migrate pure JS/TS logic from src/utils to packages/core (Retry v2)

## Context
As part of the domain extraction, we will extract `src/utils` directory to `packages/core/src/`. Follow the recommendations from the research task to avoid failing again.

## Acceptance Criteria
- [ ] Move non-DOM, non-React specific files from `src/utils/` to `packages/core/src/`.
- [ ] Ensure no React or DOM dependencies are introduced or remain in the migrated files.
