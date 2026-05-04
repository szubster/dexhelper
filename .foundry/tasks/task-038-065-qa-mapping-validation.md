---
id: task-038-065-qa-mapping-validation
type: TASK
title: "QA: Mapping Validation"
status: PENDING
owner_persona: "qa"
created_at: "2026-05-04"
updated_at: "2026-05-04"
depends_on:
  - .foundry/tasks/task-038-064-implement-mapping-validation.md
jules_session_id: null
pr_number: null
parent: .foundry/stories/story-025-038-implement-mapping-validation.md
tags:
  - qa
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# QA: Mapping Validation in DAG Orchestrator

## Requirements
- Verify the implementation of `task-038-064-implement-mapping-validation` meets its requirements.
- Ensure the orchestrator properly blocks and validates `type` and `owner_persona` mapping before dispatch.

## Acceptance Criteria
- [ ] Verified mapping logic in `.github/scripts/foundry-orchestrator.ts`.
- [ ] Verified tests pass and thoroughly check cases.
