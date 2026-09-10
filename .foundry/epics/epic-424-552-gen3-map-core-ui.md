---
id: epic-424-552-gen3-map-core-ui
type: EPIC
title: Gen 3 Map Core UI & Layout
status: READY
owner_persona: story_owner
created_at: '2026-09-04'
updated_at: '2026-09-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-424-001-gen3-interactive-map-dashboard
tags:
  - dexhelper
  - gen3
  - map
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Gen 3 Map Core UI & Layout

## Objective
Establish the foundational React architecture, state management, and base UI layout for the Gen 3 Interactive Map dashboard, utilizing a high-quality Hoenn map asset and adhering strictly to the "tactical hardware/snooping" aesthetic (ADR 008).

## Scope
- Setup of a full-width map canvas component.
- Implementation of a sidebar/topbar toggle control panel for map layers.
- Centralized state management (Context/Zustand) for map toggles and currently selected features.
- Incorporation of strict tactical UI components (sharp edges, dashed borders, monospace fonts).

## Acceptance Criteria
- [ ] Story Owner: Break down into STORY nodes for Core UI layout and state management.
- [ ] Story Owner: Create a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).
