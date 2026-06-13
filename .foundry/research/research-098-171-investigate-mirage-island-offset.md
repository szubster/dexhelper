---
id: research-098-171-investigate-mirage-island-offset
type: RESEARCH
title: Investigate Mirage Island Offset and Section
status: ACTIVE
owner_persona: researcher
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: '2450565622412988491'
pr_number: null
parent: story-061-098-locate-mirage-island-data
tags:
  - gen3
  - mirage-island
  - save-parsing
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Mirage Island Offset and Section

## Context
The QA validation failed for the Mirage Island offset documentation (`task-098-158-qa-mirage-island-offset`). The rejection reason states:
> Validation FAILED: The documentation incorrectly attributes the offset to "Section 3-4 - Game Specific Data". According to Bulbapedia, 0x0408 and 0x0464 belong to "Section 2 - Game State". The target task has been failed and reverted for correction.

## Requirements
1. Investigate the Bulbapedia claims and cross-reference with authoritative sources (e.g., Pret decompilations) to determine the correct logical 4KB section boundaries for the Gen 3 save file.
2. Determine if the offset `0x0408` (Ruby/Sapphire) and `0x0464` (Emerald) falls within "Section 2 - Game State" or "Section 3-4 - Game Specific Data".
3. Provide a detailed summary of the findings so that the subsequent documentation task can record the correct offset and section information.

## Acceptance Criteria
- [ ] Determine the correct section (Section 2 or Section 3-4) for the Mirage Island daily value.
- [ ] Document the findings and provide references to authoritative sources.
