---
id: story-418-676-historical-stats-git-parser
type: STORY
title: Historical Stats Git Parser CLI
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-10-18'
updated_at: '2026-10-20'
depends_on: []
jules_session_id: '18160837357709487379'
pr_number: null
parent: epic-146-418-historical-statistics-backfilling
tags:
  - CLI
  - git
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Historical Stats Git Parser CLI

## Context
As part of the Historical Statistics Backfilling Engine epic, we need a CLI script that can traverse the git history of the `main` branch to locate specific commits over time based on an interval parameter (e.g. `--daily`).

## Objectives
- Create the base `.github/scripts/foundry-backfill-stats.ts` script.
- Implement input parameter parsing for intervals (e.g., `--daily`, or specific commit SHAs).
- Implement git history traversal logic to check out or read the `.foundry/` directory at specific points in time.

## Acceptance Criteria
- [ ] Break down this Story into modular Tasks for the Coder.
