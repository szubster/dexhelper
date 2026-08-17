---
id: task-422-435-gen3-lottery-extraction-impl
type: TASK
title: Gen3 Lottery Data Extraction Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-08-17'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: '17087646146611549727'
pr_number: null
parent: story-133-422-gen3-lottery-data-extraction
tags:
  - feature
  - gen3
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen3 Lottery Data Extraction Implementation

## Goal
Implement the logic to extract the daily winning number from Gen 3 save data.

## Requirements
- Parse the daily winning number from the extracted save file data.
- Ensure logic uses the `DataView` API and catches `RangeError` per ADR 010.
- Reference offsets defined in `gen3_lottery_offsets.md`.

## Acceptance Criteria
- [ ] Implement Gen3 lottery data extraction logic.
- [ ] Ensure tests cover extraction logic and errors.
