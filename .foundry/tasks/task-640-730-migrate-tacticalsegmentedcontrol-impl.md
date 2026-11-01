---
id: task-640-730-migrate-tacticalsegmentedcontrol-impl
type: TASK
title: Migrate TacticalSegmentedControl Component Implementation
status: READY
owner_persona: coder
created_at: '2026-10-27'
updated_at: '2026-10-27'
depends_on: []
jules_session_id: null
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
- [x] Move `TacticalSegmentedControl` source files to `@dexhelper/ui`.
- [x] Update intra-package dependencies to use relative module paths if any.
- [x] Update application-level imports to target the `@dexhelper/ui` package.
- [x] Ensure components are properly integrated into the application's view hierarchy.
- [x] Write/verify unit tests or rendering tests for the component in the workspace package.
