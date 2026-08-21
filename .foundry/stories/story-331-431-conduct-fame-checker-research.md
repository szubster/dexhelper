---
id: story-331-431-conduct-fame-checker-research
type: STORY
title: Conduct Fame Checker Research
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-19'
updated_at: '2026-08-21'
depends_on: []
jules_session_id: '4064298945010374882'
pr_number: null
parent: epic-115-331-gen3-fame-checker-research
tags:
  - gen3
  - firered
  - leafgreen
  - fame-checker
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Conduct Fame Checker Research

## Context
As part of the effort to extract Fame Checker progress from Pokémon FireRed and LeafGreen save files (`epic-115-331-gen3-fame-checker-research`), we need to investigate and document the exact event flags and bitmasks used. This data will later power the extraction logic.

## Description
This story entails identifying the specific event flags that correlate with the Fame Checker entries (e.g., Oak, Daisy, Bill) in the Gen 3 save structure.

## Acceptance Criteria
- [ ] Investigate FireRed/LeafGreen save file memory layouts for Fame Checker event flags.
- [ ] Document the mappings between in-game entries and event flags in a markdown document.
- [ ] task-431-450-fame-checker-gym-leaders-impl
- [ ] task-431-451-fame-checker-notable-npcs-impl
