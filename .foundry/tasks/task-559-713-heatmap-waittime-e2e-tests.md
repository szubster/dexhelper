---
id: task-559-713-heatmap-waittime-e2e-tests
type: TASK
title: Heatmap Wait Time E2E Tests
status: ACTIVE
owner_persona: coder
created_at: '2026-10-21'
updated_at: '2026-10-31'
depends_on:
  - task-558-680-telemetry-extraction-logic
  - task-558-681-telemetry-generator-update
  - task-558-682-telemetry-extraction-tests
  - task-558-683-telemetry-extraction-qa
jules_session_id: '7079993234030308719'
pr_number: null
parent: story-534-559-telemetry-data-extraction-e2e
tags:
  - e2e
  - playwright
  - heatmap
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Heatmap Wait Time E2E Tests

## Description
Write Playwright end-to-end tests to verify that wait time telemetry data (based on state transitions or time deltas) is accurately extracted, structured, and visually represented in the DAG Health Heatmap visualization.

## Acceptance Criteria
- [ ] Write E2E tests verifying node wait times are extracted accurately.
- [ ] Verify wait time telemetry is represented accurately in the Heatmap UI.
