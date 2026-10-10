---
id: task-522-668-quota-handling-impl
type: TASK
title: Implement graceful IndexedDB quota exceeded handling
status: FAILED
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-399-522-save-state-quota-handling
tags:
  - storage
  - indexeddb
  - history
rejection_count: 0
rejection_reason: '[ACKNOWLEDGED] Session terminated with state: NOT_FOUND'
notes: ''
locks: []
---

# Task: Implement graceful IndexedDB quota exceeded handling

## Overview
Implement error handling in the storage engine (`src/engine/storage/historyDb.ts`) to gracefully handle `DOMException` with the name `QuotaExceededError`. When this error occurs during a write operation (e.g. `writeSaveState`), the system should attempt an aggressive eviction (e.g., deleting older saves beyond the usual LRU limits or clearing half the history) and then retry the write operation.

## Acceptance Criteria
- [ ] Implement `try...catch` around write operations in `src/engine/storage/historyDb.ts` to detect `QuotaExceededError`.
- [ ] On `QuotaExceededError`, trigger an aggressive eviction of older save states for the current playthrough (e.g., delete the oldest 50% of saves).
- [ ] Retry the write operation after eviction.
- [ ] If the retry still fails, ensure the error is handled gracefully without crashing the application (e.g. surface a user-friendly error to the console or fallback mechanism).
- [ ] Write unit tests to verify the quota exceeded handling and aggressive eviction logic.
