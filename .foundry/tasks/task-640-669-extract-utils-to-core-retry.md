---
id: task-640-669-extract-utils-to-core-retry
type: TASK
title: Migrate pure JS/TS logic from src/utils to packages/core (Retry)
status: READY
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-07'
depends_on:
  - research-640-668-investigate-extract-utils-timeout
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

# Migrate pure JS/TS logic from src/utils to packages/core (Retry)

## Context
As part of the domain extraction, we will first extract just the `src/utils` directory to `packages/core/src/` to avoid timeout issues. Follow the recommendations from the research task to avoid failing again. Ensure you explicitly invoke the `submit` tool to open a PR.

## Acceptance Criteria
- [ ] Move non-DOM, non-React specific files from `src/utils/` to `packages/core/src/`.
- [ ] Ensure no React or DOM dependencies are introduced or remain in the migrated files.
