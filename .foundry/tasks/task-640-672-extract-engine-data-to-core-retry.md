---
id: task-640-672-extract-engine-data-to-core-retry
type: TASK
title: Migrate pure JS/TS logic from src/engine/data to packages/core (Retry)
status: PENDING
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-10'
depends_on:
  - task-640-671-qa-extract-utils-retry
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

# Migrate pure JS/TS logic from src/engine/data to packages/core (Retry)

## Context
As part of the domain extraction, we will extract the `src/engine/data` directory to `packages/core/src/` to avoid timeout issues. Ensure you explicitly invoke the `submit` tool to open a PR.

## Acceptance Criteria
- [ ] Move non-DOM, non-React specific files from `src/engine/data/` to `packages/core/src/`.
- [ ] Ensure no React or DOM dependencies are introduced or remain in the migrated files.
