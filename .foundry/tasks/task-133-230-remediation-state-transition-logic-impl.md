---
id: task-133-230-remediation-state-transition-logic-impl
type: TASK
title: Remediation State Transition Logic Implementation
status: READY
owner_persona: coder
created_at: '2026-06-28'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-090-133-remediation-state-transition-logic
tags:
  - foundry
  - orchestrator
  - maintenance
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Remediation State Transition Logic Implementation

## 1. Context
Following the detection of "zombie" nodes (nodes incorrectly stuck in the `ACTIVE` state) by the engine developed in `epic-050-089-zombie-node-detection-engine`, the system must remediate them by transitioning their state to `FAILED`. This allows the existing Resurrection Loop to pick them up and retry them.

## 2. Requirements
- Write a utility function that safely updates the YAML frontmatter of a given node file.
- The function should read the file, parse it using `gray-matter` (as per ADR 006), change `status: ACTIVE` to `status: FAILED`, and write it back.
- Ensure the function preserves all other existing YAML frontmatter fields and the original markdown body.
- Write unit tests to verify the update logic successfully transitions the state and handles file write errors.
- **Reminder**: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`. If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## 3. Acceptance Criteria
- [ ] Implement utility function to update node frontmatter status to `FAILED`.
- [ ] Create unit tests to verify state transition logic.
