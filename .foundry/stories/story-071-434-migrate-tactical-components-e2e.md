---
id: story-071-434-migrate-tactical-components-e2e
type: STORY
title: E2E Verification for Migrated Tactical Components V2
status: PENDING
owner_persona: tech_lead
created_at: '2026-08-19'
updated_at: '2026-08-23'
depends_on:
  - story-071-431-migrate-tactical-panel
  - story-071-432-migrate-tactical-controls
  - story-071-433-migrate-tactical-segmented
jules_session_id: null
pr_number: null
parent: epic-071-124-migrate-core-tactical-components-v2
tags:
  - e2e
  - integration
  - testing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: E2E Verification for Migrated Tactical Components V2

## Objective
Perform full E2E and visual regression verification for all core tactical UI components refactored to use the new `@utility` classes, ensuring no visual or functional regressions occurred during the migration.

## Scope
1. **Target Components**: All core tactical components that were migrated (e.g., TacticalPanel, TacticalButton, TacticalCard, TacticalInput, TacticalSelect, TacticalBadge, TacticalSegmentedControl, TacticalMultiSelectControl).
2. **Testing**: Write or update Playwright E2E tests and/or Vitest component tests to confirm that these components render correctly with the expected tactical hardware aesthetic styles applied.
3. **Integration**: Ensure they behave correctly within the context of the application where they are used.

## Acceptance Criteria
- [ ] Tests successfully cover and verify the styling and functionality of migrated components.
- [ ] Ensure that E2E integration tests correctly navigate and interact with the elements.
- [ ] Components pass `pnpm run lint`, `pnpm test`, and `xvfb-run pnpm test:e2e`.
- [x] Break down into Tasks
- [ ] task-434-469-tactical-component-tests-basic-impl
- [ ] task-434-470-tactical-component-tests-complex-impl
- [ ] task-434-471-tactical-e2e-integration-tests-impl
- [ ] task-434-472-tactical-components-testing-qa
