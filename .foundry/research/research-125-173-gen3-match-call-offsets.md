---
id: research-125-173-gen3-match-call-offsets
type: RESEARCH
title: Discover Gen 3 Match Call Memory Offsets
status: ACTIVE
owner_persona: researcher
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: '15227747561538335360'
pr_number: null
parent: story-083-125-gen3-match-call-memory-offset-discovery
tags:
  - feature
  - gen3
  - tracking
  - save-parsing
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Discover Gen 3 Match Call Memory Offsets

## Objective
We need to determine the exact memory offsets in Pokémon Emerald `.sav` files for the Match Call data block. This includes trainer registers, rematch readiness flags, and tier states.

## Context
Gen 3 Pokémon Emerald features the Match Call system. To accurately parse save files and display the player's Match Call progress, we need to map the exact bytes and bitflags involved.
As mandated by ADR 010, memory offsets MUST map to their correct logical 4KB section boundaries as defined by authoritative sources (like Bulbapedia) to enable correct `DataView` parsing.

## Tasks
- **Memory Block Offsets**: Identify where the Match Call data begins and ends within the correct logical 4KB save section.
- **Rematch Readiness Bitflags**: Discover how the game encodes the "ready to rematch" status for registered trainers (e.g., bitflags, arrays).
- **Rematch Tier States**: Discover the data structure used for trainer match tiers/levels.

## Acceptance Criteria
- [x] Document the starting offset and length of the Match Call memory block, including the correct section ID.
- [x] Document the byte mapping and exact bitwise locations for rematch readiness flags.
- [x] Document the memory location and structure of rematch tier states.
- [x] Provide references to Bulbapedia or Bulbapedia source code confirming these locations.
