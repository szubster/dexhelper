---
id: task-432-484-r2-conflict-resolution-prompt-e2e-impl
type: TASK
title: Implement R2 Conflict Resolution Prompt E2E Tests
status: COMPLETED
owner_persona: coder
created_at: '2026-08-24'
updated_at: '2026-08-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-412-432-r2-conflict-resolution-prompt-e2e
tags:
  - e2e
  - integration
  - tests
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement R2 Conflict Resolution Prompt E2E Tests

## Objective
Implement E2E testing to verify the UI behavior of the R2 Conflict Resolution modal under conflict scenarios.

## Context
A conflict resolution UI (`ConflictResolutionModal`) has been implemented to handle situations where a newer cloud save conflicts with a local save. We need to verify through E2E tests that the modal displays the correct metadata and that the "Keep Local" and "Pull Remote" choices correctly resolve the conflict state via the `resolveConflict` action.

## Requirements
1. Add E2E tests for the conflict resolution modal in `tests/e2e/r2_sync.spec.ts` (or a dedicated file if deemed appropriate, but `r2_sync.spec.ts` currently handles R2 sync tests).
2. The tests should simulate a conflict state. The easiest way is to use `page.evaluate()` to call `useStore.getState().setConflictState({...})` with mocked local and remote metadata to force the UI into the conflict state without needing to trigger a full mock R2 API upload/download conflict scenario.
3. Test that the "Save File Conflict" modal becomes visible.
4. Test that the modal correctly displays conflict metadata (such as the prompt text and timestamps if available).
5. Test the "Keep Local" functionality: clicking the corresponding button should trigger the local resolution path and dismiss the modal.
6. Test the "Pull Remote" functionality: clicking the corresponding button should trigger the remote resolution path and dismiss the modal.

## Acceptance Criteria
- [x] Add an E2E test verifying the Conflict Resolution Prompt appears and metadata is presented.
- [x] Add an E2E test verifying the "Keep Local" choice successfully resolves the conflict.
- [x] Add an E2E test verifying the "Pull Remote" choice successfully resolves the conflict.
