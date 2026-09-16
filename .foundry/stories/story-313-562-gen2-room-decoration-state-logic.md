---
id: story-313-562-gen2-room-decoration-state-logic
type: STORY
title: Gen 2 Room Decoration State Logic
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-10'
updated_at: '2026-09-14'
depends_on: []
jules_session_id: '12503827369404813925'
parent: epic-112-313-gen2-room-decoration-viewer-ui
locks: []
rejection_reason: ''
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
- [ ] task-562-578-gen2-room-decoration-types
- [ ] task-562-579-gen2-room-decoration-hook
- [ ] task-562-580-gen2-room-decoration-hook-tests
- [ ] task-562-581-gen2-room-decoration-logic-qa
