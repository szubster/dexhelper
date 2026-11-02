---
id: task-640-717-extract-utils-to-core-retry-v3
type: TASK
title: Migrate pure JS/TS logic from src/utils to packages/core (Retry v3)
status: ACTIVE
owner_persona: coder
created_at: '2026-10-23'
updated_at: '2026-11-02'
depends_on:
  - research-640-716-investigate-extract-utils-timeout-v4
jules_session_id: '4829437522285929986'
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

# Migrate pure JS/TS logic from src/utils to packages/core (Retry v3)

## Context
As part of the domain extraction, we will extract src/utils directory to packages/core/src/. Follow the recommendations from the research task to avoid failing again.

## Acceptance Criteria
- [ ] Move non-DOM, non-React specific files from src/utils/ to packages/core/src/.
- [ ] Ensure no React or DOM dependencies are introduced or remain in the migrated files.
