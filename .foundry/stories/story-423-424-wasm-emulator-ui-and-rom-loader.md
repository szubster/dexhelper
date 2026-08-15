---
id: story-423-424-wasm-emulator-ui-and-rom-loader
type: STORY
title: WASM Emulator UI and ROM Loader
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-14'
updated_at: '2026-08-15'
depends_on: []
jules_session_id: '688815083985622894'
pr_number: null
parent: epic-343-423-wasm-emulator-integration
tags:
  - emulator
  - wasm
rejection_count: 0
rejection_reason: ''
notes: ''
---

# WASM Emulator UI and ROM Loader

## Context
Implement the UI for the emulator and ROM loading via local file picker or drag-and-drop. ROMs must be securely stored in the browser's persistent storage (IndexedDB/LocalStorage) and never transmitted over the network.

## Acceptance Criteria
- [ ] Implement UI for the emulator and ROM loader.
- [ ] Save the ROM in IndexedDB/LocalStorage.
- [ ] Break down this STORY into TASK nodes.
