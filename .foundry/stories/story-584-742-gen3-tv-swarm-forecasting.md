---
id: story-584-742-gen3-tv-swarm-forecasting
type: STORY
title: Gen 3 TV Broadcast and Swarm Forecasting Logic
status: READY
owner_persona: tech_lead
created_at: '2026-10-16T18:00:00.000Z'
updated_at: '2026-10-31'
depends_on:
  - story-584-741-gen3-tv-swarm-parsing-core
jules_session_id: null
pr_number: null
parent: epic-047-584-gen3-tv-swarm-data-extraction
tags:
  - feature
  - gen3
  - forecasting
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Story: Gen 3 TV Broadcast and Swarm Forecasting Logic

## Overview
Based on the extracted TV broadcast and swarm data, and incorporating the findings from `research-584-740-gen3-rtc-extraction-conflict` regarding the RTC fallback strategy, this story implements the forecasting schedule for upcoming events.

## Requirements
- Implement the forecasting schedule logic for upcoming events (e.g., Energy Guru sales, Game Corner payouts, swarms).
- Integrate the RTC-Independent Fallback Strategy (system time/UI overrides) as mandated by ADR 025 to determine active vs. upcoming events, rather than relying on an internal save file RTC.

## Acceptance Criteria
- [ ] Tech Lead: Break down into Tasks for the Coder and QA.
