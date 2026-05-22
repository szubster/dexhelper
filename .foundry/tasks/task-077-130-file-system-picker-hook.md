---
id: task-077-130-file-system-picker-hook
type: TASK
title: Implement File System Access Hook
status: PENDING
owner_persona: coder
created_at: '2026-05-22'
updated_at: '2026-05-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-041-077-file-system-access-idb
tags:
  - feature
  - local-sync
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement File System Access Hook

## Description
Implement a React hook (e.g., `useFileSystemAccess`) or controller to obtain a read-only `FileSystemFileHandle` using the Web File System Access API's `window.showOpenFilePicker`. The implementation should request read-only access and gracefully handle errors such as user cancellation or lack of browser support.

## Acceptance Criteria
- [ ] A React hook or utility is created to trigger `window.showOpenFilePicker` for read-only access.
- [ ] The hook correctly handles user cancellation without throwing unhandled application errors.
- [ ] The implementation gracefully degrades or returns an appropriate error/status if the browser does not support the File System Access API.
- [ ] Tests are written to ensure the correct behavior of the hook (mocking `window.showOpenFilePicker`).
