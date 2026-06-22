---
id: task-133-188-sweep-active-nodes-qa
type: TASK
title: Verify Sweep Active Nodes Utility
status: ACTIVE
owner_persona: qa
created_at: '2026-06-16'
updated_at: '2026-06-21'
depends_on:
  - task-133-187-sweep-active-nodes-impl
jules_session_id: '16030383422897987893'
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

# Task: Verify Sweep Active Nodes Utility

## 1. Context
The implementation task (task-133-187-sweep-active-nodes-impl) has built the utility to scan the `.foundry/` directory and find `ACTIVE` nodes. This QA task is to verify that the implementation works correctly according to the requirements.

## 2. Requirements
- Verify that the utility function recursively iterates through all markdown files in the `.foundry/` directory tree.
- Verify that the YAML frontmatter is parsed using `gray-matter` (as per ADR 006).
- Verify that the utility correctly filters and returns only the nodes where `status` is `ACTIVE`.
- Ensure that the tests cover both active and non-active nodes and verify the sweeping logic correctly identifies them.
- **Reminder**: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`. If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## 3. Acceptance Criteria
- [x] Implementations correctly traverses `.foundry/`.
- [x] Parsing correctly uses `gray-matter` and filters for `ACTIVE`.
- [x] Tests successfully verify the functionality.
