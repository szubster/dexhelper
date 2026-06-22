---
id: task-108-192-gen3-roamer-dataview-extraction-impl
type: TASK
title: Implement Gen 3 Roamer DataView Extraction and Core Parsing
status: CANCELLED
owner_persona: coder
created_at: '2026-06-16'
updated_at: '2026-06-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-070-108-gen3-roamer-dataview-extraction
tags:
  - gen3
  - roamer
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: 'Cancelled and replaced by task-108-210-gen3-roamer-dataview-extraction-impl to include magic number rule'
notes: ''
---

# Implement Gen 3 Roamer DataView Extraction and Core Parsing

## Objective
Implement logic to extract the 20-byte hidden roamer data structure from Gen 3 save files using `DataView` and parse IVs, HP, and Level.

## Description
This task involves writing the core extraction logic for the Gen 3 roamer data. The 20-byte structure must be read safely using the `DataView` API (avoiding raw `Uint8Array` manipulations). After extracting the raw data, implement the specific logic to correctly parse the IVs, HP, and Level from this byte structure.

To parse the IVs from the 32-bit IV integer, use the following 5-bit mask and shift formulas:
- **HP:** `(ivs >> 0) & 0x1F`
- **Attack:** `(ivs >> 5) & 0x1F`
- **Defense:** `(ivs >> 10) & 0x1F`
- **Speed:** `(ivs >> 15) & 0x1F`
- **Special Attack:** `(ivs >> 20) & 0x1F`
- **Special Defense:** `(ivs >> 25) & 0x1F`


## Acceptance Criteria
- [ ] Implement a `DataView`-based reader for the 20-byte Gen 3 roamer structure.
- [ ] Implement parsing logic to extract IVs, HP, and Level.
- [ ] Ensure `DataView` native API is used exclusively for reading bytes (e.g., `getUint8`, `getUint16`, `getUint32`).
- [ ] Ensure all memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.

## Execution Constraints
- **CRITICAL**: All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.
- **CRITICAL**: Ensure that any out-of-bounds reads result in a `RangeError` that is caught and handled gracefully by propagating a validation error (e.g., "Corrupted Save File" or "The save file is corrupted or incomplete.").
- **CRITICAL**: If you experience a transient failure requiring retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **CRITICAL**: If you must abort or permanently fail a task (impossible or max rejections reached), update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **CRITICAL**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.


### Auditor Rejection
This task is permanently cancelled and replaced by task-108-210-gen3-roamer-dataview-extraction-impl to include magic number rule.
