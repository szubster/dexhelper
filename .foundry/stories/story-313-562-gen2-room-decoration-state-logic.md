---
id: story-313-562-gen2-room-decoration-state-logic
type: STORY
title: Gen 2 Room Decoration State Logic
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-09-10'
updated_at: '2026-10-12'
depends_on: []
jules_session_id: null
parent: epic-112-313-gen2-room-decoration-viewer-ui
rejection_reason: ''
locks: []
---

# Story: Gen 2 Room Decoration State Logic

## Overview
Implement the React state logic and hooks to expose the parsed Gen 2 room decoration data to the UI components. This includes mapping the raw boolean flags to their corresponding decoration categories (Beds, Plants, Posters, Consoles, Ornaments, Dolls) and identifying Mystery Gift exclusives.

## Requirements
- Create custom hooks (e.g., `useGen2RoomDecorations`) to access decoration data from the global store.
- Group the decorations by category based on the save data extraction structure.
- Provide a clear way to identify which unlocked decorations are Mystery Gift exclusives.

## Acceptance Criteria
- [x] Break down into Tasks
- [x] task-562-578-gen2-room-decoration-types
- [x] task-562-579-gen2-room-decoration-hook
- [x] task-562-580-gen2-room-decoration-hook-tests
- [x] task-562-581-gen2-room-decoration-logic-qa
