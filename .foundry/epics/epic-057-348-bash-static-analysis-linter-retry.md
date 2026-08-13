---
id: epic-057-348-bash-static-analysis-linter-retry
type: EPIC
title: Bash Static Analysis Linter
status: READY
owner_persona: story_owner
created_at: '2026-08-13'
updated_at: '2026-08-13'
depends_on:
  - research-057-346-investigate-bash-timeout-failure
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

# Bash Static Analysis Linter

## Overview
This epic covers the creation of a static analysis linter to proactively identify and block known infinite-blocking bash commands (like `tail -f`) before they are even executed.

## Requirements
- The linter must parse bash commands (or use robust regex/string matching) to detect dangerous patterns.
- It must reject commands with a clear error message suggesting safe alternatives (e.g., "Use `tail -n` instead of `tail -f`").
- The linter should be configurable and easily extensible with new patterns.

## Acceptance Criteria
- [ ] story-057-350-implement-bash-static-linter
- [ ] story-057-351-linter-e2e-verification