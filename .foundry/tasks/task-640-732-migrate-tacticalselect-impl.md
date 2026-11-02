---
id: task-640-732-migrate-tacticalselect-impl
type: TASK
title: Migrate TacticalSelect Component Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-10-27'
updated_at: '2026-11-02'
depends_on: []
jules_session_id: '13332615611047227249'
pr_number: null
parent: story-527-640-migrate-complex-components
tags:
  - react
  - components
  - ui
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Migrate TacticalSelect Component Implementation

## Objective
Migrate the `TacticalSelect` component from the main application into the `@dexhelper/ui` workspace package.

## Acceptance Criteria
- [x] Move `TacticalSelect` source files to `@dexhelper/ui`.
- [x] Update intra-package dependencies to use relative module paths if any.
- [x] Update application-level imports to target the `@dexhelper/ui` package.
- [x] Ensure components are properly integrated into the application's view hierarchy.
- [x] Write/verify unit tests or rendering tests for the component in the workspace package.
