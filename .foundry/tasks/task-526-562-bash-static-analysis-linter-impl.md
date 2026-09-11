---
id: task-526-562-bash-static-analysis-linter-impl
type: TASK
title: Implement Static Analysis Linter for Bash
status: PENDING
owner_persona: coder
created_at: '2026-09-08'
updated_at: '2026-09-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-421-526-bash-static-analysis-linter-impl
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

# Implement Static Analysis Linter for Bash

## Context
Agent sessions executing long-running or blocking bash commands (like \`tail -f\`) can hang indefinitely. This epic covers the retry of the static analysis linter to proactively block known infinite-blocking commands.

## Goal
Implement the core logic for the static analysis linter to analyze bash commands before execution and block infinite-blocking commands. The logic must be implemented in the bash wrapper \`scripts/safe_bash.sh\` and correctly block the command if \`tail -f\` is detected, providing a user-friendly error message. Note that the implementation might already be present, but this task is needed to properly complete the story and progress the DAG.

## Acceptance Criteria
- [ ] Implement the core logic for the bash static analysis linter to block infinite-blocking commands like \`tail -f\`.
- [ ] Self-verify the implementation and ensure the script correctly outputs a user-friendly error.