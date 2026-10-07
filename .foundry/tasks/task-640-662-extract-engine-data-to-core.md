---
id: task-640-662-extract-engine-data-to-core
type: TASK
title: Migrate pure JS/TS logic from src/engine/data to packages/core
status: CANCELLED
rejection_reason: '[ACKNOWLEDGED] Parent dependency permanently failed'
owner_persona: coder
created_at: '2026-10-03'
updated_at: '2026-10-03'
depends_on:
  - research-640-658-investigate-extract-core-domain-timeout-v2
  - task-640-661-qa-extract-utils
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

# Migrate pure JS/TS logic from src/engine/data to packages/core

## Context
As part of the domain extraction, we will extract the `src/engine/data` directory to `packages/core/src/` to avoid timeout issues.

## Acceptance Criteria
- [ ] Move non-DOM, non-React specific files from `src/engine/data/` to `packages/core/src/`.
- [ ] Ensure no React or DOM dependencies are introduced or remain in the migrated files.
