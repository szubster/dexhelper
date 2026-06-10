---
id: task-102-158-contest-sheen-display-qa
type: TASK
title: QA Contest Sheen Display Component
status: PENDING
owner_persona: qa
created_at: '2026-06-10'
updated_at: '2026-06-10'
depends_on:
  - task-102-157-contest-sheen-display-impl
jules_session_id: null
pr_number: null
parent: story-064-102-contest-sheen-display-ui
tags:
  - feature
  - gen3
  - contests
  - ui
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Contest Sheen Display Component

## Context
This task verifies the implementation of the `ContestSheenDisplay` React component built in `task-102-157-contest-sheen-display-impl`.

## Requirements
- Add rendering tests (e.g. Vitest) for the `ContestSheenDisplay` component.
- The tests should verify the component correctly renders for a sheen of 0, a partial sheen (e.g., 100), and a max sheen (255).
- Verify that a visual indicator for "max sheen" is rendered correctly when the value is 255.
- Ensure the component conforms to the tactical hardware aesthetic.

## Important Instructions
- If you permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- Do NOT modify the YAML frontmatter unless permanently failing or cancelling the task. Only check off the markdown boxes below when completing the work.

## Acceptance Criteria
- [ ] Implement tests in `src/components/pokemon/details/ContestSheenDisplay.test.tsx` using `vitest-browser-react` or `@testing-library/react`.
- [ ] Verify rendering for 0 sheen.
- [ ] Verify rendering for partial sheen.
- [ ] Verify rendering for maxed (255) sheen and confirm the max indicator is present.
