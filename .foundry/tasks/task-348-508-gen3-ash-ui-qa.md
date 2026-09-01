---
id: task-348-508-gen3-ash-ui-qa
type: TASK
title: 'Task: QA E2E Testing for Gen 3 Volcanic Ash UI'
status: READY
owner_persona: qa
created_at: '2026-09-01'
updated_at: '2026-09-01'
depends_on:
  - task-348-507-gen3-ash-ui-impl
jules_session_id: null
pr_number: null
parent: story-268-348-gen3-ash-integration
tags:
  - gen3
  - ash
  - qa
  - e2e
research_references: []
rejection_count: 0
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
- [ ] Document the test execution and validation results in the \`qa\` persona journal.
