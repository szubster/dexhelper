---
id: task-122-171-gen3-rtc-extraction-impl
type: TASK
title: Implement Gen 3 RTC Data Extraction
status: PENDING
owner_persona: coder
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-081-122-gen3-rtc-extraction
tags:
  - feature
  - gen3
  - data-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Gen 3 RTC Data Extraction

## Context
As part of expanding support for Gen 3, we need to extract and parse the Real-Time Clock (RTC) value from Gen 3 save files to allow for time-gated event mapping. This task implements the data extraction and utility functions.

## Architectural Constraints & Requirements
- **ADR 010 (Data Parsing Strategy)**: You MUST exclusively use the native `DataView` API (e.g., `getUint8`, `getUint16`, `getUint32`) for all new Gen 3 save parsing logic. Do not use raw `Uint8Array` manipulations.
- **Graceful Failures**: Rely on `DataView` to throw `RangeError` on out-of-bounds reads and catch them to return specific validation errors.
- **Backwards Compatibility**: Do not alter existing Gen 1 and Gen 2 parsing handlers.

## Acceptance Criteria
- [ ] Implement `DataView`-based parser logic to extract the RTC value from the Gen 3 save format.
- [ ] Implement utility functions to format and interpret the extracted RTC data against current active events.
- [ ] Ensure backward compatibility with the existing parsing engine is maintained.
- [ ] If this task is aborted or permanently fails, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` and provide a clear `rejection_reason`.
- [ ] If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
