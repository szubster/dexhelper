---
id: task-478-515-impl-pokeblock-parser
type: TASK
title: Implement Gen 3 Pokeblock Parsing Logic
status: ACTIVE
owner_persona: coder
created_at: 2026-09-02T00:00:00.000Z
updated_at: '2026-09-02'
depends_on: []
jules_session_id: '15904737233964935146'
parent: story-400-478-gen3-pokeblock-parsing-logic
tags:
  - gen3
  - pokeblocks
  - save-parsing
research_references:
  - .foundry/docs/knowledge_base/gen3_pokeblock_offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

## Description
Implement the core parsing function in the save engine to extract the 40 Pokeblocks from Gen 3 save data as referenced in .foundry/docs/knowledge_base/gen3_pokeblock_offsets.md.

## Acceptance Criteria
- [ ] Implement parsing function that reads the 8-byte structure for each of the 40 Pokeblocks.
- [ ] Map the byte fields correctly for color, spicy, dry, sweet, bitter, sour, and feel.
- [ ] Handle relative offsets appropriately for Gen 3 save sections.
- [ ] Adhere to Save File Parsing Guidelines by defining constants and avoiding magic numbers.
