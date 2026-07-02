---
id: task-150-242-contest-warning-states-ui-impl
type: TASK
title: Implement Contest Warning States UI
status: ACTIVE
owner_persona: coder
created_at: '2026-06-29'
updated_at: '2026-07-01'
depends_on: []
jules_session_id: '2245414162262557999'
pr_number: null
parent: story-065-150-contest-warning-states-ui
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

# Implement Contest Warning States UI

## Context
This task implements visual warning states for edge cases identified by the Gen 3 Contest Optimization Advisor algorithm. Specifically, alert users when a Pokémon has maxed out its Sheen but lacks the requisite stats for Master Rank contests, indicating a dead-end for optimization.

## Technical Requirements
1. **Component Design**:
   - Update `ContestRecommendationPanel` in `src/components/ContestRecommendationPanel.tsx` to accept a `sheen` prop (number).
   - Implement logic to detect the "dead-end" warning state: if `sheen >= 255` and the top recommendation's score is `< 200` (which we consider insufficient for Master Rank), this state is active.
2. **Data Display**:
   - If the dead-end state is active, render a distinct tactical warning banner within the panel.
   - The warning should clearly alert the user that the Pokémon's Sheen is maxed out and that Master Rank is unlikely achievable because further optimization via Pokéblocks is impossible.
3. **Architectural Scaffolding (ADR 008)**:
   - The UI MUST strictly adhere to the 'tactical hardware/snooping' aesthetic.
   - Use explicit sharp edges (`rounded-none`).
   - Avoid any rounded corners.
   - Use dashed borders (`border-dashed`).
   - Use monospaced telemetry fonts for data display.
   - For warnings, use appropriate colors (e.g., amber/red text and borders).
4. **Tests**:
   - Update `src/components/__tests__/ContestRecommendationPanel.test.tsx` to include a test case that verifies the warning state renders correctly when `sheen` is 255 and scores are below 200.

## Acceptance Criteria
- [x] Update `ContestRecommendationPanel` to accept a `sheen` prop.
- [x] Implement the "dead-end" detection logic (`sheen >= 255` and top score `< 200`).
- [x] Display a distinct visual warning when the dead-end state is reached.
- [x] Adhere strictly to the tactical hardware aesthetic (ADR 008).
- [x] Write tests to verify the warning state renders properly.

## Important Reminder for the Coder
- **Transient Failure**: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failure**: If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting. Modifying the frontmatter for completion is forbidden.
