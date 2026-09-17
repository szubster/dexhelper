---
id: task-562-587-gen3-missed-items-parsing-logic
type: TASK
title: Gen 3 Missed Items Parsing Logic
status: READY
owner_persona: coder
created_at: '2026-09-17T02:01:00Z'
updated_at: '2026-09-17T02:01:00Z'
depends_on:
  - task-562-586-gen3-missed-items-types
jules_session_id: null
pr_number: null
parent: story-553-562-gen3-missed-items-parsing
tags:
  - dexhelper
  - gen3
research_references: []
locks: []
---

# Task: Gen 3 Missed Items Parsing Logic

## Description
Implement the core save file parsing logic to extract missed milestones and valuable items (such as the Master Ball, missed TMs, and major unrepeatable achievements) from a Gen 3 save file. This includes parsing bitwise blocks using the `DataView` API and handling potential `RangeError` exceptions per the schema guidelines.

## Acceptance Criteria
- [ ] Implement the extraction logic for Gen 3 missed items and milestones.
- [ ] Utilize relative offsets by passing the resolved section offset to support the A/B bank flash memory architecture.
- [ ] Explicitly map specific bit offsets for event flags.
- [ ] Catch `RangeError` for out-of-bounds reads and throw a new error with the message "The save file is corrupted or incomplete."
