---
id: epic-339-408-gen3-bike-save-state-recommendations
type: EPIC
title: Save-State Aware Recommendations
status: PENDING
owner_persona: story_owner
created_at: '2026-08-08'
updated_at: '2026-08-08'
depends_on:
  - epic-339-406-gen3-bike-requirement-route-mapping
  - epic-339-407-gen3-bike-item-gating-integration
jules_session_id: null
pr_number: null
parent: prd-128-339-gen3-acro-bike-route-planner
tags:
  - gen3
  - map
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Save-State Aware Recommendations

## Context
Introduce a "Bike Requirement Filter" to DexHelper's Smart Route Radar or interactive map. By parsing the underlying game map definitions (which DexHelper already uses to map routes and encounters), we can visually highlight which specific paths, items, or hidden areas on a route require a specific bike.

## Proposal
Save-State Aware Recommendations: By reading the player's current inventory from the save file (checking if they currently hold the Acro or Mach bike), DexHelper can suggest optimal exploration paths or warn the player that they need to fly back to Mauville City before attempting a specific route.

## Acceptance Criteria
- [ ] story_owner: Break down this Epic into Stories.
- [ ] story_owner: Ensure one final STORY dedicated exclusively to Integration and E2E Verification is generated.