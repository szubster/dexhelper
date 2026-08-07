---
id: task-273-307-gen3-lottery-matching-iteration-impl
type: TASK
title: Gen3 Lottery Matching Iteration Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-07-11'
updated_at: '2026-08-07'
depends_on: []
jules_session_id: '16374971181112178016'
pr_number: null
parent: story-133-273-gen3-lottery-matching-algorithm
tags:
  - feature
  - gen3
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen3 Lottery Matching Iteration Implementation

## Goal
Iterate through Party and PC Box Pokémon to find the best lottery match against the daily winning number.

## Requirements
- Leverage the existing logic in `src/engine/gen3/lottery/lottery.ts` (specifically `getBestLotteryMatch`).
- Implement the iteration logic that gathers all Pokémon currently in the Party and in the PC Boxes.
- Ensure the extraction of the 16-bit Original Trainer (OT) ID respects ADR 028 (no magic numbers, use module-level constants for memory offsets).
- Call `getBestLotteryMatch` with the collected Pokémon to find the highest matching tier.

## Contracts & Architecture Instructions
- **Coder Contract**: You are responsible for the implementation logic. Ensure you do not violate the overall architecture as described in ADR 001.
- **Failures**:
  - If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
  - If you must abort or permanently fail a task, update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- **Save File Parsing (ADR 028)**: Explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level. Inline magic numbers are forbidden.

## Acceptance Criteria
- [ ] Implement the Party and PC Box iteration logic to collect Pokémon.
- [ ] Ensure 16-bit OT IDs are extracted safely without magic numbers.
- [ ] Integrate with the core matching logic to determine the best match.
- [ ] Add unit tests verifying the iteration over standard and edge-case Party/Box structures.
