---
id: task-281-305-gen3-system-time-fallback-qa
type: TASK
title: QA Gen 3 System Time Fallback Logic
status: READY
owner_persona: qa
created_at: '2026-07-11'
updated_at: '2026-08-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-081-281-gen3-system-time-fallback
tags:
  - feature
  - gen3
  - rtc
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Gen 3 System Time Fallback Logic

## Context & Requirements
Based on ADR 025 and Story `story-081-281-gen3-system-time-fallback`, we are implementing an **RTC-Independent Fallback Strategy**.

The Coder (`task-281-304-gen3-system-time-fallback-impl`) has implemented a React Context for system time fallback and updated the save parsing engine to ignore trailing RTC bytes.

Your task is to verify this implementation.

## Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, update to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verify the React Context provides correct system time fallback.
- [ ] Verify the React Context exposes override methods correctly.
- [ ] Verify the save parser no longer throws size mismatch errors on `.sav` files with appended trailing RTC bytes (e.g. 44/48 bytes from VBA-M).
