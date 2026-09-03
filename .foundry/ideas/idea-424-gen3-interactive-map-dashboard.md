---
id: idea-424-gen3-interactive-map-dashboard
type: IDEA
title: Gen 3 Interactive Map Dashboard
status: READY
owner_persona: product_manager
created_at: '2025-01-24'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - dexhelper
  - feature
  - gen3
  - map
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Gen 3 Interactive Map Dashboard

## Context & Vision
DexHelper currently tracks various geospatial data points for Gen 3 (Ruby, Sapphire, Emerald) such as the player's current location, the location of the roaming legendary (Latias/Latios), active berry patches, and active swarms/outbreaks. However, this information is scattered across different dashboard components as text or static route names.

To enhance the "premium companion app" experience, we should consolidate this geospatial data into a single, unified "Interactive Map" view.

## Proposal
Implement an Interactive Map Dashboard for Gen 3.
- **Base Layer:** Render the Hoenn region map (using a high-quality game asset).
- **Data Overlays:**
  - **Player Location:** Pinpoint the player's exact route or city based on their save state.
  - **Roamer Location:** Display an icon indicating the current route of the roaming legendary.
  - **Berry Patches:** Highlight routes containing fully grown or planted berries.
  - **Active Events:** Highlight the route of the current TV swarm/outbreak.
  - **Feebas Tiles:** (Stretch Goal) Overlay the 6 active Feebas fishing spots on Route 119.

## Value Proposition
This feature provides immense value to players by offering a holistic, at-a-glance view of their Hoenn region state. It transforms DexHelper from a collection of isolated data tables into an integrated, visually rich companion, making tasks like hunting roamers or managing berry farms significantly easier and more engaging.

## Acceptance Criteria
- [x] Product Manager: Convert this IDEA into a PRD detailing the UI layout, map asset requirements, and data integration strategy for the Interactive Map Dashboard.
- [ ] prd-424-001-gen3-interactive-map-dashboard
