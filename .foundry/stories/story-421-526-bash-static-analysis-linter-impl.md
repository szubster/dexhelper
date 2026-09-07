---
id: story-421-526-bash-static-analysis-linter-impl
type: STORY
title: Implement Static Analysis Linter for Bash
status: READY
owner_persona: tech_lead
created_at: '2026-09-04T05:51:36Z'
updated_at: '2026-09-04T05:51:36Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-057-421-bash-static-analysis-linter-retry
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
Implement the core logic for the static analysis linter to analyze bash commands before execution and block infinite-blocking commands.

## Acceptance Criteria
- [ ] Break down this story into tasks.
