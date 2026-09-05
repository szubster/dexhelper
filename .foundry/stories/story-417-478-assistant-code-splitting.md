---
id: story-417-478-assistant-code-splitting
type: STORY
title: Split assistant logic by generation
status: PENDING
owner_persona: tech_lead
created_at: '2026-08-26'
updated_at: '2026-09-02'
depends_on:
  - story-417-477-save-parser-code-splitting
jules_session_id: null
parent: epic-340-417-engine-code-splitting
tags:
  - performance
  - architecture
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Split assistant logic by generation

## Context & Objectives
To improve performance, generation-specific logic should be separated and lazily loaded in `src/engine/assistant/strategies/index.ts`.

## Acceptance Criteria
- [x] Break down into Tasks
- [ ] task-478-514-implement-strategy-code-splitting
- [ ] task-478-515-qa-strategy-code-splitting
