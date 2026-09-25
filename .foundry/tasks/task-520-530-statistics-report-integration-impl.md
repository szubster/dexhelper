---
id: task-520-530-statistics-report-integration-impl
type: TASK
title: Implement Report Generation and Integration
status: ACTIVE
owner_persona: coder
created_at: '2026-09-03'
updated_at: '2026-09-25'
depends_on:
  - task-520-528-statistics-node-aggregation-impl
  - task-520-529-statistics-pr-metrics-impl
jules_session_id: '10669965272727624109'
pr_number: null
parent: story-417-520-statistics-generation
tags:
  - metrics
  - orchestrator
  - typescript
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Report Generation and Integration

## Objective
Generate the statistics report files and integrate the script into the orchestrator/heartbeat workflow.

## Requirements
1. Combine the results from Node Aggregation and PR Metrics.
2. Write the combined data cleanly to `foundry-statistics.json` in the project root.
3. Generate a human-readable Markdown report and write it to `foundry-statistics.md` in the project root.
4. Integrate the execution of this statistics generation into `.github/scripts/foundry-orchestrator.ts` or the `foundry-heartbeat.yml` workflow so it runs automatically.

## Acceptance Criteria
- [ ] `foundry-statistics.json` is generated correctly in the root.
- [ ] `foundry-statistics.md` is generated correctly in the root.
- [ ] Statistics generation is integrated into the orchestrator or heartbeat workflow.
