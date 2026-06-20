---
id: research-044-207-gen3-roamer-alternative-ui
type: RESEARCH
title: Alternative UI Representations for Gen 3 Roamer
status: PENDING
owner_persona: researcher
created_at: '2026-06-20'
updated_at: '2026-06-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-071-044-gen3-roamer-tracker
tags:
  - gen3
  - roamer
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Alternative UI Representations for Gen 3 Roamer

## Objective
Investigate and propose an alternative UI representation for the Gen 3 roaming legendary dashboard, given that explicit map coordinates cannot be extracted from the save file.

## Description
According to `adr-108-027-gen3-roamer-location-impossible`, the exact map route of a roaming Pokémon in Generation 3 games is stored dynamically in EWRAM and is never serialized into the `.sav` file. Because of this, the originally planned "Route Radar" feature is mathematically impossible to implement via static save parsing.

This research task will explore alternative ways to provide value to the user in the Roamer Dashboard. Since we cannot tell the user *where* the roamer is, we must focus on *what* the roamer is.

## Acceptance Criteria
- [ ] Review the data that *can* be extracted (Nature, IVs, HP, Status).
- [ ] Propose a UI layout that highlights this extractable data, especially the "IV Glitch" warning, without relying on a map component.
- [ ] Draft a revised technical specification for the new `epic-044-096-gen3-roamer-alternative-dashboard-ui` to replace the cancelled map features.
