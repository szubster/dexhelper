---
id: task-471-639-update-fixture-manifests-retry
type: TASK
title: Update Fixture Manifests
status: ACTIVE
owner_persona: coder
created_at: '2026-09-30'
updated_at: '2026-10-03'
depends_on:
  - task-471-638-verify-and-move-saves-retry
jules_session_id: '16202383115043071156'
pr_number: null
parent: story-428-471-verify-and-integrate-saves
tags:
  - testing
  - fixtures
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# TASK: Update Fixture Manifests

## Context
The test fixtures have been updated with new save files. We must update any index or manifest files that track these fixtures, as well as ensure the tests correctly load the new fixtures.

## Requirements
1. Update any index/manifest files or tests that load all fixtures.

## Acceptance Criteria
- [x] Index/manifest files are updated with the new fixture names.
- [x] Tests load all fixtures, including the newly added ones.
