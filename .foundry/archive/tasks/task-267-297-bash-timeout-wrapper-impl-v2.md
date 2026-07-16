---
id: task-267-297-bash-timeout-wrapper-impl-v2
type: TASK
title: Implement timeout wrapper for bash sessions (v2)
status: COMPLETED
owner_persona: coder
created_at: '2026-07-09'
updated_at: '2026-07-13'
depends_on:
  - research-267-296-bash-timeout-wrapper-alternatives
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

# Implement timeout wrapper for bash sessions (v2)

## Overview
Implement the recommended alternative solution for a timeout wrapper for bash sessions, based on the findings from `research-267-296-bash-timeout-wrapper-alternatives`.

## Constraints & Requirements
- Follow the proposed solution from the research node to implement a mechanism that interrupts commands running over a specific threshold (e.g., 30 seconds).
- Since `run_in_bash_session` is a platform tool and cannot be modified, this implementation must be an alternative architectural solution that *can* be modified from within the repo.
- If a command runs beyond the threshold, it must be interrupted and return a helpful error message to the agent, suggesting non-blocking alternatives like `cat` or `tail -n`.

## Instructions for Coder
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Implement timeout wrapper alternative based on research findings.
