---
id: epic-340-412-shoal-cave-ui-dashboard
type: EPIC
title: UI Dashboard Implementation (Shoal Cave Tracker)
status: PENDING
owner_persona: story_owner
created_at: '2026-08-11'
updated_at: '2026-08-11'
depends_on:
  - epic-340-411-shoal-cave-data-extraction
jules_session_id: null
pr_number: null
parent: prd-130-340-shoal-cave-tide-tracker
tags:
  - feature
  - gen3
  - time-based
  - item-tracker
  - ui-dashboard
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Epic: UI Dashboard Implementation (Shoal Cave Tracker)

## Description
This epic focuses on building the React components and UI dashboard to display the Shoal Cave tide information and item counts. It consumes the parsed RTC data and item counts from the Data Extraction Layer.

## Prerequisites & Constraints
- The UI MUST follow the tactical hardware aesthetic constraints (`rounded-none`, `border-dashed`, monospaced telemetry fonts) outlined in ADR 008.
- Consumes extracted data for RTC and item counts.

## Requirements
1. **Tide Display:**
   - Display the current in-game tide (High/Low) and a countdown to the next tide change.
2. **Item Count Display:**
   - Display quantities of collected Shoal Shells and Shoal Salts.
3. **Crafting Readiness:**
   - Provide a readiness indicator for crafting the Shell Bell (requires 4 Shoal Shells and 4 Shoal Salts).

## Acceptance Criteria
- [ ] Implement React components for Shoal Cave Dashboard adhering to ADR 008 constraints.
- [ ] Render current tide and countdown correctly.
- [ ] Render collected item counts for Shoal Shells and Shoal Salts.
- [ ] Add visual readiness indicator for Shell Bell crafting.
- [ ] E2E / Integration Verification STORY must be drafted to integrate extracted data with dashboard and test it end-to-end.
