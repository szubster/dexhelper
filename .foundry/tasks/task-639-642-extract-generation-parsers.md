---
id: task-639-642-extract-generation-parsers
type: TASK
title: 'Extract Generation 1, 2, and 3 parsers to core package'
status: CANCELLED
owner_persona: coder
created_at: '2026-10-01'
updated_at: '2026-10-03'
depends_on:
  - task-639-641-extract-base-save-parsers
jules_session_id: null
pr_number: null
parent: story-526-639-extract-parsers
tags:
  - architecture
  - monorepo
  - pnpm
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  task-639-641-extract-base-save-parsers
notes: ''
locks: []
priority: 50
confidence_score: null
---

# Extract Generation 1, 2, and 3 parsers to core package

Move Gen 1, Gen 2, and Gen 3 specific parsers from `src/engine/saveParser/parsers` and related generation folders to `@dexhelper/core`. Update their internal imports to reference the base parsers in the core package.

## Acceptance Criteria
- [ ] Complete implementation
