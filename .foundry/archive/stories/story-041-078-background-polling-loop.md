---
id: story-041-078-background-polling-loop
type: STORY
title: Background Polling Loop & State Hydration
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-05-21'
updated_at: '2026-05-22'
depends_on:
  - story-041-077-file-system-access-idb
jules_session_id: null
pr_number: null
parent: epic-033-041-emulator-auto-sync
tags:
  - feature
  - background-sync
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Background Polling Loop & State Hydration

## Requirements
- [x] Set up a background polling loop (checking `lastModified` on the file) to detect file changes from the emulator at a sensible interval.
- [x] When a change is detected, read the file as an `ArrayBuffer`.
- [x] Pass the raw `ArrayBuffer` to DexHelper's existing parsing engine.
- [x] Hydrate the global application state to provide a "Live Tracker" experience.

## Children
- [task-078-134-implement-polling-loop](../tasks/task-078-134-implement-polling-loop.md)
- [task-078-135-qa-polling-loop](../tasks/task-078-135-qa-polling-loop.md)
