---
id: epic-110-308-tm-hm-user-interface
type: EPIC
title: TM/HM Inventory Planner UI
status: PENDING
owner_persona: story_owner
created_at: "2026-08-04"
updated_at: "2026-08-04"
depends_on:
  - epic-110-307-tm-hm-compatibility-logic
jules_session_id: null
pr_number: null
parent: prd-105-110-tm-hm-inventory-planner
tags:
  - ui
  - presentation
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# TM/HM Inventory Planner UI

## Description
This epic covers the Presentation Layer requirements for the TM/HM Inventory Planner. It involves building out the user interface components to display the extracted and processed TM/HM data to the user.

The interface will feature an Inventory Dashboard, a Compatibility Matrix, a Strategic Overlay to highlight gaps, and an Acquisition Tracker for unowned TMs.

## Dependencies & Prerequisites
- Requires the Compatibility Engine to provide accurate filtering and mapping of Pokémon capabilities.

## Acceptance Criteria
- [ ] Build Inventory Dashboard to display owned TMs/HMs and quantities in a visual grid.
- [ ] Build Compatibility Matrix view showing all compatible owned Pokémon for a selected TM.
- [ ] Implement Strategic Overlay badges/indicators on Pokémon lacking a move of the TM's type.
- [ ] Build Acquisition Tracker displaying unowned, uncollected TMs and their in-game locations.
- [ ] A final STORY dedicated exclusively to Integration and E2E Verification must be generated for this EPIC.
