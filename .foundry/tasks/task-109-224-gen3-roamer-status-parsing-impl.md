---
id: task-109-224-gen3-roamer-status-parsing-impl
type: TASK
title: Implement Gen 3 Roamer Status Condition Parsing
status: READY
owner_persona: coder
created_at: '2026-06-27'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-070-109-gen3-roamer-status-parsing
tags:
  - gen3
  - roamer
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Roamer Status Condition Parsing

## Objective
Extract and parse the Status Condition from the 20-byte Gen 3 roamer data structure.

## Description
Building upon the base structure extracted in the previous story, implement the parsing logic necessary to identify and extract the Status Condition field from the Gen 3 roamer data. The Status Condition is an 8-bit unsigned integer at offset `0x0D` of the Roamer structure. Use the `DataView` API to extract this value. Ensure that the offset is defined as a reusable constant at the module level to avoid magic numbers. Note: This functionality might already be implemented, in which case you should verify it and submit an Empty PR.

## Acceptance Criteria
- [ ] Implement parsing logic for the Status Condition from the 20-byte roamer structure using the `DataView` API.
- [ ] Ensure all memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level (no inline magic numbers).
- [ ] If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- [ ] If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- [ ] If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
