---
id: task-102-183-gen3-contest-recommendation-algorithm-impl
type: TASK
title: Implement Gen 3 Contest Recommendation Algorithm
status: PENDING
owner_persona: coder
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-064-102-gen3-contest-recommendation-algorithm
tags:
  - gen3
  - contests
  - algorithm
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Contest Recommendation Algorithm

## Context
This task implements the core recommendation logic for advising players on the best Contest categories for their Gen 3 Pokémon. It will utilize the Nature Condition mapping from `story-064-101-gen3-nature-condition-mapping`.

## Technical Requirements
1. **Algorithm Input**: The function should accept:
   - A Pokémon's current `nature` (e.g., 'Adamant', 'Modest').
   - Current Condition stats (an object or map containing `Cool`, `Beauty`, `Cute`, `Smart`, `Tough` values). Note: Memory states these values are 1-byte (0-255).
   - Current `sheen` level (0-255).

2. **Calculate Remaining Potential**:
   - A Pokémon's sheen increases when eating Pokéblocks, capping at 255.
   - For each condition, calculate how much more it could theoretically grow before hitting the Sheen cap of 255.

3. **Nature Preferences**:
   - Utilize the existing mapping logic to apply a bonus weight to the Condition preferred by the Pokémon's nature (e.g., Adamant prefers Spicy/Cool).
   - Apply a penalty weight to the Condition disliked by the nature.

4. **Scoring and Recommendation**:
   - For each of the 5 contest categories, calculate a final recommendation score based on: current stats, nature preference bonus/penalty, and remaining potential.
   - Return the top 1-2 recommended Contest categories (e.g., returning `['Cool', 'Tough']` or an array of objects with the category and score).

## Architecture & Integration
- Create or update the relevant algorithm utility module (e.g., `src/engine/gen3/contests.ts` or similar).
- Ensure the types for Condition stats and Nature match existing project schemas.

## Acceptance Criteria
- [ ] Implement the recommendation algorithm matching the requirements.
- [ ] Write unit tests verifying the algorithm recommends the correct category for a Pokémon with a preferred nature and matching high stats.
- [ ] Write unit tests for max Sheen scenarios (where remaining potential is 0).
- [ ] Write unit tests handling conflicting Natures and edge cases (e.g., all stats equal).

## Important Reminder for the Coder
- **Transient Failure**: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failure**: If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting. Modifying the frontmatter for completion is forbidden.
