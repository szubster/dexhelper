---
id: task-536-565-weather-anomaly-extraction-logic
type: TASK
title: Gen 3 Weather Anomaly Extraction Logic
status: PENDING
owner_persona: coder
created_at: '2026-09-04'
updated_at: '2026-09-12'
depends_on:
  - task-536-564-weather-anomaly-types-impl
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

# Task: Gen 3 Weather Anomaly Extraction Logic

## Description
This task involves implementing the core parsing function to extract the active weather anomaly location (`VAR_ABNORMAL_WEATHER_LOCATION` at variable ID `0x4037`) from a Gen 3 save file.

You MUST strictly adhere to the guidelines defined in **Section 13 ("Save File Parsing & Extraction Guidelines")** of `.foundry/docs/schema.md`.

## Context
This builds upon the types and constants defined in the upstream task. The parsing function must safely extract the data from the `DataView` using the correct section offsets.

## Acceptance Criteria
- [ ] Implement a parsing function (e.g., `extractWeatherAnomaly`) that takes the save file `DataView` and the resolved `section1Offset` as arguments.
- [ ] The function must calculate the correct relative memory offset using the constants defined in the previous task.
- [ ] The function MUST catch `RangeError` for out-of-bounds reads and throw a new error with the message "The save file is corrupted or incomplete."
- [ ] The implementation must use the constants (no inline magic numbers) and return the structured data matching the defined TypeScript types.
