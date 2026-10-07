---
id: task-640-669-extract-utils-to-core-replacement
type: TASK
title: Migrate pure JS/TS logic from src/utils to packages/core (Replacement)
status: PENDING
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-07'
depends_on:
  - research-640-668-investigate-extract-utils-failure
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

# Migrate pure JS/TS logic from src/utils to packages/core (Replacement)

## Context
As part of the domain extraction, we will first extract just the `src/utils` directory to `packages/core/src/` to avoid timeout issues. This replaces the permanently failed task `task-640-659-extract-utils-to-core`.

## Acceptance Criteria
- [ ] Incorporate recommendations from `research-640-668-investigate-extract-utils-failure`.
- [ ] Move non-DOM, non-React specific files from `src/utils/` to `packages/core/src/`.
- [ ] Ensure no React or DOM dependencies are introduced or remain in the migrated files.
