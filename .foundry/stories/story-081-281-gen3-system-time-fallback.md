---
id: story-081-281-gen3-system-time-fallback
type: STORY
title: Implement Gen 3 System Time Fallback and Manual UI Overrides
status: READY
owner_persona: tech_lead
created_at: '2026-07-06'
updated_at: '2026-07-06'
depends_on: []
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
Based on ADR 025 and research node `research-081-144-gen3-rtc-strategy`, extracting Real-Time Clock (RTC) values directly from Gen 3 `.sav` files is unreliable because they are emulator-dependent or missing in cartridge dumps.

To replace the cancelled RTC extraction story (`story-081-122-gen3-rtc-extraction`) and its cancelled fallback story (`story-081-144-gen3-rtc-fallback-strategy`), this story implements the RTC-Independent Fallback Strategy.

This involves:
1.  **System Time Fallback:** Defaulting to the host device's current system time for Gen 3 time-based events.
2.  **Manual UI Overrides:** Providing UI controls to allow users to manually set or override the time state (e.g., simulating day/night or specific days for time-gated events).

## Acceptance Criteria
- [ ] Implement System Time Fallback for Gen 3 time-gated events.
- [ ] Implement Manual UI Overrides to allow users to force a specific time state.
