---
id: task-522-669-quota-handling-qa
type: TASK
title: QA Verification for Quota Exceeded Handling
status: PENDING
owner_persona: qa
created_at: '2026-10-07'
updated_at: '2026-10-07'
depends_on:
  - task-522-668-quota-handling-impl
jules_session_id: null
pr_number: null
parent: story-399-522-save-state-quota-handling
tags:
  - storage
  - indexeddb
  - history
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: QA Verification for Quota Exceeded Handling

## Overview
Verify the Coder's implementation of the quota exceeded error handling and aggressive eviction in `src/engine/storage/historyDb.ts`.

## Acceptance Criteria
- [ ] Verify that `writeSaveState` correctly detects `QuotaExceededError`.
- [ ] Verify that an aggressive eviction mechanism is triggered upon encountering the error, correctly removing a significant portion of older saves.
- [ ] Verify that the write operation is retried successfully after eviction.
- [ ] Verify that if the retry fails, the application does not crash and the error is handled gracefully.
- [ ] Verify that comprehensive unit tests are provided by the Coder and that they mock the `QuotaExceededError` scenario accurately.
- [ ] Verify there are no regressions in standard `writeSaveState` behavior under normal (non-quota-exceeded) conditions.
