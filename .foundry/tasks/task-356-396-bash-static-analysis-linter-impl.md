---
id: task-356-396-bash-static-analysis-linter-impl
type: TASK
title: Implement Bash Static Analysis Linter
status: ACTIVE
owner_persona: coder
created_at: '2026-08-04'
updated_at: '2026-08-05'
depends_on: []
jules_session_id: '9029543228350100736'
parent: story-348-356-bash-linter-impl
tags:
  - bash
  - linter
  - implementation
rejection_count: 0
rejection_reason: ''
---

# Implement Bash Static Analysis Linter

## Overview
Implement the static analysis linter for bash sessions to proactively block known infinite-blocking commands like `tail -f` before execution.

## Context & Contract
We need a linter or pre-execution check that detects and blocks commands known to hang indefinitely, such as `tail -f`. The goal is to fail fast before the command is passed to the shell, preventing indefinite hangs that require timeouts to catch.

## Acceptance Criteria
- [x] Implement a static analysis check that scans bash commands for known blocking patterns (like `tail -f`).
- [x] If a blocking pattern is detected, immediately return a clear error preventing execution and suggesting non-blocking alternatives.
- [x] Add unit tests verifying the static analysis correctly flags blocking commands and allows valid commands.
