---
id: task-521-528-statistics-e2e
type: TASK
title: Write E2E test for Real-Time Statistics Generation
status: READY
owner_persona: coder
created_at: '2026-09-03'
updated_at: '2026-09-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-417-521-statistics-e2e
tags:
  - e2e
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Write E2E test for Real-Time Statistics Generation

## Objective
Write an end-to-end test validating the full execution loop of the statistics generation module that aggregates real-time metrics for Orchestrator and Node state.

## Requirements
1. **Testing**: Write end-to-end tests validating the full execution loop of the statistics module `.github/scripts/utils/statistics.ts` and ensure it creates the `foundry-statistics.json` and `foundry-statistics.md` artifacts.
2. The `coder` will be responsible for verification, no QA task is required.

## Acceptance Criteria
- [ ] Implement E2E test for the Statistics Generator.
