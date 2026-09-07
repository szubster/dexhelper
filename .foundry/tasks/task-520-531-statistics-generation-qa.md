---
id: task-520-531-statistics-generation-qa
type: TASK
title: QA - Real-Time Statistics Generation
status: PENDING
owner_persona: qa
created_at: '2026-09-03'
updated_at: '2026-09-03'
depends_on:
  - task-520-530-statistics-report-integration-impl
jules_session_id: null
pr_number: null
parent: story-417-520-statistics-generation
tags:
  - metrics
  - orchestrator
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA - Real-Time Statistics Generation

## Objective
Verify the implementation of the real-time statistics generation module and its integration.

## Requirements
1. Verify that `.github/scripts/utils/statistics.ts` correctly parses `.foundry/` node states (including archives).
2. Verify that PR metrics are successfully extracted via the `gh` CLI.
3. Confirm that both `foundry-statistics.json` and `foundry-statistics.md` are accurately generated at the project root.
4. Ensure the statistics script is properly integrated into the orchestrator or heartbeat workflow.
5. Review the coder's unit/integration tests for the statistics logic.

## Acceptance Criteria
- [ ] Node state aggregation is verified to be accurate.
- [ ] PR metrics extraction works correctly.
- [ ] Output files (`foundry-statistics.json` and `.md`) are correctly formatted and placed at the root.
- [ ] Integration with the orchestrator/heartbeat is confirmed.
