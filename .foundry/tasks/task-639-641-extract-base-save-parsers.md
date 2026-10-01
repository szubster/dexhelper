---
id: task-639-641-extract-base-save-parsers
type: TASK
title: Extract base save parsers and utilities to core package
status: PENDING
owner_persona: coder
created_at: '2026-10-01'
updated_at: '2026-10-01'
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: story-526-639-extract-parsers
priority: 50
confidence_score: null
tags:
  - architecture
  - monorepo
  - pnpm
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Extract base save parsers and utilities to core package

Move `SaveDataReader`, common parser interfaces, and utilities from `src/engine/saveParser` to `@dexhelper/core`. Ensure no DOM/React dependencies are included and all tests are migrated and passing.

## Acceptance Criteria
- [ ] Complete implementation
