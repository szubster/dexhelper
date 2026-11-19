---
id: task-677-745-gen2-breeding-odds-impl
type: TASK
title: Implement Gen 2 Shiny Breeding Compatibility & Odds Display
status: PENDING
owner_persona: coder
created_at: '2026-11-07'
updated_at: '2026-11-07'
depends_on:
  - story-310-676-pokemon-selection-interface
  - epic-112-309-gen2-shiny-breeding-logic
jules_session_id: null
pr_number: null
parent: story-310-677-compatibility-odds-display
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
confidence_score: 90
---

# Implement Gen 2 Shiny Breeding Compatibility & Odds Display

## Overview
Implement the React component that visualizes breeding compatibility, calculated shiny odds, and DV inheritance for the Gen 2 Shiny Breeding feature, adhering strictly to the "tactical hardware" aesthetic.

## Technical Requirements
1.  **Compatibility UI**: Create a component to clearly indicate if the two selected parents are compatible or incompatible. If incompatible, provide visual feedback on the reason (e.g., matching Defense and Special DVs, same gender, incompatible egg groups).
2.  **Shiny Odds Visualization**: If compatible, display the calculated shiny egg odds (e.g., 1/64, 1/8192).
3.  **Inheritance Visualization**: Create a visual layout illustrating which parent passes down the Defense and Special DVs to the offspring to justify the calculated odds.
4.  **Styling Compliance**: Adhere strictly to the "tactical hardware" aesthetic using Tailwind v4 `@utility` classes. Use `tactical-panel` for containers, `border-dashed` for borders, `rounded-none` for corners, and `font-mono` for text.
5.  **Integration**: Wire this component into the `ShinyCarrierBreedingDashboard` or the appropriate Gen 2 breeding context, receiving the selected parents and calculated engine results as props.
6.  **Tests**: Write comprehensive Vitest unit tests verifying the component renders correctly for both compatible and incompatible states, and accurately displays odds and inheritance paths.

## Acceptance Criteria
- [ ] Component successfully renders compatibility status.
- [ ] Component successfully renders shiny odds and DV inheritance visualization when compatible.
- [ ] Tactical hardware aesthetic is strictly followed (tactical-panel, border-dashed, rounded-none).
- [ ] Vitest unit tests pass and verify all states.
