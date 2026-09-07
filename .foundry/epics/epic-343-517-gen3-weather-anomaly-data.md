---
id: epic-343-517-gen3-weather-anomaly-data
type: EPIC
title: Gen 3 Weather Anomaly Data Parsing
status: ACTIVE
owner_persona: story_owner
created_at: '2026-09-02'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: '4080139958935492345'
pr_number: null
parent: prd-147-343-gen3-weather-anomaly-tracker
tags:
  - feature
  - gen3
  - tracker
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Gen 3 Weather Anomaly Data Parsing

## Description
This epic focuses on expanding the Gen 3 save parsing engine to extract the active weather anomaly event flags and variables (`VAR_ABNORMAL_WEATHER_LOCATION`). This allows the application to accurately determine the active anomaly type (Drought or Drizzle) and the affected route without requiring the player to visit the Weather Institute.

## Acceptance Criteria
- [ ] Break down this Epic into Stories.
- [ ] Explicitly generate a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e`) alongside regular implementation stories to satisfy the orchestrator safeguard.
