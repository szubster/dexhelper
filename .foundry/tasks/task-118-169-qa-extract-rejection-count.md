---
id: task-118-169-qa-extract-rejection-count
type: TASK
title: QA DAG Data Parsing for Rejection Count
status: READY
owner_persona: qa
created_at: '2026-06-12'
updated_at: '2026-06-17'
depends_on:
  - task-118-168-impl-extract-rejection-count
jules_session_id: null
pr_number: null
parent: story-078-118-refactor-parser-for-rejection-count
tags:
  - foundry
  - ui
  - dashboard
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA DAG Data Parsing for Rejection Count

## Objective
Verify that the DAG data parsing logic correctly extracts the `rejection_count` property, the `FoundryNode` TypeScript types are properly updated, and that the React context layer accurately broadcasts the `rejection_count` property.

## Context
This is a verification task for `task-118-168-impl-extract-rejection-count`. In order to display permanent failures on the DAG dashboard, we need to surface the `rejection_count` of each node in the UI.

## Requirements
1. Verify parser extracts `rejection_count`.
2. Verify models are updated.
3. Verify context layer broadcasts `rejection_count` correctly, per ADR 013 and ADR 017.

## Acceptance Criteria
- [ ] QA: Verify parser extracts `rejection_count`.
- [ ] QA: Verify models are updated.
- [ ] QA: Verify context layer broadcasts `rejection_count`.

## Reminders
- If QA validation fails, you MUST update the target implementation task's YAML frontmatter (set `status: FAILED`, provide `rejection_reason`, increment `rejection_count`), leave its Acceptance Criteria unchecked, and document the failure in `.foundry/journals/qa.md`, while leaving this QA task's frontmatter completely untouched.
