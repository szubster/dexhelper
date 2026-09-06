---
id: story-521-531-savedatareader-bitwise
type: STORY
title: SaveDataReader Bitwise Helpers Implementation
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-03'
updated_at: '2026-09-03'
depends_on:
  - story-521-530-savedatareader-core
jules_session_id: null
pr_number: null
parent: epic-158-521-core-dataview-wrapper
tags:
  - architecture
  - dataview
  - save-parser
  - abstraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: SaveDataReader Bitwise Helpers Implementation

## Description
This story extends the `SaveDataReader` core implementation to include high-level bitwise helpers. These methods (e.g., `readBits`, `readFlag`) will simplify binary flag extractions from the raw save data without requiring error-prone manual shifting and masking scattered throughout the parser logic.

## Acceptance Criteria
- [ ] Add `readBits` and `readFlag` helper methods to `SaveDataReader`.
- [ ] Ensure bitwise helpers correctly handle bounds checking and shifts.
- [ ] Break down this Story into Tasks for the Tech Lead to assign.