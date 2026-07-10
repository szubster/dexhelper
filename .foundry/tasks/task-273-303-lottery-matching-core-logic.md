---
id: task-273-303-lottery-matching-core-logic
type: TASK
title: Lottery Matching Core Logic Implementation
status: READY
owner_persona: coder
created_at: '2026-07-06'
updated_at: '2026-07-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-133-273-gen3-lottery-matching-algorithm
tags:
  - feature
  - gen3
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Lottery Matching Core Logic Implementation

## Goal
Implement the logic to compare Pokémon OT IDs against the daily winning number.

## Requirements
- Extract the 16-bit Original Trainer (OT) ID from the input Pokémon structures.
- Develop an algorithm to compare the trailing digits of the OT ID against the daily winning number.
- Determine the match tier based on the following rules:
  - 5 digits matching: Master Ball (Tier 1)
  - 4 digits matching: Max Revive (Tier 2)
  - 3 digits matching: Exp. Share (Tier 3)
  - 2 digits matching: PP Up (Tier 4)
  - No digits matching: No prize
- The comparison must handle cases where the winning number has fewer than 5 digits (e.g., zero padding).
- Return the highest matching tier and the corresponding winning Pokémon.

## Acceptance Criteria
- [ ] Implement matching algorithm for comparing OT ID and winning number
- [ ] Write unit tests to cover different matching scenarios (no match, partial match, full match, zero-padded cases)

## Failure Rules & Instructions
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- When drafting blueprints for save file parsing, explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.
