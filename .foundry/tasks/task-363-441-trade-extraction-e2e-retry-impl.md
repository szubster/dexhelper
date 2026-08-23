---
id: task-363-441-trade-extraction-e2e-retry-impl
type: TASK
title: NPC Trade Extraction Integration & E2E Implementation (Retry)
status: READY
owner_persona: coder
created_at: '2026-08-20'
updated_at: '2026-08-23'
depends_on:
  - research-363-440-investigate-trade-extraction-e2e-failure
jules_session_id: null
pr_number: null
parent: story-349-363-trade-extraction-e2e
tags:
  - feature
  - backend
  - save-parsing
  - e2e
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Task: NPC Trade Extraction Integration & E2E Implementation (Retry)

## Objective
Implement end-to-end (E2E) tests for the NPC trade flag extraction logic across Gen 2 and Gen 3 save files, incorporating the findings from the preceding research node.

## Context
A previous attempt (`task-363-415-trade-extraction-e2e-impl`) failed permanently. A research task (`research-363-440-investigate-trade-extraction-e2e-failure`) was spawned to investigate the root cause. This task must implement the E2E tests ensuring all required fixtures and setup logic identified in the research are correctly utilized.

## Acceptance Criteria
- [ ] Read the findings of `research-363-440-investigate-trade-extraction-e2e-failure`.
- [ ] Write E2E test files for Gen 2 NPC trade flag extraction.
- [ ] Write E2E test files for Gen 3 NPC trade flag extraction.
- [ ] Ensure tests verify end-to-end extraction (from save file parsing to resulting flags in `SaveData`).
