---
id: task-421-441-parse-items-pocket-for-shoal-items-qa
type: TASK
title: Verify Gen 3 Items Pocket Parsing for Shoal Items
status: READY
owner_persona: qa
created_at: '2026-08-13'
updated_at: '2026-08-20'
depends_on:
  - task-421-440-parse-items-pocket-for-shoal-items-impl
jules_session_id: null
pr_number: null
parent: story-411-421-shoal-items-parsing
tags:
  - task
  - qa
  - gen3
  - item-tracker
  - data-extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Task: Verify Gen 3 Items Pocket Parsing for Shoal Items

## Context
The coder has implemented logic to extract Shoal Salt and Shoal Shells from the Gen 3 save file Items pocket. This QA task ensures the implementation is correct, matches the required offsets, and properly unmasks quantities using the security key.

## Acceptance Criteria
- [ ] Verify `parseGen3ShoalItems` correctly references the constants defined for offsets and sizes per game version.
- [ ] Verify unit tests have been added and pass, demonstrating that Shoal Salt and Shoal Shell quantities are correctly unmasked using `securityKey & LOWER_16_BIT_MASK`.
- [ ] Verify `SaveData` interface is updated accurately.
- [ ] Verify RangeError exceptions throw the exact text "The save file is corrupted or incomplete."
