---
id: story-268-348-gen3-ash-integration
type: STORY
title: 'Story: Gen 3 Volcanic Ash Integration & View'
status: PENDING
owner_persona: tech_lead
created_at: '2026-07-29'
updated_at: '2026-08-22'
depends_on:
  - story-268-331-gen3-ash-dataview-extraction-relative
jules_session_id: null
pr_number: null
parent: epic-054-268-gen3-ash-save-parsing
tags:
  - gen3
  - ash
  - integration
research_references:
  - .foundry/archive/research/research-054-243-gen3-ash-gathering-offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Gen 3 Volcanic Ash Integration & View

## Objective
Integrate the extracted Gen 3 Volcanic Ash count into the frontend UI and ensure full E2E testing.

## Architectural Constraints
- Ensure proper rendering of the `gen3VolcanicAsh` property in the React components, adhering to the UI aesthetic constraints.
- Implement comprehensive E2E testing to satisfy the E2E safeguard.

## Acceptance Criteria
- [x] Break down this Story into TASK nodes outlining frontend implementation and E2E testing.
- [x] [task-348-100-gen3-ash-ui-impl](.foundry/tasks/task-348-100-gen3-ash-ui-impl.md)
- [x] [task-348-101-gen3-ash-ui-qa](.foundry/tasks/task-348-101-gen3-ash-ui-qa.md)
- [ ] research-348-461-investigate-isgen3save-stub
- [ ] task-348-462-gen3-ash-ui-impl
- [ ] task-348-463-gen3-ash-ui-qa
