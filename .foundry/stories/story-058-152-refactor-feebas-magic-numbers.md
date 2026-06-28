---
id: story-058-152-refactor-feebas-magic-numbers
type: STORY
title: Refactor Feebas Magic Numbers
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-20'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: '16304944886899987556'
pr_number: null
parent: epic-036-058-feebas-backend-parsing
tags:
  - gen3
  - backend
  - refactor
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Refactor Feebas Magic Numbers

## Objective
Refactor `src/engine/gen3/feebas.ts` to replace all inline magic numbers with explicitly defined and reusable constants. This addresses the memory rule violation cited by the Auditor for the parent Epic.

## Context
While the memory offsets (`0x2dd6` and `0x2e66`) were previously addressed, the algorithm still contains inline magic numbers for shifts, lengths, and multipliers (e.g., `1103515245`, `12345`, `16`, `447`, `6`, `4`). The architectural rule forbids these from being inline.

## Acceptance Criteria
- [ ] Extract PRNG multiplier (`1103515245`) and addend (`12345`) into descriptive constants.
- [ ] Extract bit shift (`16`) into a constant.
- [ ] Extract lengths and boundaries (`447` total spots, `6` valid spots, `4` inaccessible boundary) into constants.
- [ ] Ensure all constants are exported at the module level.
- [ ] Break down into Tasks
