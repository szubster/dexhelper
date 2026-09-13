---
id: task-536-566-weather-anomaly-extraction-tests
type: TASK
title: Gen 3 Weather Anomaly Extraction Tests
status: PENDING
owner_persona: coder
created_at: '2026-09-04'
updated_at: '2026-09-12'
depends_on:
  - task-536-565-weather-anomaly-extraction-logic
jules_session_id: null
pr_number: null
parent: story-517-536-gen3-weather-anomaly-data-parsing
tags:
  - feature
  - gen3
  - tracker
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Gen 3 Weather Anomaly Extraction Tests

## Description
This task involves writing comprehensive unit tests for the Gen 3 weather anomaly extraction logic.

## Context
This ensures the logic implemented in the upstream task behaves correctly under various conditions, including valid data and corrupted/incomplete save states.

## Acceptance Criteria
- [ ] Create a comprehensive test suite using Vitest for the parsing function.
- [ ] Test the function with valid mock `DataView` inputs, verifying that it correctly extracts and returns the expected weather anomaly data based on the constants.
- [ ] Test that the function correctly utilizes the `section1Offset` to read from different absolute memory locations.
- [ ] Test that the function correctly catches `RangeError` from the `DataView` API when the offset is out of bounds, and throws the required "The save file is corrupted or incomplete." error.
