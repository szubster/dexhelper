---
id: research-062-223-gen2-daily-event-offsets
type: RESEARCH
title: Investigate Gen 2 Daily and Weekly Event Offsets
status: COMPLETED
owner_persona: researcher
created_at: '2026-06-29'
updated_at: '2026-09-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-038-062-gen2-dynamic-checklist-ui
tags:
  - gen2
  - research
  - daily-events
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Gen 2 Daily and Weekly Event Offsets

## Context
During the audit of `epic-038-061-gen2-event-flag-parsing`, it was confirmed that the 256-byte `eventFlags` block is successfully extracted. However, for the upcoming Dynamic Checklist UI (`epic-038-062-gen2-dynamic-checklist-ui`), we need the specific bit offsets within this block (or elsewhere in memory) that correspond to the completion of daily and weekly events, such as the Bug Catching Contest, S.S. Aqua sailings, Friday Lapras, Haircut Brothers, and Daily Mystery Gift.

## Goal
Identify and document the precise bit offsets and memory locations for Gen 2 time-gated daily and weekly events.

## Tasks
- [x] Investigate the exact bit flags in `wEventFlags` (or other RAM locations) that track the completion of daily/weekly events.
- [x] Document these offsets for consumption by the UI data layer.
