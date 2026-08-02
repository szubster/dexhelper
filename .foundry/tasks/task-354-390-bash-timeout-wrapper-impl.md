---
id: task-354-390-bash-timeout-wrapper-impl
type: TASK
title: Bash Timeout Wrapper Implementation (Retry)
status: ACTIVE
owner_persona: coder
created_at: '2026-08-02'
updated_at: '2026-08-02'
depends_on: []
jules_session_id: '14672935916813700627'
pr_number: null
parent: story-347-354-bash-timeout-wrapper-impl
tags:
  - foundry
  - resilience
research_references:
  - research-057-346-investigate-bash-timeout-failure
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Bash Timeout Wrapper Implementation (Retry)

## Objective
Implement a timeout wrapper for run_in_bash_session to interrupt commands that run over a specific threshold. Based on previous research, this is implemented as an instructional policy in core_policies.md.

## Instructions for Coder
The core implementation work was already completed in previous tasks (via instructional policy enforcement in core_policies.md). You must verify that the policy exists, check off the acceptance criteria, self-verify, and submit an Empty PR to complete this task.

## Acceptance Criteria
- [x] Verify that .foundry/docs/knowledge_base/agents/core_policies.md contains the bash timeout wrapper instructions.
