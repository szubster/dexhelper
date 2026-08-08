---
id: epic-057-348-bash-static-analysis-linter-retry
type: EPIC
title: Static Analysis Linter for Bash Sessions (Retry)
status: VERIFYING
owner_persona: auditor
created_at: '2026-07-26'
updated_at: '2026-08-08'
depends_on:
  - epic-057-347-bash-timeout-wrapper-retry
jules_session_id: null
pr_number: null
parent: prd-095-057-prevent-blocking-bash-commands
tags:
  - foundry
  - system-improvement
  - resilience
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Static Analysis Linter for Bash Sessions (Retry)

## Overview
Implement a static analysis linter to proactively block known infinite-blocking commands like `tail -f` before execution.

## Acceptance Criteria
- [x] Break down this epic into stories.
- [x] story-348-356-bash-linter-impl
- [x] story-348-357-bash-linter-e2e
