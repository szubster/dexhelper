---
id: story-078-118-refactor-parser-for-rejection-count
type: STORY
title: Refactor DAG Parser for Rejection Count
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-12'
updated_at: '2026-06-17'
depends_on: []
jules_session_id: '9612697177018592385'
pr_number: null
parent: epic-046-078-shared-dag-context-foundation
tags:
  - architecture
  - dashboard
  - state-management
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Refactor DAG Parser for Rejection Count

## Objective
Update the existing DAG data parser to read and extract the `rejection_count` property from the YAML frontmatter of `.foundry` files.

## Context
As required by ADR 017, we need to extract the `rejection_count` to display permanent failures on the DAG dashboard. The parser must capture this field alongside existing properties.

## Acceptance Criteria
- [x] Break down into Tasks

### Generated Tasks
- [x] task-118-168-impl-extract-rejection-count
- [x] task-118-169-qa-extract-rejection-count
