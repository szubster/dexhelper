---
id: task-536-567-weather-anomaly-extraction-qa
type: TASK
title: Gen 3 Weather Anomaly Extraction QA
status: COMPLETED
owner_persona: qa
created_at: '2026-09-04'
updated_at: '2026-09-20'
depends_on:
  - task-536-566-weather-anomaly-extraction-tests
jules_session_id: null
pr_number: null
parent: story-517-536-gen3-weather-anomaly-data-parsing
tags:
  - qa
  - gen3
  - tracker
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Gen 3 Weather Anomaly Extraction QA

## Description
Perform QA and verification for the Gen 3 weather anomaly extraction implementation (types, logic, and tests).

## Context
This task ensures that the implementation adheres to the project's strict architectural guidelines for save file parsing.

## Acceptance Criteria
- [x] Verify that all types and constants are explicitly defined and no inline magic numbers are used (Section 13 of `.foundry/docs/schema.md`).
- [x] Verify that the extraction logic correctly calculates the relative memory offset using the resolved section offset (`section1Offset`).
- [x] Verify that the extraction logic explicitly catches `RangeError` and throws the required error message.
- [x] Verify that the Vitest test suite comprehensively covers valid extraction, offset variations, and out-of-bounds error handling.
- [x] Ensure all unit tests pass without errors.
