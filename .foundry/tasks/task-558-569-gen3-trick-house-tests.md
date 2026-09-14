---
id: task-558-569-gen3-trick-house-tests
type: TASK
title: Implement Gen 3 Trick House Save Parsing Unit Tests
status: PENDING
owner_persona: coder
created_at: '2026-09-12'
updated_at: '2026-09-12'
depends_on:
  - task-558-568-gen3-trick-house-core-logic
jules_session_id: null
pr_number: null
parent: story-540-558-trick-house-save-parsing
tags:
  - dexhelper
  - feature
  - gen3
  - tracker
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Gen 3 Trick House Save Parsing Unit Tests

## Context
Ensure the core logic for Trick House save parsing is robust and correctly handles memory extraction based on the provided specifications.

## Requirements
- Write unit tests for the core extraction logic.
- Verify that `VAR_TRICK_HOUSE_LEVEL`, puzzle state variables, and `VAR_TRICK_HOUSE_PRIZE_PICKUP` are extracted accurately.
- Verify serialization output matches `PokeData` format.
- Catch `RangeError` on out-of-bounds reads.

## Acceptance Criteria
- [ ] Unit tests written and passing for all Trick House parsing logic.
