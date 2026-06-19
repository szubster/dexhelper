---
id: task-108-162-gen3-roamer-dataview-extraction-qa
type: TASK
title: QA Gen 3 Roamer DataView Extraction and Core Parsing
status: CANCELLED
owner_persona: qa
created_at: '2026-06-11'
updated_at: '2026-06-16'
depends_on:
  - task-108-161-gen3-roamer-dataview-extraction-impl
jules_session_id: null
pr_number: null
parent: story-070-108-gen3-roamer-dataview-extraction
tags:
  - gen3
  - roamer
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  task-108-161-gen3-roamer-dataview-extraction-impl
notes: ''
---

# QA Gen 3 Roamer DataView Extraction and Core Parsing

## Objective
Verify the implementation of Gen 3 roamer data extraction using `DataView` and the parsing of IVs, HP, and Level.

## Description
Verify that the implementation safely reads the 20-byte roamer structure exclusively using the `DataView` API according to ADR 010. Confirm that the parsing of IVs, HP, and Level from this raw byte structure is accurate. Ensure that any out-of-bounds reads throw a `RangeError` which is caught and gracefully handled (e.g., throwing "Corrupted Save File").

## Acceptance Criteria
- [ ] Confirm the 20-byte Gen 3 roamer structure is read exclusively using the `DataView` API.
- [ ] Confirm IVs, HP, and Level are correctly parsed.
- [ ] Confirm out-of-bounds reads result in a `RangeError` that is gracefully handled and propagated as a validation error.
- [ ] Confirm all tests and linting checks pass.

**Important Instructions:**
If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

### CANCELLED
This task has been cancelled due to the permanent failure of its dependency `task-108-161-gen3-roamer-dataview-extraction-impl`. It has been replaced by `task-108-193-gen3-roamer-dataview-extraction-qa` which will depend on the new implementation task.

### Auditor Rejection
This task is permanently cancelled and replaced by task-108-193-gen3-roamer-dataview-extraction-qa because the original dependency failed permanently.
