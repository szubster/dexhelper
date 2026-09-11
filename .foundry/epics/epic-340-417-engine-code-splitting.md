---
id: epic-340-417-engine-code-splitting
type: EPIC
title: Implement generation-specific code splitting for the engine
status: COMPLETED
owner_persona: story_owner
created_at: '2026-08-13'
updated_at: '2026-09-11'
depends_on: []
jules_session_id: null
parent: prd-136-340-split-bundles-and-data
tags:
  - performance
  - architecture
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# EPIC: Implement generation-specific code splitting for the engine

## Context & Objectives
To improve performance, generation-specific logic should be separated and lazily loaded.

## Requirements
- Split JS engine logic by generation using dynamic imports in `src/engine/saveParser/index.ts`.
- Split JS assistant logic by generation using dynamic imports in `src/engine/assistant/strategies/index.ts`.

## Acceptance Criteria
- [x] Break down this epic into stories.
- [x] Generate a final STORY dedicated exclusively to Integration and E2E Verification.
- [x] story-417-477-save-parser-code-splitting
- [x] story-417-478-assistant-code-splitting
- [x] story-417-479-engine-code-splitting-e2e
