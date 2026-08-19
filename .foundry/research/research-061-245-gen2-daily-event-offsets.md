---
id: research-061-245-gen2-daily-event-offsets
type: RESEARCH
title: Investigate Gen 2 Daily and Weekly Event Offsets
status: ACTIVE
owner_persona: researcher
created_at: '2026-07-01'
updated_at: '2026-08-19'
depends_on: []
jules_session_id: '17033881935652633561'
pr_number: null
parent: epic-038-061-gen2-event-flag-parsing
tags:
  - gen2
  - backend
  - save-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Gen 2 Daily and Weekly Event Offsets

## Context
During the audit of `epic-038-061-gen2-event-flag-parsing`, it was discovered that while the general event flags block (`eventFlags`) is extracted, the specific daily and weekly time-gated events (such as Friday Lapras, Bug Catching Contest, Haircut Brothers, Daily Mystery Gift) have not been properly mapped or exposed to the frontend data layer.

## Goal
Find and document the exact event flag offsets (or bit indices) that track whether these daily and weekly events have been completed.

## Tasks
- [x] 1. Find the specific event flag for the Friday Lapras encounter.
- [x] 2. Find the event flags related to the Bug-Catching Contest (e.g. has participated today).
- [x] 3. Find the event flags for the Haircut Brothers in Goldenrod Underground.
- [x] 4. Investigate other daily/weekly events like the Weekly Siblings (Arthur, etc.) and Buena's Password.
