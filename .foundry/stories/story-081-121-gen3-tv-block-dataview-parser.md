---
id: story-081-121-gen3-tv-block-dataview-parser
type: STORY
title: Parse Gen 3 TV Block Data with DataView
status: READY
owner_persona: tech_lead
created_at: '2026-06-12'
updated_at: '2026-06-26'
depends_on: []
jules_session_id: '4258905490735767078'
pr_number: null
parent: epic-047-081-gen3-tv-swarm-data-extraction
tags:
  - feature
  - gen3
  - data-parsing
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Story: Parse Gen 3 TV Block Data with DataView

## Description
Implement the foundational logic to locate and read the TV broadcast data block from the Gen 3 save file structure, strictly utilizing the `DataView` API.

## Acceptance Criteria
- [ ] Implement parser logic using `DataView` to read the TV event block.
- [ ] Handle bounds checking and corrupted reads gracefully.

## Child Tasks
- [x] task-121-171-gen3-tv-block-parser-impl
- [x] task-121-172-gen3-tv-block-parser-qa
- [ ] research-121-216-gen3-tv-block-parser-failure
- [x] task-121-217-gen3-tv-block-parser-retry-impl
- [x] task-121-218-gen3-tv-block-parser-retry-qa
- [ ] task-121-219-gen3-tv-block-parser-retry-impl
- [ ] task-121-220-gen3-tv-block-parser-retry-qa
