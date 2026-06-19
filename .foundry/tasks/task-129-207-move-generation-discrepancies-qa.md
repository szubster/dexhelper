---
id: task-129-207-move-generation-discrepancies-qa
type: TASK
title: Verify Move Generation Discrepancies
status: READY
owner_persona: qa
created_at: '2026-06-19'
updated_at: '2026-06-19'
depends_on:
  - task-129-206-move-generation-discrepancies-impl
jules_session_id: null
pr_number: null
parent: story-086-129-move-generation-discrepancies
tags:
  - build
  - db
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Verify Move Generation Discrepancies (QA)

## Background
Move data extraction has been updated to apply generation-specific overrides for historical discrepancies, particularly Gen 1-3 differences in PP, power, and accuracy.

## Goals
1. Verify that the generated `moves.jsonl` data accurately reflects these generation-specific overrides.
2. Verify that base PP values are accurately stored instead of max PP.

## Verification Steps
1. Run the data generation script: `pnpm tsx scripts/generate-pokedata.ts`.
2. Inspect the output `data/db/moves.jsonl`.
3. Pick a few sample moves known to have changed (e.g., "Tackle" power/accuracy changes over generations, "Blizzard" accuracy changes, etc.).
4. Confirm that the extracted stats for Gen 1-3 align with historical data (e.g., from Bulbapedia) rather than latest Gen 9 stats.
5. Revert any uncommitted changes to the output directories (`git restore data/db/`) before finishing.

## Reminder for Coder/QA Personas
- **Transient Failures:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Policy:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Confirmed generation discrepancies are properly applied in `moves.jsonl` output for sample moves.
- [ ] Confirmed that base PP is stored correctly instead of max PP.
