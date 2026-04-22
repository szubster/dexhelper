---
id: idea-006-gen2-expansion
type: IDEA
title: "Gen 2 Support Expansion: Johto/Kanto Lifecycle"
status: "ACTIVE"
owner_persona: product_manager
created_at: "2026-04-21"
updated_at: "2026-04-22"
jules_session_id: "11351875001808545440"
depends_on:
  - .foundry/ideas/idea-001-the-foundry.md
  - .foundry/ideas/idea-003-atomic-handoff-foundation.md
---

# Gen 2 Support Expansion: Johto/Kanto Lifecycle

## Problem Statement

While the current application has basic support for parsing Gen 2 (Gold/Silver/Crystal) save files, it lacks the generation-specific logic for map traversal, assistance suggestions, mechanics (breeding, held items, RTC), and accurate cross-region routing between Johto and Kanto. This gaps prevents the Assistant from providing the same level of fidelity for Gen 2 as it does for Gen 1.

## Proposed Strategy

Convert the existing [Gen 2 Implementation Plan](.foundry/docs/knowledge_base/development/gen2_implementation_plan.md) into a Foundry-orchestrated workflow. The strategy is broken down into four core phases:

### 1. Save Parser Expansion (Engine Data Layer)
Expand `src/engine/saveParser/parsers/gen2.ts` to include missing Gen 2 structs:
- **Detailed Inventory**: Extract Key Items, special Rods, TMs/HMs (Headbutt, Rock Smash), Apricorns, and Evolution Items.
- **Roamer Tracking**: Extract the map locations of roaming legendaries (Raikou, Entei, Suicune) from RAM.
- **Progress Metadata**: Extract Hall of Fame counts and regional badge progression.

### 2. Exclusives & Static Data Setup
Establish the static knowledge base for Gen 2:
- **Version Exclusives**: Define availability differences across Gold, Silver, and Crystal.
- **Assistant Data**: Catalog static gift data (Togepi Egg, Eevee from Bill, Shuckle in Cianwood, Dratini, Tyrogue) and NPC trade data.

### 3. Johto/Kanto Map Graph Routing
Develop a unified routing engine for the dual-region layout:
- **Map Graph**: Create a comprehensive graph for Johto and Kanto.
- **Cross-Region Distance**: Implement algorithms for transition points like Magnet Train, S.S. Aqua, and Route 27.

### 4. Strategy & Suggestion Engine Adaptations
Inject Gen 2 logic into the Assistant's core:
- **Time-Based Suggestions**: Filter encounters based on Morning/Day/Night cycles.
- **Breeding Suggestions**: Detect compatible parents and suggest breeding for missing baby Pokémon.
- **Interaction Logic**: Handle Headbutt/Rock Smash encounters and stat-based evolutions (Tyrogue).

## Next Steps
- [x] **Product Manager**: Draft the Gen 2 Expansion PRD, formalizing the scope for Phase 1 and 2.
- [ ] **Architect**: Review the Map Graph design to ensure it scales for dual-region routing.

### Generated PRDs
- [.foundry/prds/prd-005-gen2-expansion.md](.foundry/prds/prd-005-gen2-expansion.md)
