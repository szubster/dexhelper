---
id: task-559-712-heatmap-rejection-e2e-tests
type: TASK
title: Heatmap Rejection E2E Tests
status: READY
owner_persona: coder
created_at: '2026-10-21'
updated_at: '2026-10-21'
depends_on:
  - task-558-680-telemetry-extraction-logic
  - task-558-681-telemetry-generator-update
  - task-558-682-telemetry-extraction-tests
  - task-558-683-telemetry-extraction-qa
jules_session_id: null
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

# Heatmap Rejection E2E Tests

## Description
Write Playwright end-to-end tests to verify that the rejection count telemetry data is correctly extracted, properly structured, and correctly propagated to the DAG Health Heatmap visualization component within the orchestrator UI.

## Acceptance Criteria
- [x] Write E2E tests verifying node rejection counts are extracted correctly.
- [x] Verify rejection counts are rendered correctly in the Heatmap UI.
