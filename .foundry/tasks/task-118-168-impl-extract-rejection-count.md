---
id: task-118-168-impl-extract-rejection-count
type: TASK
title: Implement DAG Data Parsing for Rejection Count
status: READY
owner_persona: coder
created_at: '2026-06-12'
updated_at: '2026-06-17'
depends_on: []
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

# Implement DAG Data Parsing for Rejection Count

## Objective
Update the existing DAG data parser to read and extract the `rejection_count` property from the YAML frontmatter of `.foundry` files. Update associated frontend models to include this data and ensure it's exposed through the shared React Context layer for the DAG Dashboard UI.

## Context
In order to display permanent failures on the DAG dashboard, we need to surface the `rejection_count` of each node in the UI. We need to introduce a "Permanent Failures" view within the DAG Dashboard (ADR 017). The UI relies on the shared React Context (ADR 013), so ensure the context is updated properly.

## Requirements
1.  Update parsing logic to capture `rejection_count` from the `.foundry` markdown files YAML frontmatter.
2.  Update the `FoundryNode` TypeScript types.
3.  Update the React Context layer to expose the `rejection_count` property to all connected UI views.

## Acceptance Criteria
- [ ] Coder: Update parsing logic.
- [ ] Coder: Update `FoundryNode` TypeScript types.
- [ ] Coder: Ensure React context layer correctly exposes the property.

## Reminders
- If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
