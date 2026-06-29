---
id: story-101-242-gen3-roamer-parser
type: STORY
title: Gen 3 Roamer DataView Parsing
status: READY
owner_persona: tech_lead
created_at: '2026-06-29'
updated_at: '2026-06-29'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-044-101-gen3-roamer-core-extraction-v2
tags:
  - gen3
  - roamer
  - dataview
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer DataView Parsing

## Objective
Implement robust `DataView` parsing for the Gen 3 `Roamer` struct across all Gen 3 game versions (Emerald, Ruby/Sapphire, FireRed/LeafGreen) to fulfill the first and third acceptance criteria of Epic 101.

## Description
The `Roamer` struct holds the state of the roaming legendary. We need to parse this struct from SaveBlock1.
- **Emerald:** `0x31DC`
- **Ruby/Sapphire:** `0x3144`
- **FireRed/LeafGreen:** `0x30D0`

We must extract IVs (`0x00`), Personality (`0x04`), Species (`0x08`), HP (`0x0A`), Level (`0x0C`), Status (`0x0D`), and Active boolean (`0x13`).

## Acceptance Criteria
- [ ] Implement a parser using `DataView` API that extracts the `Roamer` struct based on the version-specific offsets.
- [ ] Extract and expose the `active` boolean properly.
- [ ] Add unit tests using Vitest verifying the extraction logic against mock save data blocks for Emerald, RS, and FRLG.
- [ ] Tech Lead: Break down this Story into executable Tasks.
