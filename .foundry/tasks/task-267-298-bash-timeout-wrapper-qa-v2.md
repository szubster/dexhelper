---
id: task-267-298-bash-timeout-wrapper-qa-v2
type: TASK
title: QA timeout wrapper for bash sessions (v2)
status: ACTIVE
owner_persona: qa
created_at: '2026-07-09'
updated_at: '2026-07-13'
depends_on:
  - task-267-297-bash-timeout-wrapper-impl-v2
jules_session_id: '7665521453119244049'
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

# QA timeout wrapper for bash sessions (v2)

## Overview
Verify that the alternative timeout wrapper solution for bash sessions works correctly and interrupts commands that run over the specified threshold (e.g., 30 seconds).

## Instructions for QA
- Test the new solution with a deliberate long sleep command or a blocking command like `tail -f` and verify it interrupts after the threshold and returns the expected error message.
- Ensure the solution functions within the constraints identified in the research phase.
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Verify alternative timeout wrapper solution interrupts long commands.
