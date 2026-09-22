---
id: task-537-612-weather-anomaly-state-integration
type: TASK
title: Gen 3 Weather Anomaly State Integration Implementation
status: READY
owner_persona: coder
created_at: '2026-09-04'
updated_at: '2026-09-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-517-537-gen3-weather-anomaly-data-e2e
tags:
  - feature
  - gen3
  - tracker
  - e2e
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Gen 3 Weather Anomaly State Integration Implementation

## Description
Integrate the `extractWeatherAnomaly` function into `parseGen3` within `src/engine/saveParser/parsers/gen3.ts` and update `Gen3SaveData` in `src/engine/saveParser/parsers/common.ts` to include `gen3WeatherAnomaly?: import('../gen3/weatherAnomaly/types').Gen3WeatherAnomaly;`.

## Acceptance Criteria
- [ ] `Gen3SaveData` contains `gen3WeatherAnomaly` field.
- [ ] `parseGen3` integrates `extractWeatherAnomaly` successfully.
- [ ] Implementation is covered by tests.
