---
id: story-310-677-compatibility-odds-display
type: STORY
title: Gen 2 Shiny Breeding UI - Compatibility & Odds Display
status: READY
owner_persona: tech_lead
created_at: '2026-10-15'
updated_at: '2026-10-15'
depends_on:
  - story-310-676-pokemon-selection-interface
jules_session_id: null
pr_number: null
parent: epic-112-310-gen2-shiny-breeding-ui
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
locks: []
---

# Gen 2 Shiny Breeding UI - Compatibility & Odds Display

## Overview
This story involves visualizing the breeding compatibility result and calculated shiny odds based on the user's selected Pokémon, utilizing the logic engine from `epic-112-309-gen2-shiny-breeding-logic`.

## Responsibilities & Technical Requirements

1.  **Compatibility Display**:
    *   Clearly display the compatibility result ("Compatible" or "Incompatible").
    *   If incompatible, visually explain why (e.g., highlighting overlapping DVs or incompatible egg groups).
2.  **Shiny Odds & Inheritance Visualization**:
    *   If compatible, display the calculated shiny odds (e.g., 1/64, 1/8192).
    *   Create a visual representation of DV inheritance, illustrating which parent passes down the Defense and Special DVs to the offspring to justify the shiny odds.
3.  **Tactical Styling**:
    *   Adhere strictly to the "tactical hardware" aesthetic.
    *   Use Tailwind v4 `@utility` classes (e.g., `tactical-panel`) for consistent styling, incorporating dashed borders (`border-dashed`), sharp corners (`rounded-none`), and monospaced typography (`font-mono`).

## Acceptance Criteria
- [ ] Tech Lead: Break this story down into actionable TASKS.
