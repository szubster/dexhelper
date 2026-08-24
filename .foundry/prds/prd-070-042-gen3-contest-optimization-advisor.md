---
id: prd-070-042-gen3-contest-optimization-advisor
type: PRD
title: Gen 3 Contest Optimization Advisor
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-06-08'
updated_at: '2026-08-23'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-070-gen3-contest-tracker
tags:
  - feature
  - gen3
  - contests
  - advisor
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Gen 3 Contest Optimization Advisor

## 1. Context
Beyond simply displaying Contest statistics and Ribbons, DexHelper aims to provide actionable insights. The Gen 3 Contest Optimization Advisor will leverage the extracted Condition stats, Sheen, and a Pokémon's Nature to recommend the best Contest categories for that specific Pokémon. This tool will simplify the complex interplay between Natures and Pokéblock preferences.

## 2. Requirements

### 2.1 Optimization Logic
- **Nature Analysis**: Incorporate game logic that maps Pokémon Natures to their preferred and disliked Pokéblock flavors (which correspond directly to Contest Conditions: Cool, Beauty, Cute, Smart, Tough).
- **Condition Assessment**: Analyze the current numerical values of the Pokémon's Conditions.
- **Sheen Limitation**: Factor in the remaining Sheen capacity (255 - current Sheen) to determine if there is enough "room" left to significantly boost a specific condition via Pokéblocks.
- **Recommendation Algorithm**: Develop an algorithm that combines Nature preference, current highest stats, and remaining Sheen to suggest the top 1-2 recommended Contest categories to enter or optimize for.

### 2.2 Advisor UI
- **Integration**: Embed the advisor recommendations within the individual Pokémon detail view, ideally adjacent to the Contest Stats Viewer.
- **Clear Guidance**: Present the recommendations clearly, explaining *why* a category is suggested (e.g., "Recommended: Cool - High base stat and favorable Nature (Adamant)").
- **Warning States**: Display warnings if a Pokémon has maxed out its Sheen but lacks competitive stats for Master Rank contests, indicating further optimization via Pokéblocks is impossible.

## 3. Acceptance Criteria
- [ ] Implement the logic mapping Natures to Contest Condition preferences.
- [ ] Develop the recommendation algorithm based on Nature, current Conditions, and Sheen.
- [ ] Create UI components to display the recommendations clearly.
- [ ] Implement warning states for Pokémon with maxed Sheen and suboptimal stats.
- [ ] Write unit tests verifying the recommendation logic produces expected outcomes for various Nature/Stat combinations.

### Breakdown Tasks
- [x] epic-042-064-gen3-contest-advisor-algorithm
- [x] epic-042-065-gen3-contest-advisor-ui
