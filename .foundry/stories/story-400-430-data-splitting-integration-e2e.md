---
id: story-400-430-data-splitting-integration-e2e
type: STORY
title: Data Splitting Integration and E2E Verification
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-17'
updated_at: '2026-10-01'
depends_on:
  - story-400-429-gen-specific-extensions
jules_session_id: '4713318108099246213'
pr_number: null
parent: epic-337-400-data-splitting
tags:
  - performance
  - architecture
  - bundles
  - e2e
  - integration
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Story: Data Splitting Integration and E2E Verification

## Context
As part of the Bundle and Data Splitting Strategy (ADR 029), we need to split the monolithic `pokedata.msgpack` into a core bundle and generation-specific extensions.

## Description
This story covers the integration and end-to-end verification of the data splitting changes, ensuring that the application works correctly with the split data bundles.

## Acceptance Criteria
- [ ] task-430-641-core-data-load-e2e
- [ ] task-430-642-gen-specific-load-e2e
- [ ] task-430-643-data-splitting-e2e-qa

- [x] Task to write E2E tests verifying core data loads correctly
- [x] Task to write E2E tests verifying gen-specific extensions load upon save upload
