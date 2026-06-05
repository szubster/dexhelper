---
id: task-046-073-implement-branch-identification
type: TASK
title: Implement Branch Identification Logic
status: COMPLETED
owner_persona: coder
created_at: '2026-05-09'
updated_at: '2026-05-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-030-046-branch-identification
tags:
  - branch-cleanup
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Branch Identification Logic

## Context
We need to implement logic to safely identify branches associated with `FAILED` or `CANCELLED` task nodes. This logic will be later used to perform automated cleanups of old Git branches left behind by the "Resurrection Loop".

## Requirements
- Identify branches associated with `FAILED` or `CANCELLED` Foundry nodes.
- Implement safety checks to prevent deletion of `main`, active PR branches, or branches associated with `PENDING`, `READY`, `ACTIVE`, or `COMPLETED` nodes.
- Expose an interface (e.g. function or class) to retrieve the list of branches that are safe to delete.

## Acceptance Criteria
- [x] Logic exists to successfully identify branches corresponding to `FAILED` or `CANCELLED` Foundry nodes.
- [x] Safety checks prevent deletion of `main`, active PR branches, or branches associated with `PENDING`, `READY`, `ACTIVE`, or `COMPLETED` nodes.
