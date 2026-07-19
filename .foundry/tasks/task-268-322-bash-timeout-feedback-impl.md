---
id: task-268-322-bash-timeout-feedback-impl
type: TASK
title: Implement feedback mechanism for interrupted commands
status: COMPLETED
owner_persona: coder
created_at: '2026-07-15'
updated_at: '2026-07-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-127-268-bash-timeout-feedback
tags:
  - foundry
  - system-improvement
  - resilience
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement feedback mechanism for interrupted commands

## Overview
Implement a feedback mechanism for bash commands that were interrupted due to timeout, based on the findings from `research-267-296-bash-timeout-wrapper-alternatives` and the existing core policies.

## Constraints & Requirements
- Update the `.foundry/docs/knowledge_base/agents/core_policies.md` file to explicitly state that when the `timeout` command interrupts a process, it returns exit code 124.
- Guide agents to recognize this exit code as a timeout and to use non-blocking alternatives like `cat` or `tail -n`.
- Since this is a simple documentation/policy change with low risk, the Coder is designated to self-verify.

## Instructions for Coder
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Update `core_policies.md` with the exit code 124 feedback mechanism.
