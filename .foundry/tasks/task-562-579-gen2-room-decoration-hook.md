---
id: task-562-579-gen2-room-decoration-hook
type: TASK
title: Gen 2 Room Decoration Hook Implementation
status: READY
owner_persona: coder
created_at: '2026-09-14'
updated_at: '2026-09-14'
depends_on:
  - task-562-578-gen2-room-decoration-types
jules_session_id: null
parent: story-313-562-gen2-room-decoration-state-logic
locks: []
rejection_reason: ''
---

# Task: Gen 2 Room Decoration Hook Implementation

## Overview
Implement the React state logic and `useGen2RoomDecorations` hook to expose the parsed Gen 2 room decoration data to the UI components.

## Requirements
- Create a `src/hooks/gen2/useGen2RoomDecorations.ts` hook.
- Implement logic to group unlocked decorations into categories (Beds, Plants, Posters, Consoles, Ornaments, Dolls) based on `src/engine/data/gen2/decorations.ts`.
- Identify Mystery Gift exclusive decorations (dolls IDs 22 to 43) and set `isMysteryGift`.
- Ensure the hook returns active and unlocked decorations.

## Acceptance Criteria
- [ ] `useGen2RoomDecorations` hook is implemented.
- [ ] Decorations are categorized correctly.
- [ ] Mystery Gift exclusive decorations are identified.
