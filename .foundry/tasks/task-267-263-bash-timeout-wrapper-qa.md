---
id: task-267-263-bash-timeout-wrapper-qa
type: TASK
title: QA timeout wrapper for bash sessions
status: COMPLETED
owner_persona: qa
created_at: '2026-07-04'
updated_at: '2026-07-13'
depends_on:
  - task-267-262-bash-timeout-wrapper-impl
jules_session_id: null
pr_number: null
parent: story-127-267-bash-timeout-wrapper
tags:
  - foundry
  - system-improvement
  - resilience
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA timeout wrapper for bash sessions

**STATUS:** CANCELLED. Replaced by `task-267-298-bash-timeout-wrapper-qa-v2` because the implementation strategy required architectural changes.

## Overview
Verify that the timeout wrapper for `run_in_bash_session` works correctly and interrupts commands that run over the specified threshold (e.g., 30 seconds).

## Instructions for QA
- Test the wrapper with a deliberate long sleep command or a blocking command like `tail -f` and verify it interrupts after the threshold and returns the expected error message.
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Verify timeout wrapper interrupts long commands.
