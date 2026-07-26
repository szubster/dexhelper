---
id: task-085-256-impl-extract-rejection-count-retry
type: TASK
title: Re-implement DAG Data Parsing for Rejection Count
status: COMPLETED
owner_persona: coder
created_at: '2026-07-04'
updated_at: '2026-07-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-046-085-extract-broadcast-rejection-count
tags:
  - foundry
  - ui
  - dashboard
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Re-implement DAG Data Parsing for Rejection Count

## Objective
Update the existing DAG data parser to read and extract the `rejection_count` property from the YAML frontmatter of `.foundry` files. Update associated frontend models to include this data and ensure it's exposed through the React Context layer (`DagContext.tsx`) for the DAG Dashboard UI.

## Context
This is a retry of the previously permanently failed `task-085-142`. In order to display permanent failures on the DAG dashboard, we need to surface the `rejection_count` of each node in the UI. We need to introduce a "Permanent Failures" view within the DAG Dashboard (ADR 017).

## Requirements
1. The parser already correctly extracts `rejection_count` and models are updated.
2. The core requirement is to verify that the React context layer (`DagContext.tsx`) correctly exposes the property to connected UI views. Ensure that the initial state in `DagContext.tsx` sets the `rejection_count` properly from the parsed nodes.

## Acceptance Criteria
- [x] Coder: Ensure React context layer correctly exposes the property.

## Reminders
- If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
