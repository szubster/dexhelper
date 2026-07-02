---
id: task-242-249-gen3-roamer-dataview-parser-impl
type: TASK
title: Gen 3 Roamer DataView Parsing Implementation
status: COMPLETED
owner_persona: coder
created_at: '2026-06-29'
updated_at: '2026-07-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-101-242-gen3-roamer-parser
tags:
  - gen3
  - roamer
  - dataview
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer DataView Parsing Implementation

## Objective
Implement a robust parser for the Gen 3 `Roamer` struct using the `DataView` API.

## Description
The `Roamer` struct holds the state of the roaming legendary Pokémon in Generation 3 games. This task requires extracting this struct from `SaveBlock1` using version-specific offsets.

**Base Offsets in SaveBlock1:**
- Emerald: `0x31DC`
- Ruby/Sapphire: `0x3144`
- FireRed/LeafGreen: `0x30D0`

**Fields to Extract (relative to the base offset):**
- IVs: `0x00` (32-bit integer)
- Personality: `0x04` (32-bit integer)
- Species: `0x08` (16-bit integer)
- HP: `0x0A` (16-bit integer)
- Level: `0x0C` (8-bit integer)
- Status: `0x0D` (8-bit integer)
- Active: `0x13` (Boolean, 8-bit integer where non-zero is true)

## Architectural Constraints & Rules (CRITICAL)
- **DataView API Only:** All parsing logic MUST exclusively use the native `DataView` API. Do not use raw `Uint8Array` manipulations.
- **No Magic Numbers:** All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.
- **Bounds Checking:** The parser must rely on `DataView` to throw `RangeError` on out-of-bounds reads. These `RangeError`s must be caught explicitly by the parser and gracefully propagated up as specific validation errors (e.g., "Corrupted Save File").
- **Bitwise Operations:** When unpacking bitwise data (e.g., IVs if they need unpacking), use explicit bitwise shifting (`>>`) and masking (`&`) to isolate discrete properties.
- **Empty PRs:** If you determine the artifact already exists and meets all criteria, you must still submit an empty PR. **CRITICAL:** Before submitting an empty PR, you MUST check off all Acceptance Criteria checkboxes. Submitting an empty PR with unchecked boxes violates ADR 007 and ADR 009.
- **Failures:**
  - If you experience a transient failure requiring a retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
  - If you must abort or permanently fail the task (impossible or max rejections reached), update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.

## Acceptance Criteria
- [x] Create or update the Gen 3 parsing module to extract the `Roamer` struct using `DataView`.
- [x] Define all offsets (`0x31DC`, `0x3144`, `0x30D0`, `0x00`, `0x04`, `0x08`, `0x0A`, `0x0C`, `0x0D`, `0x13`) as module-level constants.
- [x] Extract the `active` boolean properly from offset `0x13`.
- [x] Catch `RangeError` from `DataView` operations and handle them gracefully.
