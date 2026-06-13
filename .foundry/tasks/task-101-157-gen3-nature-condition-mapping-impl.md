---
id: task-101-157-gen3-nature-condition-mapping-impl
type: TASK
title: Implement Gen 3 Nature to Contest Condition Mapping
status: ACTIVE
owner_persona: coder
created_at: '2026-06-10'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: '7442841337385241427'
pr_number: null
parent: story-064-101-gen3-nature-condition-mapping
tags:
  - gen3
  - contests
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Nature to Contest Condition Mapping

## Context
This task implements the logic defined in `story-064-101-gen3-nature-condition-mapping`. We need a robust data structure to map the 25 Pokémon Natures to their preferred and disliked Pokéblock flavors, which correspond to the five Contest Conditions (Cool = Spicy, Beauty = Dry, Cute = Sweet, Smart = Bitter, Tough = Sour).

## Instructions
1.  **Data Structure**: Create a constant (e.g., in `src/engine/gen3/contests/natureMapping.ts` or similar appropriate file) that maps each of the 25 Pokémon Natures to their preferred and disliked Contest Conditions based on flavor preferences.
2.  **Utility Functions**: Implement functions to easily query this data, such as:
    *   `getPreferredCondition(nature: Nature): ContestCondition | null`
    *   `getDislikedCondition(nature: Nature): ContestCondition | null`
3.  **Unit Tests**: Write comprehensive unit tests in an adjacent `.test.ts` file to verify that the mappings are accurate for all 25 natures and that the utility functions work correctly.

## Constraints
- Ensure strict typings are used for Natures and Contest Conditions.
- Follow existing project conventions for data structures.

## Acceptance Criteria
- [ ] The data structure mapping all 25 Natures to Contest Conditions is implemented.
- [ ] Utility functions for querying preferences and dislikes are implemented and exported.
- [ ] Unit tests cover all 25 natures to verify accuracy.

> **Note to Coder**:
> - If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
> - If you submit an empty PR for a completed task (e.g., if the work is already done), you MUST check off all Acceptance Criteria checkboxes before submitting.
