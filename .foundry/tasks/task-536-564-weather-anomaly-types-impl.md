---
id: task-536-564-weather-anomaly-types-impl
type: TASK
title: Gen 3 Weather Anomaly Extraction Types & Constants
status: READY
owner_persona: coder
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on: []
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
---

# Task: Gen 3 Weather Anomaly Extraction Types & Constants

## Description
This task involves defining the necessary TypeScript types, interfaces, and module-level constants (e.g., offsets, sizes, variable ID `0x4037`) required for extracting the active weather anomaly location (`VAR_ABNORMAL_WEATHER_LOCATION`) from a Gen 3 save file.

You MUST strictly follow Section 13 ("Save File Parsing & Extraction Guidelines") of `.foundry/docs/schema.md`. This means all memory offsets, lengths, and variable IDs must be defined as explicitly named reusable constants at the module level.

## Context
This is part of the larger effort to expand the Gen 3 save parsing engine to extract weather anomalies. This task establishes the foundation (types and constants) that the logic implementation will rely on.

## Acceptance Criteria
- [x] Define the TypeScript types and/or interfaces to represent the extracted weather anomaly data.
- [x] Define all necessary memory offsets, lengths, and the variable ID (`0x4037`) as explicit, reusable constants at the module level (e.g., in a `constants.ts` or `types.ts` file within a dedicated `weatherAnomaly` directory).
- [x] Ensure the implementation strictly follows the guidelines in Section 13 of `.foundry/docs/schema.md` (no inline magic numbers).
