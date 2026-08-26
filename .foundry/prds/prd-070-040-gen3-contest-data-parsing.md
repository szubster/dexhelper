---
id: prd-070-040-gen3-contest-data-parsing
type: PRD
title: Gen 3 Contest Data Parsing
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-06-08'
updated_at: '2026-08-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-070-gen3-contest-tracker
tags:
  - feature
  - gen3
  - contests
  - parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Gen 3 Contest Data Parsing

## 1. Context
As part of the Gen 3 Contest Stat and Ribbon Tracker feature, DexHelper needs the ability to extract hidden contest-related statistics and ribbons directly from Gen 3 save files. This includes data for Condition (Cool, Beauty, Cute, Smart, Tough), Sheen, and Contest Ribbons across all Pokémon in the player's collection.

## 2. Requirements

### 2.1 Parsing Engine Compatibility
- The parsing engine must be updated to locate and extract contest-related data from the appropriate blocks in Gen 3 save formats (Ruby, Sapphire, Emerald, FireRed, LeafGreen).

### 2.2 Strict DataView API Usage
- All parsing logic for contest data MUST exclusively use the native `DataView` API (e.g., `getUint8`, `getUint16`, `getUint32`) as mandated by ADR 010.
- Out-of-bounds reads must gracefully propagate as specific validation errors, avoiding application crashes.

### 2.3 Required Data Points
- Extract the following hidden Condition stats per Pokémon: Cool, Beauty, Cute, Smart, and Tough.
- Extract the Pokémon's Sheen value.
- Extract the bitfield/flags associated with all Contest Ribbons.

### 2.4 Backwards Compatibility
- The addition of Gen 3 contest parsing logic must not break or modify existing parsing interfaces for Gen 1 and Gen 2, ensuring strict backwards compatibility.

## 3. Acceptance Criteria
- [ ] Implement `DataView`-based parsing logic for Gen 3 Condition, Sheen, and Ribbon data.
- [ ] Map the extracted data to appropriate fields in the internal Pokémon data structure.
- [ ] Graceful error handling for corrupted or incomplete save segments is implemented.
- [ ] All existing Gen 1 and Gen 2 save parsing tests pass without modification.
- [ ] New unit tests confirm accurate extraction of contest data from known Gen 3 save file fixtures.

### Epic Breakdown
- [x] `epic-040-064-gen3-contest-data-extraction`
- [x] `epic-040-065-gen3-contest-data-integration`
