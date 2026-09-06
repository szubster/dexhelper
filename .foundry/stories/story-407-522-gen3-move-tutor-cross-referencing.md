---
id: story-407-522-gen3-move-tutor-cross-referencing
type: STORY
title: Gen 3 Move Tutor Compatibility Logic
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-02'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: '17173678788577952181'
pr_number: null
parent: epic-055-407-gen3-move-tutor-compatibility
tags:
  - gen3
  - feature
  - compatibility
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Story: Gen 3 Move Tutor Compatibility Logic

## Objective
Implement logic to cross-reference available tutor moves with Pokémon in the player's PC boxes and Party using the `PokeData` MsgPack architecture.

## Scope
- Identify the specific move taught by each available tutor.
- Cross-reference the move's compatibility matrix with stored Pokémon.
- Leverage the existing `PokeData` MsgPack architecture (ADR 015) for compatibility data.

## Acceptance Criteria
- [x] Technical implementation tasks are created.
- [ ] task-522-549-gen3-move-tutor-compatibility-logic-coder
- [ ] task-522-550-gen3-move-tutor-compatibility-ui-coder
- [ ] task-522-551-gen3-move-tutor-compatibility-qa
