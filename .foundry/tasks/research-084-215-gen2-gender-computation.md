---
id: research-084-215-gen2-gender-computation
type: RESEARCH
title: Investigate Gen 2 Gender Computation
status: PENDING
owner_persona: researcher
created_at: '2026-06-20'
updated_at: '2026-06-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-044-084-breeding-pair-algorithm
tags:
  - research
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 2 Gender Computation

## Objective
Investigate and document the exact mechanics, memory offsets, and formulas for computing a Gen 2 Pokémon's gender based on its Attack DV and Gender Ratio.

## Acceptance Criteria
- [ ] Determine the exact mapping between Gender Ratio constants and Attack DV thresholds.
- [ ] Document the bitwise logic for extracting the Attack DV from the Gen 2 Pokémon data structure.
- [ ] If transient failures occur, update YAML to `status: FAILED` with a `rejection_reason`. If aborting, update to `status: CANCELLED` with `rejection_reason`.
- [ ] If submitting an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.