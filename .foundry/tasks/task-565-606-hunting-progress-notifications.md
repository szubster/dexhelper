---
id: task-565-606-hunting-progress-notifications
type: TASK
title: Hunting Progress Notifications
status: PENDING
owner_persona: coder
created_at: '2026-08-15'
updated_at: '2026-09-21'
depends_on:
  - task-565-605-hunting-progress-detection-logic
jules_session_id: null
pr_number: null
parent: story-554-565-progress-tracker-state
tags:
  - dexhelper
  - react
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Hunting Progress Notifications

## Context
UI notifications must trigger on success.

## Requirements
- Create an event emitter or hook to listen for hunt success state changes.
- Trigger a success notification when a target is detected.
- Write component/hook tests for the notification trigger.

## Acceptance Criteria
- [ ] Implement the notification trigger.
- [ ] Write unit tests for the notification behavior.
