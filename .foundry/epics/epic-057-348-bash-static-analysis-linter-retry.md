---
id: epic-057-348-bash-static-analysis-linter-retry
type: EPIC
title: Static Analysis Linter for Bash Sessions (Retry)
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-26'
updated_at: '2026-08-04'
depends_on:
  - epic-057-347-bash-timeout-wrapper-retry
jules_session_id: '2410652653667313449'
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
- [ ] Break down this epic into stories.
