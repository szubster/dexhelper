---
id: task-471-628-update-fixture-manifests
type: TASK
title: Update Fixture Manifests
status: CANCELLED
owner_persona: coder
created_at: '2026-09-22'
updated_at: '2026-09-30'
depends_on:
  - task-471-627-verify-and-move-saves
jules_session_id: null
pr_number: null
parent: story-428-471-verify-and-integrate-saves
tags:
  - testing
  - fixtures
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  task-471-627-verify-and-move-saves
notes: ''
locks: []
---

# TASK: Update Fixture Manifests

## Context
The test fixtures have been updated with new save files. We must update any index or manifest files that track these fixtures, as well as ensure the tests correctly load the new fixtures.

## Requirements
1. Update any index/manifest files or tests that load all fixtures.

## Acceptance Criteria
- [ ] Index/manifest files are updated with the new fixture names.
- [ ] Tests load all fixtures, including the newly added ones.
