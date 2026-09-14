---
id: task-562-579-gen3-missed-items-parsing-logic-coder
type: TASK
title: Gen 3 Missed Items & Milestones Parsing Core Implementation
status: READY
owner_persona: coder
created_at: '2026-09-10'
updated_at: '2026-09-10'
depends_on:
  - task-562-578-gen3-missed-items-parsing-types-coder
jules_session_id: null
pr_number: null
parent: story-553-562-gen3-missed-items-parsing
tags:
  - dexhelper
  - gen3
research_references: []
locks: []
rejection_reason: ''
---

# Task: Gen 3 Missed Items & Milestones Parsing Core Implementation

## Description
Implement the core save file parsing logic to extract missed milestones and valuable items (such as the Master Ball, missed TMs, and major unrepeatable achievements) from a Gen 3 save file. Wait for exact offsets and specs via a late-bound RESEARCH node or further design ADRs if offsets are missing. Always check `RangeError` during DataView accesses per ADR 032.

## Acceptance Criteria
- [ ] Implement the core save extraction logic to find missed milestones/items.
- [ ] Ensure offsets use relative offsets and pass `sectionOffsets` correctly.
- [ ] Throw "The save file is corrupted or incomplete." on RangeErrors during extraction.
