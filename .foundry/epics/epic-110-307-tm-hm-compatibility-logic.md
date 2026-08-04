---
id: epic-110-307-tm-hm-compatibility-logic
type: EPIC
title: TM/HM Compatibility Engine Logic
status: PENDING
owner_persona: story_owner
created_at: "2026-08-04"
updated_at: "2026-08-04"
depends_on:
  - epic-110-306-tm-hm-save-parsing
jules_session_id: null
pr_number: null
parent: prd-105-110-tm-hm-inventory-planner
tags:
  - logic
  - compatibility
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# TM/HM Compatibility Engine Logic

## Description
This epic covers the Logic Layer of the TM/HM Inventory Planner. It implements a compatibility engine that, given a selected TM/HM, cross-references its corresponding move against the learnsets of all Pokémon currently in the player's Party and PC Boxes.

The engine must filter and identify which Pokémon can learn the move. Furthermore, it should refine the results by identifying Pokémon that are capable of learning the move but do not currently have a move of that type, thereby highlighting strategic gaps for the player.

## Dependencies & Prerequisites
- Requires the TM/HM inventory and mapping data provided by the Save Parsing epic.

## Acceptance Criteria
- [ ] Build compatibility engine to cross-reference TM/HM move with Party and PC Pokémon learnsets.
- [ ] Implement filtering logic to identify compatible Pokémon.
- [ ] Implement strategic gap identification logic (Pokémon that can learn the move but lack a move of that type).
- [ ] A final STORY dedicated exclusively to Integration and E2E Verification must be generated for this EPIC.
