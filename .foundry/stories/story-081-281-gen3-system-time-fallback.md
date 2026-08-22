---
id: story-081-281-gen3-system-time-fallback
type: STORY
title: Implement Gen 3 System Time Fallback
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-06'
updated_at: '2026-08-22'
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
# Story: Implement Gen 3 System Time Fallback

## Description
Based on ADR 025 and the findings from `research-081-144-gen3-rtc-strategy`, extracting Real-Time Clock (RTC) values directly from Gen 3 `.sav` files is unreliable. This story covers the implementation of the RTC-Independent Fallback Strategy by defaulting to the host device's current system time for time-based events in Gen 3.

## Acceptance Criteria
- [x] task-281-304-gen3-system-time-fallback-impl
- [x] task-281-305-gen3-system-time-fallback-qa
- [x] Implement System Time Fallback for Gen 3 time-gated events.
