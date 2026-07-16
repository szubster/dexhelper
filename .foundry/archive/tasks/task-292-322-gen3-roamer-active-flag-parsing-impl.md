---
id: task-292-322-gen3-roamer-active-flag-parsing-impl
type: TASK
title: Gen 3 Roamer Active Flag Parsing Implementation
status: COMPLETED
owner_persona: coder
created_at: '2024-05-24'
updated_at: '2026-07-16'
depends_on:
  - story-149-291-gen3-roamer-core-extraction
jules_session_id: null
pr_number: null
parent: story-149-292-gen3-roamer-active-flag-parsing
tags:
  - gen3
  - roamer
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer Active Flag Parsing Implementation

## Objective
Extract and expose the 'active' boolean from the roamer struct for Gen 3 save files.

## Context
As per the knowledge base on Gen 3 Roamer Offsets, the roamer struct contains an `active` boolean at offset `0x13` within the struct itself. This boolean dictates whether the roamer is currently active in the game world (not yet caught or defeated). The base offset for the roamer struct is different for each version (Emerald: `0x31DC`, Ruby/Sapphire: `0x3144`, FireRed/LeafGreen: `0x30D0`) but it is relative to the `SaveBlock1` base offset.

## Technical Requirements
- Within the Gen 3 save parsing logic, target the `active` boolean field which is located at offset `0x13` (byte 19) relative to the start of the `Roamer` struct.
- Map this byte to an `isActive` boolean in the final returned roamer object.
- **CRITICAL REMINDER**: When parsing the boolean, you MUST use the resolved section offset (e.g., `section1Offset`) to calculate relative memory offsets instead of hardcoded absolute offsets to properly support A/B bank flash memory.
- **CRITICAL REMINDER**: All memory offsets (like `0x13`) and lengths must be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.

## Acceptance Criteria
- [x] Ensure that byte `0x13` of the roamer struct is correctly parsed as a boolean.
- [x] Ensure the returned roamer state object includes the `isActive` boolean.
- [x] Coder: If you experience a transient failure requiring retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- [x] Coder: If you must abort or permanently fail a task (impossible or max rejections reached), update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- [x] Coder: If you submit an empty PR for a completed task, check off all Acceptance Criteria checkboxes before submitting.
