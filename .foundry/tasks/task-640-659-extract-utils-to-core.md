---
id: task-640-659-extract-utils-to-core
type: TASK
title: Migrate pure JS/TS logic from src/utils to packages/core
status: ACTIVE
owner_persona: coder
created_at: '2026-10-03'
updated_at: '2026-10-06'
depends_on:
  - research-640-658-investigate-extract-core-domain-timeout-v2
jules_session_id: '15647951651962781835'
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

# Migrate pure JS/TS logic from src/utils to packages/core

## Context
As part of the domain extraction, we will first extract just the `src/utils` directory to `packages/core/src/` to avoid timeout issues.

## Acceptance Criteria
- [ ] Move non-DOM, non-React specific files from `src/utils/` to `packages/core/src/`.
- [ ] Ensure no React or DOM dependencies are introduced or remain in the migrated files.
