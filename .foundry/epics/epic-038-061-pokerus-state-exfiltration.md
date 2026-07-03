---
id: epic-038-061-pokerus-state-exfiltration
type: EPIC
title: Pokerus State Exfiltration Epic
status: ACTIVE
owner_persona: story_owner
created_at: '2026-06-07'
updated_at: '2026-07-03'
depends_on: []
jules_session_id: '12540338683442428955'
pr_number: null
parent: prd-069-038-pokerus-tracker
tags:
  - gen2
  - save-engine
  - pokerus
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Pokerus State Exfiltration Epic

## Description
Read the specific byte flags for Pokerus for every Pokemon in the party and PC from the Gen 2 sav files.

## Acceptance Criteria
- [x] Extract pokerus data
- [ ] .foundry/stories/story-061-095-pokerus-byte-parsing.md
- [x] .foundry/archive/story-061-096-pokerus-tests.md
- [ ] .foundry/stories/story-061-155-refactor-pokerus-bitwise.md

<!-- Tech Lead: Verified complete. Pokerus bitwise logic is thoroughly tested including cured state boundaries. -->

### Auditor Rejection
The Epic's Acceptance Criteria lists two child stories (`story-061-095` and `story-061-155`) that are still located in `.foundry/stories/` rather than `.foundry/archive/` (where completed nodes are moved, as seen with `story-061-096`). This clearly indicates the descendant nodes have not fully transitioned to the `COMPLETED` state. A macro node MUST NOT be verified until all of its spawned descendant nodes in the generated sub-tree have fully transitioned to the `COMPLETED` state.

## Follow-up Nodes
- [x] .foundry/docs/adrs/adr-061-026-bitwise-state-extraction.md
Appending a newline to force the epic into the diff
