---
id: task-430-641-core-data-load-e2e
type: TASK
title: Core Data Load E2E Tests
status: COMPLETED
owner_persona: coder
created_at: '2026-10-01'
updated_at: '2026-10-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-400-430-data-splitting-integration-e2e
tags:
  - e2e
  - playwright
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Core Data Load E2E Tests

## Context
As part of the Bundle and Data Splitting Strategy (ADR 029), we need to split the monolithic `pokedata.msgpack` into a core bundle and generation-specific extensions.

## Description
Write E2E tests verifying that the core data bundle loads correctly on application startup.

## Acceptance Criteria
- [x] Implement E2E tests for core data loading.
- [x] Ensure tests verify successful parsing and data availability.
