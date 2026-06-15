---
id: task-095-183-gen3-berry-dataview-parsing-retry
type: TASK
title: Implement Gen 3 Berry Tracker DataView Parsing Logic (Retry)
status: ACTIVE
owner_persona: coder
created_at: '2026-06-14'
updated_at: '2026-06-15'
depends_on:
  - research-095-175-gen3-berry-implicit-data
jules_session_id: '208369059633576429'
pr_number: null
parent: story-055-095-gen3-berry-data-parsing
tags:
  - feature
  - gen3
  - berries
  - engine
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Gen 3 Berry Tracker DataView Parsing Logic (Retry)

## Overview
Implement the extraction logic for Gen 3 berry patches using the native `DataView` API, utilizing the correct relative offset calculations and excluding implicit/missing data from extraction requirements.

## Constraints & Architecture
- Follow ADR 010: Exclusively use the native `DataView` API (e.g., `getUint8`, `getUint16`) instead of raw `Uint8Array` manipulations.
- Implement graceful handling of bounds checking by throwing and explicitly catching `RangeError` within the parser engine. Propagate these as specific validation errors (e.g., "Corrupted Save File").
- CRITICAL: Berry Trees are located at logical offset `0x169C` in Section 1 of `SaveBlock1`. You must correctly calculate the relative offset into Section 1 using the Section 0 payload size (`0x0F80`), making the correct relative offset `0x071C`.
- CRITICAL: Do NOT attempt to extract implicit/missing data such as "Time Planted", "Last Watered Time", or "Map ID". These are not explicitly stored in the Gen 3 save format. Only extract explicitly available data like Berry ID and growth stage.
- IMPORTANT: If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- IMPORTANT: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement `DataView` reading logic for Gen 3 berry patches using correct relative offsets.
- [ ] Implement graceful handling of bounds checking by throwing/catching `RangeError`.
- [ ] Extract explicit data such as berry ID, current growth stage, regrowth count, and watering history booleans.
- [ ] Ensure implicit data (map ID, time planted, last watered time) are NOT included in the extraction schema.
