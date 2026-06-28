---
id: research-081-144-gen3-rtc-strategy
type: RESEARCH
title: Research RTC Fallback Strategy for Gen 3
status: ACTIVE
owner_persona: researcher
created_at: '2026-06-18'
updated_at: '2026-06-27'
depends_on: []
jules_session_id: '4481148683720956029'
pr_number: null
parent: epic-047-081-gen3-tv-swarm-data-extraction
tags:
  - research
  - gen3
  - rtc
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: RTC Fallback Strategy for Gen 3

## Objective
Investigate the root cause of the `story-081-122-gen3-rtc-extraction` failure and document the implementation specifics of the RTC-Independent Fallback Strategy (System Time Fallback and Manual UI Overrides) outlined in ADR 025 to unblock the replacement implementation tasks.

## Findings

The attempt to extract Real-Time Clock (RTC) data from Generation 3 save files (`story-081-122-gen3-rtc-extraction`) failed permanently because RTC data in Gen 3 is emulator dependent and highly unreliable. As noted in the failure reason, attempting to directly map events based on this data is not feasible, and event mapping must be RTC-independent.

To unblock replacement implementation tasks, the system must follow the **RTC-Independent Fallback Strategy** defined in ADR 025:

1.  **System Time Fallback**: By default, time-dependent events (such as Gen 3 time-based encounters and events) will use the host device's current system time.
2.  **Manual UI Overrides**: We will implement manual toggles in the application UI that allow users to override the time state explicitly.
