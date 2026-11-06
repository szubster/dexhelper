---
id: research-584-740-gen3-rtc-extraction-conflict
type: RESEARCH
title: Investigate Gen 3 RTC Extraction Conflict with ADR 025
status: READY
owner_persona: researcher
created_at: '2026-10-16T18:00:00.000Z'
updated_at: '2026-10-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-047-584-gen3-tv-swarm-data-extraction
tags:
  - research
  - gen3
  - rtc
  - architecture
research_references:
  - adr-078-025-rtc-strategy
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Research: Investigate Gen 3 RTC Extraction Conflict with ADR 025

## Overview
The epic `epic-047-584-gen3-tv-swarm-data-extraction` mandates parsing the Real-Time Clock (RTC) value from Gen 3 save files to map the current time against time-gated events. However, `ADR 025: RTC Strategy Architecture Decision` explicitly mandates an "RTC-Independent Fallback Strategy" utilizing system time and manual UI overrides, as RTC data formatting is highly fragmented depending on the emulator and absent in cartridge dumps.

This research task will investigate this conflict and propose a path forward for time-gating the Gen 3 TV and Swarm events.

## Acceptance Criteria
- [ ] Researcher: Investigate the conflict between the epic requirements and ADR 025.
- [ ] Researcher: Propose a design pattern to handle the time-dependent forecasting of Swarms and TV broadcasts without directly parsing the `.sav` RTC.
