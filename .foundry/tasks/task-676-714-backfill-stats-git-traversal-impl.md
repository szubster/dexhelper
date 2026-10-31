---
id: task-676-714-backfill-stats-git-traversal-impl
type: TASK
title: Implement Backfill Stats Git Traversal Logic
status: PENDING
owner_persona: coder
created_at: '2026-10-18'
updated_at: '2026-10-18'
depends_on:
  - task-676-712-backfill-stats-cli-args-parser
jules_session_id: null
pr_number: null
parent: story-418-676-historical-stats-git-parser
tags:
  - CLI
  - git
  - orchestrator
priority: 50
---

# Implement Backfill Stats Git Traversal Logic

## Context
Following the CLI scaffolding, we now need to implement the core Git traversal logic in `.github/scripts/foundry-backfill-stats.ts` to locate commits over time.

## Objectives
- Implement logic to traverse the `main` branch git history.
- Filter commits based on the parsed interval (e.g., daily snapshots).
- Implement functions to extract or read the `.foundry/` directory state at these specific commit SHAs using `git show` or `git archive` without necessarily checking out the entire repo tree.
- Write unit tests mocking git commands to verify traversal logic.

## Acceptance Criteria
- [ ] Git traversal correctly identifies commits matching the interval.
- [ ] `.foundry/` directory state can be read at specific SHAs.
- [ ] Unit tests cover the git interaction logic.
