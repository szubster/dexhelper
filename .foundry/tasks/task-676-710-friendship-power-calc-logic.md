---
id: task-676-710-friendship-power-calc-logic
type: TASK
title: Implement Friendship Move Power Calculation Logic
status: ACTIVE
owner_persona: coder
created_at: '2026-10-19'
updated_at: '2026-10-29'
depends_on: []
jules_session_id: '8716137541009607355'
pr_number: null
parent: story-095-676-friendship-display-and-power-calc
tags:
  - logic
  - typescript
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Friendship Move Power Calculation Logic

## Description
Implement the core logic to calculate the base power of the moves Return and Frustration based on a given Friendship value (0-255).
Return Base Power = Friendship / 2.5 (max 102)
Frustration Base Power = (255 - Friendship) / 2.5 (max 102)
Write comprehensive unit tests to cover edge cases (0, 255) and rounding behavior.

## Acceptance Criteria
- [ ] Calculation functions for Return and Frustration base power are implemented.
- [ ] Unit tests are written to verify base power logic including edge cases (0, 255).
