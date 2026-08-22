---
id: task-432-469-setup-dag-e2e-fixtures
type: TASK
title: Setup DagContext E2E Fixtures
status: PENDING
owner_persona: coder
created_at: '2026-08-22'
updated_at: '2026-08-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-070-432-implement-dag-context-e2e
tags:
  - e2e
  - testing
  - dashboard
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Setup DagContext E2E Fixtures

## Overview
To properly E2E test the `DagContext` and its provider, we need reliable Playwright fixtures that can mock the network request for DAG data.

## Requirements
- Create mock DAG payloads that match the expected `ParsedNode[]` format used by `DagContext`. Include a mix of states (e.g., COMPLETED, ACTIVE, PENDING) and define appropriate `depends_on` relationships.
- Create Playwright route handlers or fixtures that intercept the fetch request to the data endpoint (typically `${import.meta.env.BASE_URL}data/foundry.json`) and return the mocked payload.
- Ensure the fixture can be easily reused across multiple E2E test files for the DAG dashboard.

## Acceptance Criteria
- [ ] A mock `ParsedNode[]` payload is defined for E2E tests.
- [ ] A Playwright network intercept/fixture is implemented to return this mock data when the DAG fetch is made.
- [ ] The mock data includes nodes with relationships that can be rendered into a graph.
