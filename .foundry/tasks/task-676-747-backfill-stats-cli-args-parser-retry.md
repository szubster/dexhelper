---
id: task-676-747-backfill-stats-cli-args-parser-retry
type: TASK
title: Scaffold Backfill Stats CLI & Args Parser Retry
status: READY
owner_persona: coder
created_at: '2026-11-08'
updated_at: '2026-11-08'
depends_on:
  - research-676-749-investigate-backfill-stats-cli-args-failure
jules_session_id: null
pr_number: null
parent: story-418-676-historical-stats-git-parser
tags:
  - CLI
  - orchestrator
locks: []
rejection_reason: ""
priority: 50
---

# Scaffold Backfill Stats CLI & Args Parser Retry

## Context
As part of the Historical Statistics Backfilling Engine epic, we need a CLI script to traverse git history. The previous task failed QA because missing arguments were not handled correctly. This task focuses on scaffolding the CLI script and its argument parser, ensuring robust error handling for missing arguments.

## Objectives
- Create or update `.github/scripts/foundry-backfill-stats.ts`.
- Implement argument parsing using standard library (e.g., `util.parseArgs`) to accept intervals (e.g., `--daily`, `--commit <sha>`).
- Fix the logic to properly handle missing arguments. When executed without arguments, it must print the help output and exit, rather than proceeding with `{}`.
- Add basic CLI help and usage output.
- Write unit tests for the argument parsing logic, including tests for the missing arguments case.

## Acceptance Criteria
- [ ] Script is created/updated and executable.
- [ ] Argument parsing correctly identifies intervals.
- [ ] Missing arguments properly trigger the help message and exit.
- [ ] Unit tests pass and include coverage for missing arguments.
