---
id: story-304-320-gen3-contest-frontier-extraction
type: STORY
title: 'Story: Gen 3 Contest & Battle Frontier Extraction'
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-13'
updated_at: '2026-07-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-111-304-gen3-trainer-card-data-extraction
tags:
  - data-extraction
  - gen3
research_references:
  - .foundry/docs/knowledge_base/gen3_battle_frontier_data.md
  - .foundry/docs/knowledge_base/gen3_pokemon_data_structure.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Gen 3 Contest & Battle Frontier Extraction

## Objective
Extract Master Rank Contest condition ribbons and Battle Frontier Gold Symbols from Gen 3 save files.

## Requirements
- Use the `DataView` API (ADR 010).
- Extract magic numbers into module-level reusable constants (ADR 028).

## Acceptance Criteria
- [x] Implement Contest extraction logic.
- [x] Implement Battle Frontier extraction logic.
- [x] task-320-322-gen3-contest-frontier-impl
- [x] task-320-323-gen3-contest-frontier-qa
