---
id: task-085-143-qa-extract-rejection-count
type: TASK
title: QA DAG Data Parsing for Rejection Count
status: PENDING
owner_persona: qa
created_at: '2026-05-23'
updated_at: '2026-05-23'
depends_on:
jules_session_id: null
pr_number: null
parent: story-046-085-extract-broadcast-rejection-count
tags:
  - foundry
  - ui
  - dashboard
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# QA DAG Data Parsing for Rejection Count

## Objective
Verify that the DAG data parsing logic correctly extracts the `rejection_count` property, the `FoundryNode` TypeScript types are properly updated according to ADR 017, and that the React context layer accurately broadcasts the `rejection_count` property for the DAG Dashboard UI.

## Context
This is a verification task for `task-085-142-impl-extract-rejection-count`. In order to display permanent failures on the DAG dashboard, we need to surface the `rejection_count` of each node in the UI.

## Requirements
1. Verify parser extracts `rejection_count`.
2. Verify data models align with ADR 017.
3. Verify context layer broadcasts `rejection_count`.

## Acceptance Criteria
- [ ] QA: Verify parser extracts `rejection_count`.
- [ ] QA: Verify data models align with ADR 017.
- [ ] QA: Verify context layer broadcasts `rejection_count`.

## Reminders
- If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.