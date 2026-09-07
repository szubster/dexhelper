---
id: epic-057-421-bash-static-analysis-linter-retry
type: EPIC
title: Static Analysis Linter for Bash Sessions (Retry)
status: ACTIVE
owner_persona: story_owner
created_at: '2026-08-14'
updated_at: '2026-09-04'
depends_on:
  - epic-057-420-bash-timeout-wrapper-retry
jules_session_id: '17764514566538919768'
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
locks: []
---

# EPIC: Static Analysis Linter for Bash Sessions (Retry)

## Context
Agent sessions executing long-running or blocking bash commands (like `tail -f`) can hang indefinitely. This epic covers the retry of the static analysis linter to proactively block known infinite-blocking commands.

## Goal
Implement a static analysis linter that optionally analyzes commands before execution to proactively block known infinite-blocking commands like `tail -f`. Ensure a final STORY dedicated exclusively to Integration and E2E Verification is generated.

## Acceptance Criteria
- [ ] Break down this epic into stories.
