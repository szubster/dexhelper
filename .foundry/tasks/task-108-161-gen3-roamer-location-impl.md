---
id: task-108-161-gen3-roamer-location-impl
type: TASK
title: Implement Gen 3 Roamer Location Data Extraction
status: READY
owner_persona: coder
created_at: '2026-06-11'
updated_at: '2026-06-11'
depends_on:
  - research-071-138-gen3-roamer-offsets
jules_session_id: null
pr_number: null
parent: story-072-108-gen3-roamer-location-extraction
tags:
  - gen3
  - roamer
  - map
research_references:
  - research-071-138-gen3-roamer-offsets
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Roamer Location Data Extraction

## Objective
Implement the `DataView` parsing logic to extract the map group and map number for the active Gen 3 roamer from the `.sav` file.

## Description
The Gen 3 roamer's location is stored outside the primary 20-byte struct in an EWRAM/save block structure (e.g., `sRoamerLocation`). Your task is to update the parsing engine to extract this location data (map group and map number) directly from the save file.

**CRITICAL INSTRUCTIONS:**
- You MUST use the `DataView` API exclusively for parsing, as mandated by ADR 010. Raw `Uint8Array` access is forbidden.
- Bounds checking must be correctly implemented and gracefully handled via `DataView` RangeErrors.
- If you find that this task is impossible to complete or if you permanently fail, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`. Do NOT set it to `COMPLETED` manually.
- If you submit an empty PR because the logic already exists, you MUST check all Acceptance Criteria checkboxes before doing so.

## Acceptance Criteria
- [ ] Implement robust `DataView`-based extraction for the Gen 3 roamer map group and map number within the save parsing logic.
- [ ] Provide tests that verify the extraction logic handles corrupted or truncated buffers gracefully via RangeError capture.
