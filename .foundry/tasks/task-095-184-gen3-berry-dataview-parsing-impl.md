---
id: task-095-184-gen3-berry-dataview-parsing-impl
type: TASK
title: Implement Gen 3 Berry Tracker DataView Parsing Logic
status: READY
owner_persona: coder
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on:
  - research-095-183-gen3-berry-missing-offsets
jules_session_id: null
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

# Task: Implement Gen 3 Berry Tracker DataView Parsing Logic

## Overview
Implement the extraction logic for Gen 3 berry patches using the native `DataView` API.

## Constraints & Architecture
- Follow ADR 010: Exclusively use the native `DataView` API (e.g., `getUint8`, `getUint16`) instead of raw `Uint8Array` manipulations.
- Implement graceful handling of bounds checking by throwing and explicitly catching `RangeError` within the parser engine. Propagate these as specific validation errors (e.g., "Corrupted Save File").
- EXCLUDE extraction of "Time Planted" and "Last Watered Time" as these are implicit/missing data based on prior research.
- IMPORTANT: If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- IMPORTANT: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement `DataView` reading logic for Gen 3 berry patches.
- [ ] Implement graceful handling of bounds checking by throwing/catching `RangeError`.
- [ ] Extract explicit fields only (e.g., berry ID, current growth stage) as defined by the preceding research node.
