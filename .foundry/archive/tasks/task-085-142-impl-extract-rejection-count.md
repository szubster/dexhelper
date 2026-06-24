---
id: task-085-142-impl-extract-rejection-count
type: TASK
title: Implement DAG Data Parsing for Rejection Count
status: CANCELLED
owner_persona: coder
created_at: '2026-05-23'
updated_at: '2026-06-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-046-085-extract-broadcast-rejection-count
tags:
  - foundry
  - ui
  - dashboard
research_references: []
rejection_count: 4
rejection_reason: Max rejection count reached
notes: ''
---

# Implement DAG Data Parsing for Rejection Count

## Objective
Update the existing DAG data parser to read and extract the `rejection_count` property from the YAML frontmatter of `.foundry` files. Update associated frontend models to include this data and ensure it's exposed through the React Context layer for the DAG Dashboard UI.

## Context
In order to display permanent failures on the DAG dashboard, we need to surface the `rejection_count` of each node in the UI. We need to introduce a "Permanent Failures" view within the DAG Dashboard (ADR 017).

## Requirements
1. Update parsing logic to capture `rejection_count` from the `.foundry` markdown files YAML frontmatter.
2. Update the `FoundryNode` TypeScript types.
3. Verify that the React context layer correctly exposes the property to connected UI views.

## Acceptance Criteria
- [ ] Coder: Update parsing logic.
- [ ] Coder: Update `FoundryNode` TypeScript types.
- [ ] Coder: Ensure React context layer correctly exposes the property.

## Reminders
- If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
