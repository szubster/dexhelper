---
id: story-113-267-gen3-ash-dataview-extraction
type: STORY
title: Extract Volcanic Ash Count via DataView
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-03'
updated_at: '2026-07-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-054-113-gen3-ash-save-parsing
tags:
  - gen3
  - ash
  - parsing
research_references:
  - .foundry/archive/research/research-054-243-gen3-ash-gathering-offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Extract Volcanic Ash Count via DataView

## Context
Based on research findings, the Volcanic Ash gather count is stored as game variable `0x4048`.
- It's a `u16` located at byte offset `0x90` within the `SaveBlock1` vars array.
- Emerald Absolute Offset: `0x142C`
- Ruby/Sapphire Absolute Offset: `0x13D0`

## Acceptance Criteria
- [x] Create tasks for the DataView extraction using the identified offsets.
- [x] task-267-261-gen3-ash-dataview-extraction-impl
- [x] task-267-262-gen3-ash-dataview-extraction-qa
- [x] research-267-297-gen3-ash-dataview-relative-offsets
- [x] task-267-320-gen3-ash-dataview-extraction-retry-impl
- [x] task-267-321-gen3-ash-dataview-extraction-retry-qa
