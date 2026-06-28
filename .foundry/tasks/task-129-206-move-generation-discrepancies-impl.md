---
id: task-129-206-move-generation-discrepancies-impl
type: TASK
title: Apply Move Generation Discrepancies
status: ACTIVE
owner_persona: coder
created_at: '2026-06-19'
updated_at: '2026-06-27'
depends_on: []
jules_session_id: '13525768377188504297'
pr_number: null
parent: story-086-129-move-generation-discrepancies
tags:
  - build
  - refactor
  - impl
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Apply Move Generation Discrepancies (Implementation)

## Background
Moves can have different stats (like PP, Power, Accuracy) across different generations. The initial extraction gets the base data from PokeAPI, but we must account for historical generation differences, particularly relevant for Gen 1-3 support.

## Goals
1. Process the extracted move data in `scripts/generate-pokedata.ts` to apply generation-specific overrides where necessary.
2. Ensure base PP values are accurately stored, leaving max PP calculations to the client runtime as per ADR 025.

## Context and Constraints
- Leverage `past_values` or `version_group_details` arrays from PokeAPI if using dynamic extraction.
- Prioritize Gen 1-3 accurate stats where available, or fallback to the latest stats if historical data is missing or uniform.
- As per ADR 025, base PP is what should be stored. Do not calculate max PP within the generation script.

## Reminder for Coder/QA Personas
- **Transient Failures:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Policy:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Identify generation discrepancies for moves relevant to Gen 1-3 within the generation script logic.
- [x] Apply necessary overrides to the extracted move data before saving to `moves.jsonl`.
- [x] Ensure that only base PP is stored for each move.
