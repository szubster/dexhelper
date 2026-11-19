---
id: task-674-741-update-max-rejection-threshold-impl
type: TASK
title: Update Max Rejection Threshold Logic
status: ACTIVE
owner_persona: coder
created_at: '2026-11-02'
updated_at: '2026-11-07'
depends_on:
  - story-581-673-orchestrator-termination-state-parsing
jules_session_id: '5909849240946018681'
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

# Update Max Rejection Threshold Logic

## Context
Following the parsing of termination states and the update to the `rejection_count` logic, we need to ensure that the `MAX_REJECTION_THRESHOLD` is evaluated correctly.

## Objectives
- Update the evaluation of `MAX_REJECTION_THRESHOLD` within the Orchestrator to ensure it only considers the standard domain `rejection_count` and appropriately triggers the Impossible Loop only for domain/QA rejections, ignoring system crashes.
- Write unit tests to assert that `MAX_REJECTION_THRESHOLD` correctly filters and triggers.

## Acceptance Criteria
- [x] `MAX_REJECTION_THRESHOLD` evaluation logic correctly applies only to domain/QA rejections.
- [x] Unit tests are written to verify `MAX_REJECTION_THRESHOLD` behavior in the context of different failure types.
