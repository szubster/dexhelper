---
id: task-284-314-active-callers-dashboard-ui-impl
type: TASK
title: Active Callers Dashboard UI Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-07-07'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: '15972532334912457743'
pr_number: null
parent: story-116-284-active-callers-dashboard-ui
tags:
  - ui
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Active Callers Dashboard UI Implementation

## Objective
Implement the UI for the Active Callers dashboard that displays all registered Pokegear NPCs, adhering to the tactical hardware/snooping aesthetic.

## Context
This task stems from `story-116-284-active-callers-dashboard-ui`. We need to build a dashboard view that lists the registered Pokegear NPCs.
The UI MUST adhere strictly to the tactical aesthetic defined in ADR 008: sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts (`font-mono`).

As this is a low-risk UI task, the `coder` is expected to self-verify their implementation (no separate QA task).

## Acceptance Criteria
- [ ] Build the Active Callers dashboard UI component.
- [ ] Render a list of registered Pokegear NPCs in the UI.
- [ ] Apply the tactical hardware/snooping aesthetic (sharp edges, dashed borders, monospace fonts) as per ADR 008.
- [ ] Self-verify the UI implementation and document the testing in your task journal.

## Developer Guidelines
- **Empty PR Rule**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- **Transient Failure**: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failure**: If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Memory Offsets**: When drafting save file parsing code, explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.
