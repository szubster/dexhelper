---
id: prd-075-047-gen3-tv-swarm-tracker
type: PRD
title: Gen 3 TV Broadcast and Swarm Tracker
status: PENDING
owner_persona: epic_planner
created_at: '2026-06-12'
updated_at: '2026-06-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-075-gen3-tv-swarm-tracker
tags:
  - feature
  - gen3
  - daily-events
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Product Requirements Document: Gen 3 TV Broadcast and Swarm Tracker

## 1. Overview
In Generation 3 (Ruby, Sapphire, Emerald), the game utilizes a dynamic TV broadcast system that schedules time-gated events such as mass outbreaks (swarms) of rare Pokémon (e.g., Surskit, Skitty), Energy Guru sales, and Game Corner payouts. The underlying save file tracks the days remaining and the specific seeds for these TV events. Players often miss swarms because they fail to check the TV in-game or don't know the exact schedule based on their save's RTC.
This feature will parse the TV event data structures and RTC from Gen 3 save files to create a dynamic "TV & Swarm Dashboard", tracking these hidden time-gated mechanics.

## 2. Requirements

### 2.1. Data Parsing
- Implement logic to parse TV event data structures and the Real-Time Clock (RTC) from Gen 3 save files.
- **Architectural Constraint (ADR 010):** All save parsing logic MUST exclusively use the native `DataView` API (e.g., `getUint8`, `getUint16`, `getUint32`) and handle out-of-bounds reads gracefully as validation errors (e.g., "Corrupted Save File").
- Support identifying active swarms, including the exact species and route.
- Extract forecasting schedule of upcoming TV events based on save file event timers.
- Identify and highlight swarms/events that were inherited from a friend's save file via the "Mix Record" feature.

### 2.2. User Interface (TV & Swarm Dashboard)
- Create a dedicated dashboard component to display the parsed TV and swarm data.
- **Active Swarm Radar:** Highlight currently active mass outbreaks on the world map, showing the species and location.
- **Broadcast Schedule:** Provide a forecasted timeline/schedule of upcoming TV events (e.g., "Energy Guru Sale in 2 days", "Skitty Swarm next Tuesday").
- **Mix Record Sync Insights:** Display information indicating if events were synced from other players.
- **Architectural Constraint (ADR 008):** The UI must strictly adhere to the 'tactical hardware/snooping' aesthetic. This includes sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts. Avoid generic visual patterns like soft shadows or rounded corners.

## 3. Acceptance Criteria
- [x] Epic Planner: Break this PRD down into granular EPICs, ensuring separate epics for Data Parsing and UI/Dashboard implementation.
- [ ] epic-047-081-gen3-tv-swarm-data-extraction
- [ ] epic-047-082-gen3-tv-swarm-dashboard-ui
