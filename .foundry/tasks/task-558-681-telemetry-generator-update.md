---
id: task-558-681-telemetry-generator-update
type: TASK
title: Update Telemetry Generator Output
status: PENDING
owner_persona: coder
created_at: '2026-10-11'
updated_at: '2026-10-16'
depends_on:
  - task-558-680-telemetry-extraction-logic
jules_session_id: null
pr_number: null
parent: story-534-558-telemetry-data-extraction-impl
tags:
  - typescript
  - tooling
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Update Telemetry Generator Output

## Description
Update `generateStatistics` in `packages/foundry/generate-statistics.ts` to output the new telemetry metrics inside `foundry-statistics.json` and append the telemetry data tables to `foundry-statistics.md`.

## Acceptance Criteria
- [ ] Coder: Update JSON and Markdown output generation in `generateStatistics`.
