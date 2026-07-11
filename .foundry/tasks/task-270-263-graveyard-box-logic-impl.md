---
id: task-270-263-graveyard-box-logic-impl
type: TASK
title: Graveyard Box State and Logic Implementation
status: COMPLETED
owner_persona: coder
created_at: '2026-07-05'
updated_at: '2026-07-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-131-270-graveyard-box-state
tags:
  - feature
  - nuzlocke
  - verification
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Graveyard Box State and Logic Implementation

## Objective
Implement backend state and calculation logic for identifying Pokémon in the designated Graveyard Box as permanently dead.

## Contract / Acceptance Criteria
- [x] Add a backend configuration/state for specifying a "Graveyard Box" (e.g. integer `boxNumber`).
- [x] Implement logic so that any Pokémon located in the designated Graveyard Box is evaluated as "dead" (or flagged accordingly), regardless of its HP value.
- [x] All new state management patterns should align with current application architecture.

## Instructions & Reminders for Coder
- **Transient Failures:** If you experience a transient failure requiring a retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Aborts:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- **Constants:** If any memory offsets or save file parsing are required for this, explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.
