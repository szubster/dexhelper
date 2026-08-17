---
id: task-428-438-extract-core-data-qa
type: TASK
title: Verify Core Data Extraction
status: PENDING
owner_persona: qa
created_at: $(date -I)
updated_at: '2026-08-17'
depends_on:
  - task-428-437-update-data-loading-logic
jules_session_id: null
pr_number: null
parent: story-400-428-extract-core-data
tags:
  - qa
  - testing
  - bundles
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Verify Core Data Extraction

## Context
As part of the Bundle and Data Splitting Strategy (ADR 029), we need to split the monolithic `pokedata.msgpack` into a core bundle and generation-specific extensions. The generation script and loading logic have been refactored.

## Description
This task is for the QA persona to verify that the core data extraction was implemented correctly. The QA agent needs to ensure that the application builds successfully, `pokedata-core.msgpack` is generated, and the application loads without errors, successfully populating the core IndexedDB stores. E2E tests should be written or updated to verify the core data loading behavior.

## Acceptance Criteria
- [ ] Application builds successfully and `pokedata-core.msgpack` is present in the output.
- [ ] Application loads without errors and core IndexedDB stores (pokemon, moves, items) are populated correctly.
- [ ] E2E tests pass and correctly verify the new data loading behavior.
