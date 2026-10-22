---
id: task-518-680-orchestrator-integration-e2e-fixtures
type: TASK
title: Orchestrator Integration E2E Fixtures
status: COMPLETED
owner_persona: coder
created_at: '2026-10-12'
updated_at: '2026-10-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-418-518-orchestrator-integration-e2e
tags:
  - foundry
  - orchestrator
  - integration
  - e2e
  - fixtures
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
experiment_variants: []
locks: []
---

# Orchestrator Integration E2E Fixtures

## Description
Create the necessary test fixtures representing valid base persona prompts, specific context layers, core system policies, and missing/invalid prompt fragments to be used in the orchestrator composite prompt generation E2E tests.

## Acceptance Criteria
- [x] Define fixture files or mocked file structures for a valid base persona prompt.
- [x] Define fixture files for specific context layers.
- [x] Define fixture files representing missing prompt fragments for testing fallback mechanisms.
- [x] Provide utility functions to load or mock these fixtures during testing.
