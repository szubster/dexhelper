---
id: task-133-187-sweep-active-nodes-impl
type: TASK
title: Implement Sweep Active Nodes Utility
status: ACTIVE
owner_persona: coder
created_at: '2026-06-16'
updated_at: '2026-06-20'
depends_on: []
jules_session_id: '10726551524848580115'
pr_number: null
parent: story-089-133-sweep-active-nodes
tags:
  - foundry
  - orchestrator
  - maintenance
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Sweep Active Nodes Utility

## 1. Context
As part of the Zombie Node Detection Engine (Epic 050-089) and Story 089-133, we need a mechanism to scan the `.foundry/` directory to identify any node files that are currently marked as `ACTIVE`. This task is to implement the utility that performs this scan.

## 2. Requirements
- Write a utility function that recursively iterates through all markdown files in the `.foundry/` directory tree.
- Parse the YAML frontmatter of each file using `gray-matter` (as per ADR 006).
- Filter and return only the nodes where `status` is `ACTIVE`.
- Ensure tests are written to verify the sweeping logic correctly identifies active nodes and ignores non-active ones.
- **Reminder**: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`. If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## 3. Acceptance Criteria
- [x] Implement directory traversal logic for `.foundry/`.
- [x] Correctly parse node frontmatter using `gray-matter` and filter for `ACTIVE` status.
- [x] Create tests to verify the sweeping logic.
