---
id: task-640-728-migrate-tacticalmodal-impl
type: TASK
title: Migrate TacticalModal Component Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-10-27'
updated_at: '2026-11-01'
depends_on: []
jules_session_id: '4691145740896552705'
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

# Migrate TacticalModal Component Implementation

## Objective
Migrate the `TacticalModal` component from the main application into the `@dexhelper/ui` workspace package.

## Acceptance Criteria
- [x] Move `TacticalModal` source files to `@dexhelper/ui`.
- [x] Update intra-package dependencies to use relative module paths if any.
- [x] Update application-level imports to target the `@dexhelper/ui` package.
- [x] Ensure components are properly integrated into the application's view hierarchy.
- [x] Write/verify unit tests or rendering tests for the component in the workspace package.
