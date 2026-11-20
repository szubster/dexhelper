---
id: task-715-741-gen2-forecasting-core
type: TASK
title: Implement Gen 2 Forecasting Core Logic
status: READY
owner_persona: coder
created_at: '2026-10-24'
updated_at: '2026-10-24'
depends_on:
  - task-715-740-gen2-forecasting-types
jules_session_id: null
pr_number: null
parent: story-063-715-gen2-forecasting-logic
tags:
  - gen2
  - logic
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Gen 2 Forecasting Core Logic

## Objective
Implement the core algorithm to determine when a Gen 2 event will occur next based on a provided current date and schedule constraints.

## Acceptance Criteria
- [ ] Create a utility module for event forecasting.
- [ ] Implement a function to calculate the next occurrence of an event.
- [ ] Handle constraints such as specific days of the week (e.g., Bug Catching Contest on Tue/Thu/Sat).
