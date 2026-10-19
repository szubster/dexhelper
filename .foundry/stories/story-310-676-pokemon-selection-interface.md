---
id: story-310-676-pokemon-selection-interface
type: STORY
title: Gen 2 Shiny Breeding UI - Pokémon Selection Interface
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-10-15'
updated_at: '2026-10-18'
depends_on:
  - epic-112-309-gen2-shiny-breeding-logic
jules_session_id: '9776170384892283600'
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

# Gen 2 Shiny Breeding UI - Pokémon Selection Interface

## Overview
This story focuses on creating the UI component that allows users to select two Pokémon from their Gen 2 save file storage (PC or Party) to evaluate for shiny breeding.

## Responsibilities & Technical Requirements

1.  **Pokémon Selection Interface**:
    *   Build a component allowing users to select two Pokémon currently in their parsed Gen 2 save file storage.
    *   Display relevant base stats for selection, including species, gender (calculated from Attack DV), and current DVs (Defense and Special are critical).
2.  **Tactical Styling**:
    *   Adhere strictly to the "tactical hardware" aesthetic.
    *   Use Tailwind v4 `@utility` classes (e.g., `tactical-panel`) for consistent styling, incorporating dashed borders (`border-dashed`), sharp corners (`rounded-none`), and monospaced typography (`font-mono`).

## Acceptance Criteria
- [ ] Tech Lead: Break this story down into actionable TASKS.
