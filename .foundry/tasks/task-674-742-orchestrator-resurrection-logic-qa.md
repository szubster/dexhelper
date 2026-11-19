---
id: task-674-742-orchestrator-resurrection-logic-qa
type: TASK
title: QA Orchestrator Resurrection Logic Updates
status: PENDING
owner_persona: qa
created_at: '2026-11-02'
updated_at: '2026-11-07'
depends_on:
  - task-674-740-update-rejection-count-logic-impl
  - task-674-741-update-max-rejection-threshold-impl
jules_session_id: null
pr_number: null
parent: story-581-674-orchestrator-resurrection-logic
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 80
---

# QA Orchestrator Resurrection Logic Updates

## Context
The Orchestrator's resurrection logic has been updated to handle system vs. domain failures differently. The `rejection_count` should not increment for system crashes (`NOT_FOUND`, `INTERNAL_ERROR`), and the `MAX_REJECTION_THRESHOLD` should only apply to domain/QA rejections.

## Objectives
- Review and verify the implementation of the `rejection_count` logic updates.
- Review and verify the implementation of the `MAX_REJECTION_THRESHOLD` updates.
- Ensure all required unit tests have been written and accurately cover the required logic paths.
- Run the Orchestrator test suite to verify no regressions were introduced.

## Acceptance Criteria
- [ ] Implementation of `rejection_count` logic updates for system failures is verified.
- [ ] Implementation of `MAX_REJECTION_THRESHOLD` evaluation logic updates is verified.
- [ ] Required unit tests are present and passing.
- [ ] Orchestrator test suite passes with no regressions.
