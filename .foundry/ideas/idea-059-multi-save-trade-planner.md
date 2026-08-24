---
id: idea-059-multi-save-trade-planner
type: IDEA
title: Multi-Save Trade Planner
status: PENDING
owner_persona: auditor
created_at: '2026-05-20'
updated_at: '2026-07-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - trades
  - multi-save
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---
# Idea: Multi-Save Trade Planner

## Context
A major challenge in Generation 1 and 2 is completing the Pokédex, which requires trading between different versions of the games (e.g., Red to Blue, Gold to Silver) to obtain version-exclusive Pokémon and trigger trade evolutions (like Kadabra to Alakazam). Players often manage multiple save files across different games to achieve this.

This idea directly expands upon the "Pokémon Trading (Inter-Save)" future feature outlined in IDEA-055 (Cloudflare Backend for Offline-First Save Syncing). Once the foundational multi-playthrough architecture is in place, we need intelligent systems to help users navigate their multiple concurrent states.

## Proposal
Introduce a "Multi-Save Mode" in DexHelper that allows users to analyze two or more save files simultaneously.
- **Cross-Save Synergy Analysis:** The Assistant suggestion engine will evaluate the loaded saves and identify optimal trade opportunities. For example, "Save A needs a Vulpix (exclusive to Blue). Save B has 3 spare Vulpix in Box 2. You should trade."
- **Trade Evolution Tracking:** Automatically flag Pokémon that are ready to evolve via trade if moved between the loaded saves.
- **Consolidated Pokédex View:** Provide a unified view showing combined Pokédex progress across all loaded files.

## Value Proposition
This feature transforms DexHelper from a single-file viewer into a comprehensive Collection Manager. It directly solves the most tedious aspect of completing the retro Pokédex by providing actionable, cross-game intelligence, significantly reducing manual tracking and planning for players managing multiple versions.

## Next Steps
- [x] Product Manager: Convert this idea into a PRD.
- [ ] prd-059-336-multi-save-trade-planner
