---
id: story-061-099-extract-pokemon-pids
type: STORY
title: Extract Pokemon PIDs
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-06-09'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-038-061-mirage-island-engine
tags:
  - gen3
  - mirage-island
  - rng
research_references: []
rejection_reason: ''
notes: ''
---

# Extract Pokemon PIDs

## Context
As defined in Epic `epic-038-061-mirage-island-engine`, the Gen 3 save parser needs to extract the PIDs of all Pokémon owned by the player.

## Requirements
Parse the 32-bit personality values (PIDs) from all Pokémon in the player's active party and PC storage boxes.
Use the `DataView` API for safe data parsing as per ADR 010.

## Acceptance Criteria
- [x] Create/Update TASK nodes to implement parsing the 32-bit PIDs for all party and PC Pokémon in Gen 3 saves.

### Implementation Tasks
- [x] .foundry/tasks/task-099-157-gen3-extract-pokemon-pids-impl.md
- [x] .foundry/tasks/task-099-158-gen3-extract-pokemon-pids-qa.md
