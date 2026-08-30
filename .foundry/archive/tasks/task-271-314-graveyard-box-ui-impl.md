---
id: task-271-314-graveyard-box-ui-impl
type: TASK
title: Graveyard Box UI Implementation
status: COMPLETED
owner_persona: coder
created_at: '2026-07-12'
updated_at: '2026-07-12'
depends_on:
  - task-270-263-graveyard-box-logic-impl
jules_session_id: null
pr_number: null
parent: story-131-271-graveyard-box-ui
tags:
  - feature
  - nuzlocke
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Graveyard Box UI Implementation

## Objective
Implement a UI setting to allow users to designate a specific PC box as the Graveyard Box and connect it to the backend state.

## Contract / Acceptance Criteria
- [ ] Create a UI component (e.g., in Settings or Nuzlocke Tracker) to select the Graveyard Box (using a number or index).
- [ ] Connect this UI setting to the backend state implemented in `task-270-263-graveyard-box-logic-impl`.
- [ ] Ensure the UI adheres strictly to the ADR 008 "tactical hardware/snooping" aesthetic (`rounded-none`, `border-dashed`, `font-mono`).
- [ ] Self-verify the implementation. Ensure the selected box is correctly saved and triggers the graveyard logic.

## Instructions & Reminders for Coder
- **Intelligent Verification Protocol**: You are responsible for self-verifying this task. A separate QA task is not required for this simple UI/state connection task.
- **Transient Failures:** If you experience a transient failure requiring a retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Aborts:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- **Constants:** If any memory offsets or save file parsing are required (unlikely for this UI task), explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.
- **Aesthetic:** Ensure all UI components follow the tactical aesthetic guidelines (`rounded-none`, `border-dashed`, `font-mono`).
