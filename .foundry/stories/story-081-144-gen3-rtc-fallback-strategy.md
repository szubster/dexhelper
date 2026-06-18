---
id: story-081-144-gen3-rtc-fallback-strategy
type: STORY
title: Implement Gen 3 System Time Fallback and Manual UI Overrides
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-18'
updated_at: '2026-06-18'
depends_on:
  - research-081-144-gen3-rtc-strategy
jules_session_id: null
pr_number: null
parent: epic-047-081-gen3-tv-swarm-data-extraction
tags:
  - feature
  - gen3
  - rtc
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Implement Gen 3 System Time Fallback and Manual UI Overrides

## Description
Based on ADR 025, extracting Real-Time Clock (RTC) values directly from Gen 3 `.sav` files is unreliable because they are emulator-dependent or missing in cartridge dumps. To replace the cancelled RTC extraction story (`story-081-122-gen3-rtc-extraction`), this story requires implementing an RTC-Independent Fallback Strategy.

This involves:
1.  **System Time Fallback:** Defaulting to the host device's current system time for Gen 3 time-based events.
2.  **Manual UI Overrides:** Providing UI controls to allow users to manually set or override the time state (e.g., simulating day/night or specific days for time-gated events).

## Acceptance Criteria
- [ ] Implement System Time Fallback for Gen 3 time-gated events.
- [ ] Implement Manual UI Overrides to allow users to force a specific time state.
- [ ] Ensure that save file parsing engines gracefully ignore trailing emulator bytes (e.g., VBA-M appending 44/48 bytes) without crashing, as required by ADR 025.
