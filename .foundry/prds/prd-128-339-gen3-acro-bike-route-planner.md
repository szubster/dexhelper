---
id: prd-128-339-gen3-acro-bike-route-planner
type: PRD
title: Gen 3 Acro Bike / Mach Bike Route Requirements
status: PENDING
owner_persona: epic_planner
created_at: '2026-08-06'
updated_at: '2026-08-09'
depends_on: []
jules_session_id: '15023750986512382605'
pr_number: null
parent: idea-128-gen3-acro-bike-route-planner
tags:
  - gen3
  - map
  - quality-of-life
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Acro Bike / Mach Bike Route Requirements

## Context
In Generation 3 (Ruby, Sapphire, Emerald), the player must choose between two distinct bicycles in Mauville City: the Acro Bike (which can hop over rails and climb stepping stones) and the Mach Bike (which can ride up muddy slopes and cross cracked floor tiles). Because the player can only carry one bike at a time, exploring the Hoenn region often leads to frustrating backtracking when encountering an obstacle that requires the other bike.

## Proposal
Introduce a "Bike Requirement Filter" to DexHelper's Smart Route Radar or interactive map. By parsing the underlying game map definitions (which DexHelper already uses to map routes and encounters), we can visually highlight which specific paths, items, or hidden areas on a route require a specific bike.

Specifically, it will provide:
1. **Route Pre-computation:** When a player views a route in DexHelper, clearly tag the route with badges like `[Requires Mach Bike]` or `[Requires Acro Bike]` if significant portions are gated behind those mechanics.
2. **Item Gating:** If a route contains hidden items or TMs (tracked via save flags), explicitly note if reaching that item requires a specific bike. For example, "TM13 Ice Beam (Abandoned Ship) - Requires Dive & Storage Key."
3. **Save-State Aware Recommendations:** By reading the player's current inventory from the save file (checking if they currently hold the Acro or Mach bike), DexHelper can suggest optimal exploration paths or warn the player that they need to fly back to Mauville City before attempting a specific route.

## Acceptance Criteria
- [x] epic_planner: Break this PRD down into actionable Epics.
- [ ] epic-339-406-gen3-bike-requirement-route-mapping
- [ ] epic-339-407-gen3-bike-item-gating-integration
- [ ] epic-339-408-gen3-bike-save-state-recommendations
