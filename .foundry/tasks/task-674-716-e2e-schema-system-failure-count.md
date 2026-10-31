---
id: task-674-716-e2e-schema-system-failure-count
type: TASK
title: Write E2E Test for system_failure_count Schema
status: ACTIVE
owner_persona: coder
created_at: '2026-10-23'
updated_at: '2026-10-29'
depends_on: []
jules_session_id: '17493626432843241204'
pr_number: null
parent: story-582-674-yaml-schema-e2e-verification
tags:
  - typescript
  - playwright
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 80
confidence_score: 100
---

# Write E2E Test for system_failure_count Schema

## Context
As part of STORY `story-582-674-yaml-schema-e2e-verification`, we need to write an E2E test to verify that the DAG orchestrator correctly handles parsing and validating `.foundry` markdown files containing the new `system_failure_count` YAML property.

## Objectives
- Create a Playwright E2E test for the Orchestrator's schema validation targeting `system_failure_count`.
- Verify successful parsing when `system_failure_count` is valid (integer).
- Verify parsing failure when `system_failure_count` is invalid (e.g., string).

## Acceptance Criteria
- [x] E2E test file is created (e.g., `tests/e2e/schema_system_failure_count.spec.ts`).
- [x] Test covers valid `system_failure_count` parsing.
- [x] Test covers invalid `system_failure_count` parsing.
- [x] Tests pass when executing Playwright.
