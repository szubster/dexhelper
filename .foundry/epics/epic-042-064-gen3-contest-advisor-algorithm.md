---
id: epic-042-064-gen3-contest-advisor-algorithm
type: EPIC
title: Gen 3 Contest Advisor Algorithm
status: ACTIVE
owner_persona: story_owner
created_at: '2026-06-09'
updated_at: '2026-06-09'
depends_on: []
jules_session_id: '9537044494465755809'
pr_number: null
parent: prd-070-042-gen3-contest-optimization-advisor
tags:
  - feature
  - gen3
  - contests
  - advisor
  - algorithm
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Gen 3 Contest Advisor Algorithm

## 1. Context
Derived from `prd-070-042-gen3-contest-optimization-advisor`, this epic focuses on implementing the underlying backend logic and recommendation algorithm for the Gen 3 Contest Optimization Advisor. It requires translating game mechanics—such as Nature preferences, Condition stats, and Sheen limits—into a programmatic recommendation engine.

## 2. Requirements

### 2.1 Nature Mapping
- Implement a robust data mapping of all 25 Pokémon Natures to their preferred and disliked Pokéblock flavors.
- Ensure these flavors correctly align with the five Contest Conditions: Cool, Beauty, Cute, Smart, and Tough.

### 2.2 Recommendation Algorithm
- Develop an algorithm that accepts a Pokémon's current Natures, Condition values, and Sheen level.
- The algorithm must calculate the "remaining potential" for each condition (factoring in the maximum Sheen limit of 255).
- It should output the top 1-2 recommended Contest categories based on a weighted combination of:
  1. Nature preference (bonus to preferred, penalty to disliked).
  2. Current highest base stats in the relevant Condition.
  3. Feasibility of maxing out the stat before hitting the Sheen cap.

## 3. Acceptance Criteria
- [ ] Create the data structure for Nature-to-Condition mappings.
- [ ] Implement the core recommendation algorithm function.
- [ ] Write unit tests to verify the recommendation engine outputs mathematically sound suggestions across various edge cases (e.g., max Sheen, conflicting Natures, all stats equal).
