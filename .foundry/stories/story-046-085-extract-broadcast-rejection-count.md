---
id: story-046-085-extract-broadcast-rejection-count
type: STORY
title: Extract and Broadcast Rejection Count in DAG Data Parsing
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-05-23'
updated_at: '2026-05-23'
depends_on: []
jules_session_id: '2628118099232734747'
pr_number: null
parent: epic-034-046-dag-data-parsing-rejection-count
tags:
  - foundry
  - ui
  - dashboard
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Extract and Broadcast Rejection Count in DAG Data Parsing

## Objective
Update the existing DAG data parser to read and extract the `rejection_count` property from the YAML frontmatter of `.foundry` files. Update associated frontend models to include this data and ensure it's exposed through the React Context layer for the DAG Dashboard UI.

## Context
In order to display permanent failures on the DAG dashboard, we need to surface the `rejection_count` of each node in the UI.

## Requirements
1. Update parsing logic to capture `rejection_count`.
2. Update the `FoundryNode` TypeScript types.
3. Verify that the React context layer correctly exposes the property.

## Acceptance Criteria
- [x] Tech Lead: Create TASKs for updating parser and data models.
- [x] Tech Lead: Ensure DAG data model typing is consistent with ADR 017.

## Generated Tasks
- [ ] .foundry/tasks/task-085-142-impl-extract-rejection-count.md
- [ ] .foundry/tasks/task-085-143-qa-extract-rejection-count.md
