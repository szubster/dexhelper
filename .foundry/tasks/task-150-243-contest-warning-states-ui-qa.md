---
id: task-150-243-contest-warning-states-ui-qa
type: TASK
title: QA Contest Warning States UI
status: COMPLETED
owner_persona: qa
created_at: '2026-06-29'
updated_at: '2026-07-02'
depends_on:
  - task-150-242-contest-warning-states-ui-impl
jules_session_id: null
pr_number: null
parent: story-065-150-contest-warning-states-ui
tags:
  - qa
  - gen3
  - contests
  - advisor
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Verification: Contest Warning States UI

## Context
This task is for the `qa` persona to verify the Contest Warning States UI implemented in `task-150-242-contest-warning-states-ui-impl`. The components must alert users when a Pokémon has maxed out its Sheen but lacks stats for Master Rank contests.

## Verification Requirements
1. **Component Design**:
   - Verify that `ContestRecommendationPanel` accepts a `sheen` prop.
   - Verify the "dead-end" logic correctly detects when `sheen >= 255` and the top recommendation score is `< 200`.
2. **Data Display Verification**:
   - Verify that a distinct tactical warning banner is rendered when the dead-end state is active.
   - Verify the warning copy clearly explains that Sheen is maxed out and Master Rank is unlikely achievable.
3. **Architectural Scaffolding (ADR 008) Verification**:
   - Verify that the UI strictly adheres to the 'tactical hardware/snooping' aesthetic.
   - Check for explicit sharp edges (`rounded-none`) and the absence of any rounded corners.
   - Check for the use of dashed borders (`border-dashed`).
   - Check for the use of monospaced telemetry fonts for data display.
4. **Test Verification**:
   - Verify that tests exist and are passing, specifically ensuring the warning state renders correctly under the "dead-end" conditions.

## Acceptance Criteria
- [x] Verify `ContestRecommendationPanel` accepts the `sheen` prop.
- [x] Verify the visual warning for the edge case (maxed sheen, low stats) is implemented.
- [x] Verify the tactical hardware aesthetic (ADR 008) is applied.
- [x] Verify tests are written and passing for the warning state.

## Important Reminder for QA
- **Transient Failure**: If you experience a transient failure requiring retry or the implementation is incomplete, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failure**: If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR**: If you submit an empty PR for a completed task (e.g. everything is verified and working), you MUST check off all Acceptance Criteria checkboxes before submitting. Modifying the frontmatter for completion is forbidden.
