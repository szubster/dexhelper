---
id: epic-115-331-gen3-fame-checker-research
type: EPIC
title: Gen 3 Fame Checker Event Flag Research
status: PENDING
owner_persona: story_owner
created_at: '2026-07-17'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-115-115-gen3-fame-checker-assistant
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

# Gen 3 Fame Checker Event Flag Research

## Context
As defined in `prd-115-115-gen3-fame-checker-assistant`, tracking missing Fame Checker entries in Pokémon FireRed and LeafGreen is tedious because the game only shows acquired entries. We need to leverage DexHelper's save parsing to read hidden event flags for Fame Checker progress.

Before we can extract this data, we need to know exactly which bits or event flags correspond to which Fame Checker entries in the FireRed/LeafGreen save file structure.

## Objectives
- Research and document the exact memory offsets, event flags, or bitmasks used to track Fame Checker progress in FireRed and LeafGreen.
- Create a comprehensive mapping between in-game Fame Checker entries (e.g., Oak, Daisy, Bill) and their underlying save file data points.

## Scope
- Focus exclusively on Pokémon FireRed and LeafGreen save files.
- Produce documentation detailing the findings.

## Acceptance Criteria
- [ ] story-331-431-conduct-fame-checker-research
- [ ] story-331-432-fame-checker-research-e2e
