---
id: task-522-653-gen2-bug-catching-contest-dvs-stats-qa
type: TASK
title: Gen 2 Bug-Catching Contest DVs and Stats extraction QA
status: ACTIVE
owner_persona: qa
created_at: '2026-10-03'
updated_at: '2026-10-08'
depends_on:
  - task-522-652-gen2-bug-catching-contest-dvs-stats-impl
confidence_score: 100
jules_session_id: '3658083974756933280'
pr_number: null
parent: story-512-522-gen2-bug-catching-contest-dvs
tags:
  - gen2
  - backend
  - save-extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Gen 2 Bug-Catching Contest DVs and Stats Extraction QA

## Description
Verify that the `BugCatchingContestData` interface and extraction logic correctly handle DVs, held item, and actual stats for the Gen 2 Bug-Catching Contest Pokémon.

## Acceptance Criteria
- [x] Verify that `BugCatchingContestData` includes the new properties: `dvs`, `heldItem`, and `stats`.
- [x] Verify that `extractBugCatchingContestData` correctly extracts DVs, held item, and stats from valid save fixtures.
- [x] Verify that tests cover the new properties correctly.
