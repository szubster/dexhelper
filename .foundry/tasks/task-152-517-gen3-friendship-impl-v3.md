---
id: task-152-517-gen3-friendship-impl-v3
type: TASK
title: Implement Gen 3 Friendship Data Extraction (v3)
status: READY
owner_persona: coder
created_at: '2026-09-02'
updated_at: '2026-09-02'
depends_on:
  - research-152-516-investigate-task-470-failure
jules_session_id: null
pr_number: null
parent: story-094-152-gen3-friendship-extraction
tags:
  - gen3
  - save-parsing
  - friendship
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Friendship Data Extraction (v3)

## Description
Implement the logic to extract the Friendship (Happiness) value for Gen 3 Pokémon in both the active Party and PC Boxes.

**CRITICAL INSTRUCTION:** Do NOT manually implement `PV % 24` permutation logic. The `extractGen3PokemonData` utility already decrypts and reorganizes the 48-byte Data block into a canonical `GAEM` format. You must simply use the canonical buffer and extract the Friendship byte at a fixed relative offset `0x04` within the Growth (G) substructure (which is always at offset `0` in the canonical buffer).

## Acceptance Criteria
- [ ] Implement utility/logic to extract friendship using canonical GAEM buffer
- [ ] Write unit tests verifying Friendship extraction
