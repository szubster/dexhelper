---
id: idea-128-gen3-acro-bike-route-planner
type: IDEA
title: Gen 3 Acro Bike / Mach Bike Route Requirements
status: READY
owner_persona: product_manager
created_at: 2026-07-28T00:00:00.000Z
updated_at: '2026-07-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - gen3
  - map
  - quality-of-life
research_references: []
notes: >-
  Pivoted from Roamer, Radio, and Berry ideas (which were rejected/ongoing) to
  focus on a novel map utility.
rejection_reason: ''
---

# Gen 3 Acro Bike / Mach Bike Route Requirements

## Context
In Generation 3 (Ruby, Sapphire, Emerald), the player must choose between two distinct bicycles in Mauville City: the Acro Bike (which can hop over rails and climb stepping stones) and the Mach Bike (which can ride up muddy slopes and cross cracked floor tiles). Because the player can only carry one bike at a time, exploring the Hoenn region often leads to frustrating backtracking when encountering an obstacle that requires the other bike.

## The Proposal
Introduce a "Bike Requirement Filter" to DexHelper's Smart Route Radar or interactive map. By parsing the underlying game map definitions (which DexHelper already uses to map routes and encounters), we can visually highlight which specific paths, items, or hidden areas on a route require a specific bike.

Specifically, it will provide:
1. **Route Pre-computation:** When a player views a route in DexHelper, clearly tag the route with badges like `[Requires Mach Bike]` or `[Requires Acro Bike]` if significant portions are gated behind those mechanics.
2. **Item Gating:** If a route contains hidden items or TMs (tracked via save flags), explicitly note if reaching that item requires a specific bike. For example, "TM13 Ice Beam (Abandoned Ship) - Requires Dive & Storage Key."
3. **Save-State Aware Recommendations:** By reading the player's current inventory from the save file (checking if they currently hold the Acro or Mach bike), DexHelper can suggest optimal exploration paths or warn the player that they need to fly back to Mauville City before attempting a specific route.

## Value Proposition
This feature eliminates the frustrating trial-and-error and backtracking associated with Hoenn's dual-bike system. By turning static map data into an intelligent, save-state aware routing assistant, DexHelper provides a unique, highly practical utility for completionists and casual players alike. It satisfies the 50/50 balance requirement by offering a novel, non-duplicate feature for the DexHelper application following the orchestrator-focused IDEA-124.
