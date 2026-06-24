---
id: task-102-184-gen3-contest-recommendation-algorithm-qa
type: TASK
title: QA Gen 3 Contest Recommendation Algorithm
status: COMPLETED
owner_persona: qa
created_at: '2026-06-14'
updated_at: '2026-06-18'
depends_on: []jules_session_id: null
pr_number: null
parent: story-064-102-gen3-contest-recommendation-algorithm
tags:
  - gen3
  - contests
  - algorithm
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 3 Contest Recommendation Algorithm

## Context
This QA task verifies the work done in `task-102-183-gen3-contest-recommendation-algorithm-impl`. You are responsible for ensuring the Gen 3 Contest Recommendation algorithm accurately weights Nature preferences, Sheen potential, and base stats.

## QA Requirements
1. **Algorithm Validation**:
   - Verify the recommendation algorithm handles edge cases gracefully, such as max Sheen (255) effectively nullifying "remaining potential".
   - Verify the algorithm penalizes Contest conditions disliked by the Pokémon's Nature.
   - Verify the algorithm correctly boosts Contest conditions preferred by the Pokémon's Nature.
2. **Test Coverage**:
   - Run the unit tests developed by the Coder. Ensure they all pass and provide meaningful coverage for max sheen and conflicting nature scenarios.
3. **Integration Constraints**:
   - Ensure the function signatures match standard conventions and do not break backwards compatibility or crash the frontend when dealing with partial state.

## Acceptance Criteria
- [x] Review code for the recommendation algorithm.
- [x] Run the unit tests and ensure edge cases (e.g., all 5 condition stats equal, sheen at 255) are correctly verified.
- [x] Confirm no regressions or typing mismatches were introduced.

## Important Reminder for the QA Persona
- **Transient Failure**: If you experience a transient failure requiring retry (or want to fail the coder's work), you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failure**: If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting. Modifying the frontmatter for completion is forbidden.
