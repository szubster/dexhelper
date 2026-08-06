---
id: epic-055-406-gen3-move-tutor-compatibility
type: EPIC
title: "Gen 3 Move Tutor Compatibility Cross-Referencing"
status: PENDING
owner_persona: "story_owner"
created_at: "2026-08-06"
updated_at: "2026-08-06"
depends_on:
  - epic-055-405-gen3-move-tutor-save-parsing
jules_session_id: null
pr_number: null
parent: prd-094-055-move-tutor-tracker
tags: ["gen3", "move-tutor", "compatibility"]
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Gen 3 Move Tutor Compatibility Cross-Referencing

Cross-reference the move's compatibility matrix with the Pokémon currently stored in the player's PC boxes (and Party). Leverage the existing PokeData MsgPack architecture (ADR 015) for move compatibility data.

## Integration & E2E Requirements
This epic MUST generate a final STORY dedicated exclusively to Integration and E2E Verification.

## Acceptance Criteria
- [ ] For each available tutor, identify the specific move taught.
- [ ] Identify compatible Pokémon from the player's save file (PC/Party) relying on the MsgPack PokeData system.