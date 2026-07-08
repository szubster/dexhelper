---
id: task-267-262-bash-timeout-wrapper-impl
type: TASK
title: Implement timeout wrapper for bash sessions
status: ACTIVE
owner_persona: coder
created_at: '2026-07-04'
updated_at: '2026-07-08'
depends_on: []
jules_session_id: '14704755007060772781'
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

# Implement timeout wrapper for bash sessions

## Overview
Implement a timeout wrapper for `run_in_bash_session` to interrupt commands that run over a specific threshold (e.g., 30 seconds).

## Constraints & Requirements
- Update the system or linter responsible for executing `run_in_bash_session` to wrap its execution in a timeout mechanism.
- If a command runs beyond 30 seconds, it must be interrupted and return a helpful error message to the agent, suggesting non-blocking alternatives like `cat` or `tail -n`.

## Instructions for Coder
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement timeout wrapper.
