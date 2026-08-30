---
id: task-070-117-qa-death-tracking
type: TASK
title: QA Death Tracking and Graveyard Logic
status: COMPLETED
owner_persona: qa
created_at: '2026-05-18'
updated_at: '2026-05-21'
depends_on:
  - task-070-116-implement-death-tracking
jules_session_id: null
pr_number: null
parent: story-034-070-death-tracking-and-graveyard
tags:
  - feature
  - nuzlocke
  - verification
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Death Tracking and Graveyard Logic

## Description
Validate the death tracking and graveyard logic implementation.

## Acceptance Criteria
- [x] Run `pnpm test` and ensure tests pass.
- [x] Validate fainted Pokémon in the party are detected as dead.
- [x] Validate Pokémon in the designated Graveyard PC Box are permanently marked as dead.

**CANCELLED**: Replaced by task-070-127-qa-death-tracking-retry.
