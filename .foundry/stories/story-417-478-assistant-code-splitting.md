---
id: story-417-478-assistant-code-splitting
type: STORY
title: Split assistant logic by generation
status: READY
owner_persona: tech_lead
created_at: '2026-08-26'
updated_at: '2026-09-01'
depends_on:
  - story-417-477-save-parser-code-splitting
jules_session_id: '16986453588371903066'
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
- [ ] Break down into Tasks
