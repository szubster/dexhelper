---
id: task-108-193-gen3-roamer-dataview-extraction-qa
type: TASK
title: QA Gen 3 Roamer DataView Extraction and Core Parsing
status: CANCELLED
owner_persona: qa
created_at: '2026-06-16'
updated_at: '2026-06-16'
depends_on:
  - task-108-192-gen3-roamer-dataview-extraction-impl
jules_session_id: null
pr_number: null
parent: story-070-108-gen3-roamer-dataview-extraction
tags:
  - gen3
  - roamer
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: 'Redundant task, implementation was already completed in task-108-161'
notes: ''
---

# QA Gen 3 Roamer DataView Extraction and Core Parsing

## Objective
Verify the correctness of the Gen 3 roamer data extraction and parsing logic implemented in task-108-192-gen3-roamer-dataview-extraction-impl.

## Description
Validate that the `DataView` API is used correctly and exclusively for reading the 20-byte structure. Verify the logic accurately parses IVs, HP, and Level from Gen 3 save files according to expected structures.

## Acceptance Criteria
- [ ] Verify `DataView` native API is used exclusively for reading the 20-byte structure.
- [ ] Verify the parsing logic accurately extracts IVs, HP, and Level.
- [ ] Write tests confirming accurate parsing for edge cases and known data structures.
- [ ] Verify that any out-of-bounds reads throw a `RangeError` which is caught and gracefully handled (e.g., throwing "The save file is corrupted or incomplete.").
- [ ] Verify that no inline magic numbers were used for memory offsets, lengths, bit locations, or shifts, ensuring they are defined as reusable constants at the module level.

## Execution Constraints
- **CRITICAL**: If you experience a transient failure requiring retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **CRITICAL**: If you must abort or permanently fail a task (impossible or max rejections reached), update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **CRITICAL**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.


### Auditor Rejection
This task is permanently cancelled and replaced by task-108-211-gen3-roamer-dataview-extraction-qa to include magic number rule.


### Auditor Rejection
This task is permanently cancelled as it is redundant. The extraction logic was already fully implemented and verified in task-108-161.
