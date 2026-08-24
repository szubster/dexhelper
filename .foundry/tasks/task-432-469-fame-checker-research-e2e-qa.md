---
id: task-432-469-fame-checker-research-e2e-qa
type: TASK
title: E2E Verification for Fame Checker Research
status: ACTIVE
owner_persona: qa
created_at: '2026-08-22'
updated_at: '2026-08-24'
depends_on: []
jules_session_id: '14060210673976403029'
pr_number: null
parent: story-331-432-fame-checker-research-e2e
tags:
  - gen3
  - firered
  - leafgreen
  - fame-checker
  - research
  - e2e
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: E2E Verification for Fame Checker Research

## Context
As part of the effort to extract Fame Checker progress from Pokémon FireRed and LeafGreen save files (`epic-115-331-gen3-fame-checker-research`), research has been conducted on the memory offsets and event flags for Gym Leaders and Notable NPCs. This task is dedicated to the end-to-end verification of this research documentation.

## Description
Verify that all 16 Fame Checker indices are accounted for, and memory offsets are correct across the research docs (`gen3_fame_checker_gym_leaders.md` and `gen3_fame_checker_notable_npcs.md`).

## Acceptance Criteria
- [x] Verify gen3_fame_checker_gym_leaders.md covers all gym leader indices correctly
- [x] Verify gen3_fame_checker_notable_npcs.md covers all notable NPC indices correctly
- [x] Ensure no indices between 0 and 15 are missing or unaccounted for
