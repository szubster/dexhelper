---
id: epic-340-417-engine-code-splitting
type: EPIC
title: Implement generation-specific code splitting for the engine
status: ACTIVE
owner_persona: story_owner
created_at: '2026-08-13'
updated_at: '2026-08-26'
depends_on: []
jules_session_id: '16986453588371903066'
parent: prd-136-340-split-bundles-and-data
tags:
  - performance
  - architecture
rejection_count: 0
rejection_reason: ''
notes: ''
---
# EPIC: Implement generation-specific code splitting for the engine

## Context & Objectives
To improve performance, generation-specific logic should be separated and lazily loaded.

## Requirements
- Split JS engine logic by generation using dynamic imports in `src/engine/saveParser/index.ts`.
- Split JS assistant logic by generation using dynamic imports in `src/engine/assistant/strategies/index.ts`.

## Acceptance Criteria
- [ ] Break down this epic into stories.
- [ ] Generate a final STORY dedicated exclusively to Integration and E2E Verification.
