---
id: epic-047-081-gen3-tv-swarm-data-extraction
type: EPIC
title: Gen 3 TV Broadcast and Swarm Tracker Data Extraction
status: ACTIVE
owner_persona: story_owner
created_at: '2026-06-12'
updated_at: '2026-06-27'
depends_on: []
jules_session_id: '13327778897829272794'
pr_number: null
parent: prd-075-047-gen3-tv-swarm-tracker
tags:
  - feature
  - gen3
  - daily-events
  - data-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Gen 3 TV Broadcast and Swarm Tracker Data Extraction

## 1. Overview
This epic covers the backend logic to extract TV broadcast events and swarm tracking data from Gen 3 save files (Ruby, Sapphire, Emerald). Players rely on the dynamic TV broadcasts to find swarms, sales, and game corner events. The goal is to accurately parse these data structures and the RTC from the save files.

## 2. Requirements

### 2.1. Save File Parsing
- Implement logic to read the TV event blocks and related timers inside the save file.
- **Strict Constraint:** MUST use the native `DataView` API (e.g., `getUint8`, `getUint32`) for all parsing, strictly avoiding raw `Uint8Array` manipulations.
- Handle out-of-bounds reads gracefully as validation errors (e.g., "Corrupted Save File"), in adherence to ADR 010.

### 2.2. Extract RTC and Active Events
- Parse the Real-Time Clock (RTC) value to map current time against time-gated events.
- Identify active swarms: extract the specific Pokémon species, map location, and the days remaining.
- Extract the forecasting schedule for upcoming events (e.g., Energy Guru sales, Game Corner payouts).
- Extract data indicating if events were inherited from another player's save file via the "Mix Record" feature.

## 3. Acceptance Criteria
- [ ] Story Owner: Break down into Stories.

- [ ] story-081-121-gen3-tv-block-dataview-parser
- [x] story-081-122-gen3-rtc-extraction
- [ ] story-081-123-gen3-active-swarm-parsing
- [ ] story-081-124-gen3-event-forecast-schedule
- [ ] research-081-144-gen3-rtc-strategy
- [ ] story-081-144-gen3-rtc-fallback-strategy
