---
id: research-044-207-gen3-roamer-ui-alternatives
type: RESEARCH
title: Gen 3 Roamer Alternative UI Research
status: ACTIVE
owner_persona: researcher
created_at: '2026-06-20'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: '7296602212498859565'
pr_number: null
parent: prd-071-044-gen3-roamer-tracker
tags:
  - gen3
  - roamer
  - ui
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer Alternative UI Research

## Objective
Investigate and define UI alternatives for the Gen 3 Roamer Dashboard now that precise map location extraction (the Route Radar) has been proven impossible (ADR 108-027).

## Context
The original UI design required a Route Radar map component. Since we cannot extract the exact map location from EWRAM, we need to design alternative visualizations that still provide value. Possible options include highlighting general region availability or focusing entirely on the detailed IV and Status breakdown.

## Acceptance Criteria
- [ ] Determine the most valuable way to display roamer state without a Route Radar.
- [ ] Update the UI specification for the new Dashboard component.
