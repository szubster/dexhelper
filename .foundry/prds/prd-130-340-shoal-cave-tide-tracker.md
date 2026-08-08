---
id: prd-130-340-shoal-cave-tide-tracker
type: PRD
title: Shoal Cave Tide & Item Tracker (Gen 3)
status: READY
owner_persona: epic_planner
created_at: '2026-08-07'
updated_at: '2026-08-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-130-shoal-cave-tide-tracker
tags:
  - feature
  - gen3
  - time-based
  - item-tracker
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Shoal Cave Tide & Item Tracker (Gen 3)

## Context
Shoal Cave in Pokémon Ruby, Sapphire, and Emerald features a tide mechanic dependent on the Real Time Clock (RTC). High tide occurs at 09:00-15:00 and 21:00-03:00, and low tide at 03:00-09:00 and 15:00-21:00. These tides dictate the availability of Shoal Shells (High Tide) and Shoal Salt (Low Tide), which are needed to craft the Shell Bell. This PRD details the technical requirements for extracting RTC values and parsing the inventory for these items to display a Shoal Cave Dashboard.

## Technical Requirements
1. **Save File Parsing (RTC & Daily Flags)**
   - Locate and extract the RTC value from the Gen 3 save structure.
   - Ensure parsing strictly follows Section 13 ("Save File Parsing & Extraction Guidelines") using relative offsets and module-level constants.
   - Potentially extract the daily flag for Shell Bell crafting.
2. **Inventory Parsing (Items)**
   - Parse the Items pocket of the Gen 3 save file to retrieve counts for Shoal Shells and Shoal Salt.
3. **UI Dashboard**
   - Design a dashboard component displaying:
     - Current in-game tide (High/Low) and a countdown to the next tide change.
     - Quantities of collected Shoal Shells and Shoal Salts.
     - A readiness indicator for crafting (4 Shells, 4 Salts).
   - The UI MUST follow the tactical hardware aesthetic constraints (`rounded-none`, `border-dashed`, monospaced telemetry fonts).

## Implementation Plan & Breakdown Strategy
The `epic_planner` should decompose this PRD into distinct, modular epics (and downstream stories) rather than a single monolithic execution:
- **Epic 1: Data Extraction Layer.** Extracting RTC and Shoal item counts from the save block.
- **Epic 2: UI Dashboard Implementation.** Building the React components adhering to the tactical hardware aesthetic, consuming the extraction layer data.

*Orchestrator Safeguard:* The `epic_planner` MUST ensure that an explicit acceptance criterion is added to drafted EPICs delegating the generation of the final E2E Integration Verification STORY to the `story_owner`.

## Acceptance Criteria
- [ ] Break down into EPIC(s) for Data Extraction.
- [ ] Break down into EPIC(s) for UI Dashboard.
