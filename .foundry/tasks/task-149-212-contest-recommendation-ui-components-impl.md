---
id: task-149-212-contest-recommendation-ui-components-impl
type: TASK
title: Implement Contest Recommendation UI Components
status: READY
owner_persona: coder
created_at: '2026-06-19'
updated_at: '2026-06-19'
depends_on: []jules_session_id: null
pr_number: null
parent: story-065-149-contest-recommendation-ui-components
tags:
  - feature
  - gen3
  - contests
  - advisor
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Contest Recommendation UI Components

## Context
This task implements the reusable UI components for the Contest Recommendation Advisor. These components will consume the outputs from the recommendation algorithm (implemented in `task-102-183-gen3-contest-recommendation-algorithm-impl`) to clearly display the best contest categories for a Pokémon.

## Technical Requirements
1. **Component Design**:
   - Create a reusable React component (e.g., `ContestRecommendationPanel`) to display the algorithm's recommendations.
   - The component should accept the output of the recommendation algorithm as a prop.
2. **Data Display**:
   - The component MUST clearly display the top 1-2 recommended Contest categories (e.g., Cool, Beauty, Cute, Smart, Tough).
   - Display a brief, generated explanation for *why* a category was chosen (e.g., highlighting a favorable Nature, high existing base stats, or remaining potential before reaching the sheen limit).
3. **Architectural Scaffolding (ADR 008)**:
   - The UI MUST strictly adhere to the 'tactical hardware/snooping' aesthetic.
   - Use explicit sharp edges (`rounded-none`).
   - Avoid any rounded corners.
   - Use dashed borders (`border-dashed`).
   - Use monospaced telemetry fonts for data display.
4. **Integration**:
   - Ensure the new components are exportable and ready to be integrated into the broader Contest Advisor Dashboard.
   - Create tests ensuring the components render correctly with varying mock data (e.g., 1 recommendation, 2 recommendations, edge cases where all stats are zero).

## Acceptance Criteria
- [ ] Develop reusable UI components for Contest recommendations.
- [ ] Clearly display the top 1-2 recommended Contest categories.
- [ ] Implement clear reasoning copy for recommendations (e.g. highlighting favorable Nature or high existing stat).
- [ ] Apply the tactical hardware aesthetic (ADR 008).
- [ ] Write tests ensuring component renders correctly with algorithm outputs.

## Important Reminder for the Coder
- **Transient Failure**: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failure**: If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting. Modifying the frontmatter for completion is forbidden.
