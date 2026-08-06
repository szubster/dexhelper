---
id: epic-057-347-bash-timeout-wrapper-retry
type: EPIC
title: Timeout Wrapper for Bash Sessions (Retry)
status: COMPLETED
owner_persona: auditor
created_at: '2026-07-26'
updated_at: '2026-08-04'
depends_on:
  - research-057-346-investigate-bash-timeout-failure
jules_session_id: null
pr_number: null
parent: prd-095-057-prevent-blocking-bash-commands
tags:
  - foundry
  - system-improvement
  - resilience
research_references:
  - research-057-346-investigate-bash-timeout-failure
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Timeout Wrapper for Bash Sessions (Retry)

## Overview
Implement a timeout wrapper for `run_in_bash_session` to interrupt commands that run over a specific threshold (e.g., 30 seconds), based on findings from the research phase.

## Acceptance Criteria
- [x] Break down this epic into stories.
- [x] story-347-354-bash-timeout-wrapper-impl
- [x] story-347-355-bash-timeout-wrapper-e2e
