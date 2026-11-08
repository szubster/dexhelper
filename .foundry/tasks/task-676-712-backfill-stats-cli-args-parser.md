---
id: task-676-712-backfill-stats-cli-args-parser
type: TASK
title: Scaffold Backfill Stats CLI & Args Parser
status: READY
owner_persona: coder
created_at: '2026-10-18'
updated_at: '2026-11-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-418-676-historical-stats-git-parser
tags:
  - CLI
  - orchestrator
locks: []
priority: 50
rejection_reason: ''
rejection_count: 2
confidence_score: 100
---

# Scaffold Backfill Stats CLI & Args Parser

## Context
As part of the Historical Statistics Backfilling Engine epic, we need a CLI script to traverse git history. This first task focuses on scaffolding the CLI script and its argument parser.

## Objectives
- Create `.github/scripts/foundry-backfill-stats.ts`.
- Implement argument parsing using standard library (e.g., `util.parseArgs`) to accept intervals (e.g., `--daily`, `--commit <sha>`).
- Add basic CLI help and usage output.
- Write unit tests for the argument parsing logic.

## Acceptance Criteria
- [x] Script is created and executable.
- [x] Argument parsing correctly identifies intervals.
- [x] Unit tests pass.

### Auditor Rejection
- The script does not handle missing arguments correctly. When executed without arguments, it just proceeds with `{}` instead of showing the help message. The tests also lack coverage for missing arguments as required by the QA acceptance criteria.
