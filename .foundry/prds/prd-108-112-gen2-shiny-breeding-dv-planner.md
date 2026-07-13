---
id: prd-108-112-gen2-shiny-breeding-dv-planner
type: PRD
title: Gen 2 Shiny Breeding DV Compatibility Planner PRD
status: PENDING
owner_persona: epic_planner
created_at: '2026-07-11'
updated_at: '2026-07-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-108-gen2-shiny-breeding-dv-planner
tags:
  - gen2
  - shiny-hunting
  - breeding
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Shiny Breeding DV Compatibility Planner PRD

## Vision
To provide a premium companion tool for hardcore Gen 2 shiny hunters that instantly verifies if two Pokémon from their storage are genetically compatible for breeding, and calculates the shiny odds of their offspring based on DV inheritance. This solves the pain point of players wasting hours trying to breed shiny Pokémon that are secretly incompatible due to Gen 2's hidden inbreeding prevention mechanics.

## User Flow
1. **Selection:** The user opens the Shiny Breeding Planner in DexHelper and selects two Pokémon from their parsed PC box storage.
2. **Analysis:** The app instantly reads the Exact DVs (Defense and Special) of both selected Pokémon.
3. **Compatibility Check:** The app applies the Gen 2 DV overlap constraints (Incest Prevention) to determine if the two Pokémon can breed.
4. **Shiny Odds Calculation:** If compatible, the app calculates the exact shiny probability of the offspring based on the DVs of the opposite-gender parent (or Ditto).
5. **Result Display:** The app clearly displays "Compatible" or "Incompatible" along with the calculated shiny odds (e.g., 1/64) and a visual breakdown of the DV inheritance logic.

## Technical Requirements & Constraints
*   **DV Overlap Constraint (Incest Prevention):** Two Pokémon are **incompatible** if:
    *   Their Defense DVs are exactly the same.
    *   AND their Special DVs are either identical OR they differ by exactly 8.
*   **Gender Calculation:** The app must correctly calculate the gender of the Pokémon based on its Attack DV and `gender_rate` (Female threshold = `gender_rate * 2`, female if Attack DV < threshold).
*   **Egg Groups:** The app must respect standard Gen 2 Egg Group rules:
    *   'no-eggs' (15) group cannot breed.
    *   Ditto (13) can breed with any non-'no-eggs' Pokémon.
    *   Two Dittos cannot breed.
    *   Non-Ditto pairs must share at least one egg group and be of opposite genders.
*   **Shiny Parent Genetics:** In Gen 2, shininess requires Defense DV = 10, Special DV = 10. The app must accurately apply the inheritance rules (opposite gender parent passes Defense and Special DVs) to determine the 1/64 shiny odds if a shiny parent is used.

## Acceptance Criteria
- [x] Epic Planner: Break this PRD down into actionable EPICs for the engineering team.
- [ ] epic-112-309-gen2-shiny-breeding-logic
- [ ] epic-112-310-gen2-shiny-breeding-ui
