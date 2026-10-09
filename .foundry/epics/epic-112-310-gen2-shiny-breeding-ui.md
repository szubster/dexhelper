---
id: epic-112-310-gen2-shiny-breeding-ui
type: EPIC
title: Gen 2 Shiny Breeding Compatibility Planner UI
status: PENDING
owner_persona: story_owner
created_at: '2026-07-12'
updated_at: '2026-07-12'
depends_on:
  - epic-112-309-gen2-shiny-breeding-logic
jules_session_id: null
pr_number: null
parent: prd-108-112-gen2-shiny-breeding-dv-planner
tags:
  - gen2
  - breeding
  - ui
research_references:
  - .foundry/archive/docs/adrs/024-tailwind-v4-utility-consolidation.md
  - .foundry/docs/knowledge_base/tailwind_v4_utilities.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Shiny Breeding Compatibility Planner UI

## Overview
This Epic involves building the user interface for the Shiny Breeding Planner in DexHelper. It will consume the logic developed in `epic-112-309-gen2-shiny-breeding-logic`. The UI will allow users to select two Pokémon from their Gen 2 storage (PC or Party) and visually determine if they can breed and what the odds are of producing a shiny offspring.

## Responsibilities & Technical Requirements

1.  **Pokémon Selection Interface**:
    *   Build a component allowing users to select two Pokémon currently in their parsed Gen 2 save file storage.
    *   Display relevant base stats for selection, including species, gender (calculated from Attack DV), and current DVs (Defense and Special are critical).

2.  **Compatibility Display**:
    *   Clearly display the compatibility result ("Compatible" or "Incompatible").
    *   If incompatible, visually explain why (e.g., highlighting overlapping DVs or incompatible egg groups).

3.  **Shiny Odds & Inheritance Visualization**:
    *   If compatible, display the calculated shiny odds (e.g., 1/64, 1/8192).
    *   Create a visual representation of DV inheritance, illustrating which parent passes down the Defense and Special DVs to the offspring to justify the shiny odds.

4.  **Tactical Styling**:
    *   Adhere strictly to the "tactical hardware" aesthetic.
    *   Use Tailwind v4 `@utility` classes (e.g., `tactical-panel`) for consistent styling, incorporating dashed borders (`border-dashed`), sharp corners (`rounded-none`), and monospaced typography (`font-mono`).

## Acceptance Criteria
- [ ] Story Owner: Break this EPIC down into actionable STORY nodes for the engineering team.
