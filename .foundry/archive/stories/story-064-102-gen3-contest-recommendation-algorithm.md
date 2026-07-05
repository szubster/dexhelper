---
id: story-064-102-gen3-contest-recommendation-algorithm
type: STORY
title: Gen 3 Contest Recommendation Algorithm
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-06-09'
updated_at: '2026-06-14'
depends_on:
  - story-064-101-gen3-nature-condition-mapping
jules_session_id: null
pr_number: null
parent: epic-042-064-gen3-contest-advisor-algorithm
tags:
  - gen3
  - contests
  - algorithm
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Gen 3 Contest Recommendation Algorithm

## 1. Context
This story implements the core logic for `epic-042-064-gen3-contest-advisor-algorithm`. Using the Nature mapping from the previous story, we will build the recommendation engine that advises users on the best Contest categories for their Pokémon.

## 2. Requirements
- Develop an algorithm that accepts a Pokémon's current Nature, Condition values (Cool, Beauty, Cute, Smart, Tough), and Sheen level.
- Calculate the "remaining potential" for each condition, factoring in the maximum Sheen limit of 255.
- Output the top 1-2 recommended Contest categories based on a weighted combination of:
  1. Nature preference (bonus to preferred, penalty to disliked).
  2. Current highest base stats in the relevant Condition.
  3. Feasibility of maxing out the stat before hitting the Sheen cap.

## 3. Acceptance Criteria
- [x] Implement the core recommendation algorithm function.
- [x] Write unit tests to verify outputs for max Sheen scenarios.
- [x] Write unit tests for conflicting Natures and edge cases (e.g., all stats equal).
- [ ] task-102-183-gen3-contest-recommendation-algorithm-impl
- [ ] task-102-184-gen3-contest-recommendation-algorithm-qa
