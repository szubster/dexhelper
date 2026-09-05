---
id: epic-055-407-gen3-move-tutor-compatibility
type: EPIC
title: Gen 3 Move Tutor Compatibility Cross-Referencing
status: PENDING
owner_persona: story_owner
created_at: '2026-08-08'
updated_at: '2026-09-05'
depends_on:
  - epic-055-406-gen3-move-tutor-save-parsing
jules_session_id: null
pr_number: null
parent: prd-094-055-move-tutor-tracker
tags:
  - feature
  - gen3
  - compatibility
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Epic: Gen 3 Move Tutor Compatibility Cross-Referencing

## Objective
Implement logic to cross-reference available tutor moves with Pokémon in the player's PC boxes and Party using the `PokeData` MsgPack architecture.

## Scope
- Identify the specific move taught by each available tutor.
- Cross-reference the move's compatibility matrix with stored Pokémon.
- Leverage the existing `PokeData` MsgPack architecture (ADR 015) for compatibility data.

## Acceptance Criteria
- [ ] story-407-522-gen3-move-tutor-cross-referencing
- [ ] story-407-523-gen3-move-tutor-integration-e2e
- [ ] Cross-referencing logic correctly relies on the MsgPack `PokeData` system.
- [x] A final STORY dedicated exclusively to Integration and E2E Verification is generated.
