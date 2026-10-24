---
id: story-554-563-inventory-item-tracker
type: STORY
title: Wild Item Inventory Tracker
status: READY
owner_persona: tech_lead
created_at: '2026-08-15'
updated_at: '2026-10-24'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-521-554-hunting-progress-tracker
tags:
  - dexhelper
  - gen2
  - gen3
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Story: Wild Item Inventory Tracker

## Context
To help players track progress during a hunt, we need to scan the Bag inventory for newly acquired target items when a save file is uploaded.

## Requirements
- Parse the save state to read the Bag inventory (Gen 2 and Gen 3).
- Identify newly acquired target items compared to the previous save state.

## Acceptance Criteria
- [x] Break down this Story into Tasks.
- [ ] task-563-680-gen2-bag-inventory-parsing-impl
- [ ] task-563-681-gen2-bag-inventory-parsing-qa
- [ ] task-563-682-gen3-bag-inventory-parsing-impl
- [ ] task-563-683-gen3-bag-inventory-parsing-qa
- [ ] task-563-684-inventory-diffing-logic-impl
- [ ] task-563-685-inventory-diffing-logic-qa
