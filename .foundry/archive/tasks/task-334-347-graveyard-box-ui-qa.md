---
id: task-334-347-graveyard-box-ui-qa
type: TASK
title: Graveyard Box UI QA
status: COMPLETED
owner_persona: qa
created_at: '2026-07-25'
updated_at: '2026-07-26'
depends_on:
  - task-334-346-graveyard-box-ui-impl
jules_session_id: null
pr_number: null
parent: story-131-334-graveyard-box-ui
tags:
  - feature
  - nuzlocke
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Graveyard Box UI QA

## Objective
Verify the Graveyard Box UI setting and its integration with the backend state.

## Contract / Acceptance Criteria
- [x] Verify the UI component for Graveyard Box selection exists and works.
- [x] Verify the UI setting is correctly connected to the backend state (`nuzlockeGraveyardBox` in the store).
- [x] Verify adherence to the tactical hardware/snooping design constraint.

## Instructions & Reminders for QA
- **Note:** This functionality appears to already exist. Verify it.
- **Transient Failures:** If you experience a transient failure requiring a retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Aborts:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
