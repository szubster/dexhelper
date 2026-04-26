---
id: task-026-044-remove-localstorage-sync
type: TASK
title: "Remove LocalStorage Sync Logic"
status: PENDING
owner_persona: "coder"
created_at: "2026-04-26"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: null
parent: .foundry/stories/story-014-026-refactor-state-store-sync.md
tags: ["state", "store", "indexeddb"]
---

# Remove LocalStorage Sync Logic

## Context
As part of the State Store Sync refactor, we are removing the `localStorage` syncing logic and Base64 encoding/decoding from `src/store.ts`. This was deprecated in favor of a different syncing approach.

## Acceptance Criteria
- Remove `loadSaveFromStorage` action and its type definition from `src/store.ts`.
- Remove the `useEffect` hook in `src/routes/__root.tsx` that triggers `loadSaveFromStorage` on mount.
- Remove all related test cases for `loadSaveFromStorage` and base64 logic from `src/store.test.ts`.
- Ensure tests still pass. This is a low-risk deletion, so self-verification is sufficient.
