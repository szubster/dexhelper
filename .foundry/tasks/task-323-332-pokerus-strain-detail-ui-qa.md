---
id: task-323-332-pokerus-strain-detail-ui-qa
type: TASK
title: QA - Pokerus Strain Detail UI
status: PENDING
owner_persona: qa
created_at: '2026-07-17'
updated_at: '2026-07-17'
depends_on:
  - task-323-331-pokerus-strain-detail-ui-impl
jules_session_id: null
pr_number: null
parent: story-322-323-pokerus-strain-detail-ui
tags:
  - pokerus
  - ui
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA - Pokerus Strain Detail UI

## Objective
Verify the implementation of the Pokerus strain detail UI component.

## Context
The Coder has implemented the UI to display the Pokerus strain for infected/cured Pokemon. This task verifies the logic, conditional rendering, and aesthetic adherence.

## Acceptance Criteria
- [ ] Verify the strain is displayed ONLY when status is "Infected" or "Cured".
- [ ] Verify the strain is NOT displayed when status is "None" or other invalid states.
- [ ] Verify the UI strictly adheres to the "tactical hardware" aesthetic (`rounded-none`, `border-dashed`, `font-mono`).
- [ ] Verify there are no visual regressions in the Pokemon detail view.
