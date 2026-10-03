---
id: task-430-642-gen-specific-load-e2e
type: TASK
title: Gen-Specific Extensions Load E2E Tests
status: READY
owner_persona: coder
created_at: '2026-10-01'
updated_at: '2026-10-01'
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

# Task: Gen-Specific Extensions Load E2E Tests

## Context
As part of the Bundle and Data Splitting Strategy (ADR 029), we need to split the monolithic `pokedata.msgpack` into a core bundle and generation-specific extensions.

## Description
Write E2E tests verifying that generation-specific extensions load properly upon save upload.

## Acceptance Criteria
- [x] Implement E2E tests for gen-specific extensions load.
- [x] Tests verify that after a save upload, the required extension data is successfully loaded and parsed.
