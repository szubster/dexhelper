---
id: task-298-440-gen2-roamer-status-hp-check-impl
type: TASK
title: Update Gen 2 Roamer Status Check to Include HP
status: ACTIVE
owner_persona: coder
created_at: '2026-08-18'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: '18132436912921752968'
pr_number: null
parent: story-139-298-gen2-roamer-status-and-standardization
tags:
  - bugfix
  - gen2
  - roamer
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Update Gen 2 Roamer Status Check to Include HP

## Context
The Gen 2 roamer extraction logic currently determines if a roamer is active solely by checking if its `mapGroup` is not `0xFF`. However, a roamer is also inactive if it has been defeated or caught, which is represented by having an HP of `0`.

## Requirements
- In `src/engine/saveParser/parsers/gen2.ts`, update the `parseRoamingLegendaries` function.
- Modify the `isActive` assignment to check that both `mapGroup !== ROAMER_INACTIVE_MAP_GROUP` AND the parsed `hp` (at `structOffset + ROAMER_OFFSET_HP`) is greater than `0`.
- The parsed structure is already standardized and correctly mapped to `saveData.roamingLegendaries`.
- Self-verify the changes by running unit tests.

## Acceptance Criteria
- [ ] Determine roamer activity based on both `MapGroup != 0xFF` and `HP > 0`.
- [ ] Ensure all existing tests pass after the modification.
