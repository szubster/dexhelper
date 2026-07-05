---
id: task-153-255-orchestrator-max-rejection-cancellation-qa
type: TASK
title: QA Max Rejection Cancellation
status: READY
owner_persona: qa
created_at: '2026-07-01'
updated_at: '2026-07-05'
depends_on:
  - task-153-254-orchestrator-max-rejection-cancellation-impl
jules_session_id: null
pr_number: null
parent: story-096-153-max-rejection-cancellation
tags:
  - foundry
  - orchestrator
  - resilience
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Max Rejection Cancellation

## Reminders for QA
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Review `foundry-orchestrator.ts` to verify the cancellation logic for max rejection threshold is correctly implemented and works as expected.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md