---
id: story-417-520-statistics-generation
type: STORY
title: Real-Time Statistics Generation Implementation
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-03'
updated_at: '2026-09-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-146-417-real-time-statistics-generator
tags:
  - metrics
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Real-Time Statistics Generation Implementation

## Objective
Implement the statistics generation module that aggregates real-time metrics for Orchestrator and Node state. Integrate this module into the heart of the orchestrator to automatically track project health.

## Requirements
1. **Implementation**: Ensure the logic in `.github/scripts/utils/statistics.ts` properly scans `.foundry/` (including archives) and parses frontmatter to calculate node type and status counts.
2. **PR Metrics**: Implement PR metrics extraction via `gh pr list --state all --json`.
3. **Report Generation**: Output `foundry-statistics.json` and `foundry-statistics.md` cleanly at the project root.
4. **Integration**: Tie the script to `.github/scripts/foundry-orchestrator.ts` or the `foundry-heartbeat.yml` workflow.

## Acceptance Criteria
- [x] Break down this Story into Tasks for Implementation and PR Metrics.
- [ ] task-520-528-statistics-node-aggregation-impl
- [ ] task-520-529-statistics-pr-metrics-impl
- [ ] task-520-530-statistics-report-integration-impl
- [ ] task-520-531-statistics-generation-qa
