---
id: epic-048-085-gen3-match-call-dashboard-ui
type: EPIC
title: 'Epic: Gen 3 Rematch Dashboard UI'
status: PENDING
owner_persona: story_owner
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on:
  - epic-048-083-gen3-match-call-save-parsing
  - epic-048-084-gen3-match-call-static-data
jules_session_id: null
pr_number: null
parent: prd-077-048-gen3-match-call-tracker
tags:
  - feature
  - gen3
  - tracking
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Gen 3 Rematch Dashboard UI

## Overview
This epic involves constructing the frontend tactical UI for the "Rematch Dashboard". It will display a list of Pokémon Emerald trainers currently ready for a rematch, fusing the real-time save state with the enriched static EV data.

## Prerequisites
- `.foundry/epics/epic-048-083-gen3-match-call-save-parsing.md` (Raw state extraction)
- `.foundry/epics/epic-048-084-gen3-match-call-static-data.md` (Enriched dataset)
- Adherence to ADR 008: Graph Rendering & UI Aesthetic Constraints (tactical hardware/snooping style, sharp edges, monospaced fonts).

## Objectives
- Build a new view component `RematchDashboard` within the application.
- Implement filtering and sorting mechanisms allowing users to find trainers by specific EV yields (e.g., "Speed", "Attack") or Location.
- Design individual trainer cards or rows that adhere to the tactical design system (`rounded-none`, `border-dashed`, `font-mono`).
- Ensure the UI correctly reflects the specific tier (1-5) the trainer is currently at, displaying accurate team summaries and EV totals.
- Integrate robust testing to ensure the filter logic and UI rendering work correctly with mock save states.

## Next Steps
- [ ] Story Owner: Break this Epic down into actionable Stories (e.g., UI Component Design, State/Data Integration, Filter Logic Implementation).
