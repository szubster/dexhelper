---
id: task-430-643-data-splitting-e2e-qa
type: TASK
title: QA for Data Splitting E2E Tests
status: READY
owner_persona: qa
created_at: '2026-10-01'
updated_at: '2026-10-03'
depends_on:
  - task-430-641-core-data-load-e2e
  - task-430-642-gen-specific-load-e2e
jules_session_id: null
pr_number: null
parent: story-400-430-data-splitting-integration-e2e
tags:
  - qa
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: QA for Data Splitting E2E Tests

## Context
As part of the Bundle and Data Splitting Strategy (ADR 029), we need to split the monolithic `pokedata.msgpack` into a core bundle and generation-specific extensions.

## Description
Verify the E2E tests implemented for core data loading and gen-specific extension loading.

## Acceptance Criteria
- [ ] Verify core data load E2E tests pass reliably and correctly assert data loading.
- [ ] Verify gen-specific extension load E2E tests pass reliably and correctly assert extension loading on save upload.
