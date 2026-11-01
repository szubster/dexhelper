---
id: task-640-730-migrate-tacticalsegmentedcontrol-impl
type: TASK
title: Migrate TacticalSegmentedControl Component Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-10-27'
updated_at: '2026-11-01'
depends_on: []
jules_session_id: '655064300926824832'
pr_number: null
parent: story-527-640-migrate-complex-components
tags:
  - react
  - components
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Migrate TacticalSegmentedControl Component Implementation

## Objective
Migrate the `TacticalSegmentedControl` component from the main application into the `@dexhelper/ui` workspace package.

## Acceptance Criteria
- [ ] Move `TacticalSegmentedControl` source files to `@dexhelper/ui`.
- [ ] Update intra-package dependencies to use relative module paths if any.
- [ ] Update application-level imports to target the `@dexhelper/ui` package.
- [ ] Ensure components are properly integrated into the application's view hierarchy.
- [ ] Write/verify unit tests or rendering tests for the component in the workspace package.
