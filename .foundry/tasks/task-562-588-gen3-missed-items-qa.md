---
id: task-562-588-gen3-missed-items-qa
type: TASK
title: QA: Gen 3 Missed Items Parsing
status: READY
owner_persona: qa
created_at: '2026-09-17T02:01:00Z'
updated_at: '2026-09-17T02:01:00Z'
depends_on:
  - task-562-587-gen3-missed-items-parsing-logic
jules_session_id: null
pr_number: null
parent: story-553-562-gen3-missed-items-parsing
tags:
  - dexhelper
  - gen3
research_references: []
locks: []
---

# Task: QA: Gen 3 Missed Items Parsing

## Description
Verify the parsed offsets, extraction methods, and state variables for Gen 3 missed milestones and valuable items.

## Acceptance Criteria
- [ ] Verify that module-level constants are used and no magic numbers are present in the parsing logic.
- [ ] Ensure that the extraction methods correctly utilize relative offsets (section offsets).
- [ ] Ensure that `RangeError` is handled properly.
