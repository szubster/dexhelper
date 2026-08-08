---
id: task-358-402-gen3-roamer-model-and-struct-parser-impl
type: TASK
title: Gen 3 Roamer Model and Struct Parser Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-08-05'
updated_at: '2026-08-08'
depends_on: []
jules_session_id: '7956672584671289782'
pr_number: null
parent: story-397-358-gen3-roamer-dataview-parsing
tags:
  - gen3
  - roamer
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer Model and Struct Parser Implementation

## Objective
Define the TypeScript interfaces and implement a generic `DataView` parsing utility for extracting Gen 3 roaming legendary core data structures.

## Context
This task forms the foundation for Roamer parsing in Gen 3 games. The core structure holds data about the roaming Pokémon (Latias, Latios, Raikou, Entei, Suicune). We need strict typing and robust binary parsing following Section 13 guidelines.

## Acceptance Criteria
- [x] Define a TypeScript interface `Gen3RoamerData` representing the parsed Roamer data structure (IVs, Personality Value, Species, HP, Level, Status, active boolean).
- [x] Implement a generic `parseGen3RoamerStruct(dataView: DataView, offset: number)` function.
- [x] Strictly adhere to `.foundry/docs/schema.md` Section 13 (Save File Parsing & Extraction Guidelines): explicitly map bitwise flags, define module-level constants for offsets/lengths, avoid magic numbers, and explicitly catch/throw `RangeError` for out-of-bounds reads with the message "The save file is corrupted or incomplete.".
- [x] Add unit tests verifying parsing logic and error handling (RangeError).
