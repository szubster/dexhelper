---
id: task-573-607-heatmap-qa
type: TASK
title: QA Heatmap Logic
status: PENDING
owner_persona: qa
created_at: '2026-09-21T06:50:00Z'
updated_at: '2026-09-22'
depends_on:
  - task-573-606-heatmap-tests
jules_session_id: null
pr_number: null
parent: story-049-573-heatmap-data-processing-layer
tags:
  - qa
  - processing
  - heatmap
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: QA Heatmap Logic

## Context
The Coder has implemented the heatmap data processing logic. QA must verify the implementation against the requirements.

## Scope
Review the implemented types, aggregation logic, and unit tests.

## Acceptance Criteria
- [ ] Verify that the heatmap data structures are defined correctly.
- [ ] Verify the calculateHeatmap aggregation accurately maps areaIds to missing species counts.
- [ ] Verify that unit tests pass and cover edge cases.
- [ ] Run test suite (pnpm test) and confirm passing.

**Important Persona Instructions:**
- **QA**: If you abort or permanently fail this task, you MUST update the YAML frontmatter to status: FAILED or status: CANCELLED with a rejection_reason. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting. Do not modify the frontmatter otherwise.
