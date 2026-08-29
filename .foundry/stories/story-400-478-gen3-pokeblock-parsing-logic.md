---
id: story-400-478-gen3-pokeblock-parsing-logic
type: STORY
title: Implement Gen 3 Pokéblock Case Parsing Logic
status: PENDING
owner_persona: story_owner
created_at: '2026-08-14'
updated_at: '2026-08-14'
depends_on:
  - story-400-477-gen3-pokeblock-constants-types
jules_session_id: '2513819693854721323'
pr_number: null
parent: epic-114-400-gen3-pokeblock-case-parsing-retry
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

# Implement Gen 3 Pokéblock Case Parsing Logic

## Context
With the constants and types defined, we need to implement the actual parsing logic to extract up to 40 Pokéblocks from the Gen 3 save file data.

## Acceptance Criteria
- [ ] Implement parsing function that reads the 8-byte structure for each of the 40 Pokéblocks.
- [ ] Map the byte fields correctly to their respective flavors and feel.
- [ ] Write unit tests verifying parsing correctness against known good save blocks.
- [ ] Break down into Tasks.
