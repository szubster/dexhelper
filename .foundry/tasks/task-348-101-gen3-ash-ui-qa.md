---
id: task-348-101-gen3-ash-ui-qa
type: TASK
title: 'Task: QA E2E Testing for Gen 3 Volcanic Ash UI'
status: ACTIVE
owner_persona: qa
created_at: '2026-07-29'
updated_at: '2026-08-18'
depends_on:
  - task-348-100-gen3-ash-ui-impl
jules_session_id: '2676216209078357664'
pr_number: null
parent: story-268-348-gen3-ash-integration
tags:
  - gen3
  - ash
  - qa
  - e2e
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Task: QA E2E Testing for Gen 3 Volcanic Ash UI

## Objective
Implement comprehensive E2E testing to verify the Gen 3 Volcanic Ash UI integration, satisfying the E2E safeguard requirement.

## Architectural Constraints
- Ensure an E2E test validates the rendering of the Volcanic Ash count in the UI when Gen 3 save data is loaded.
- Use Playwright for the E2E test, adhering to existing testing conventions.

## Acceptance Criteria
- [ ] Write an E2E test to verify the Volcanic Ash count renders correctly when a relevant Gen 3 save file is loaded.
- [ ] Document the test execution and validation results in the `qa` persona journal.

### QA Rejection
The UI looks fine but `isGen3Save` is a stub returning false which fails to parse the save entirely during e2e. Rejecting task-348-100-gen3-ash-ui-impl so it can be fixed.


### QA Note
Target task `task-348-100-gen3-ash-ui-impl` was failed due to `isGen3Save` being a stub that blocks E2E testing.