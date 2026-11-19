---
id: research-130-743-shoal-cave-rtc-strategy
type: RESEARCH
title: "Shoal Cave Tide Tracker vs RTC-Independent Fallback Strategy"
status: READY
owner_persona: researcher
created_at: "2026-11-06"
updated_at: "2026-11-06"
depends_on:
  - idea-078-settle-rtc-strategy
jules_session_id: null
pr_number: null
parent: idea-130-shoal-cave-tide-tracker
tags:
  - research
  - gen3
  - time-based
  - rtc
research_references: []
rejection_count: 0
rejection_reason: ""
notes: "Investigate overlap between idea-130 and ADR 025."
---

# Research: Shoal Cave Tide Tracker vs RTC-Independent Fallback Strategy

## Context
`idea-130-shoal-cave-tide-tracker` proposes extracting RTC data directly from Gen 3 save files to power a tide predictor for Shoal Cave. However, `idea-078-settle-rtc-strategy` and the resulting ADR 025 mandate an RTC-Independent Fallback Strategy, explicitly prohibiting reliance on extracting RTC state from `.sav` files due to emulator inconsistencies.

## Objective
Investigate how to implement the Shoal Cave Tide Tracker feature using the RTC-Independent Fallback Strategy instead of extracting the RTC from the save file.

## Acceptance Criteria
- [ ] Document findings on implementing Shoal Cave tide tracking via system time fallback.
- [ ] Outline necessary UI adjustments for manual time overrides as specified by ADR 025.
