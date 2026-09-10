---
id: story-313-562-gen2-room-decoration-state-logic
type: STORY
title: Gen 2 Room Decoration State Logic
status: PENDING
owner_persona: tech_lead
parent: epic-112-313-gen2-room-decoration-viewer-ui
---

# Story: Gen 2 Room Decoration State Logic

## Overview
Implement the React state logic and hooks to expose the parsed Gen 2 room decoration data to the UI components. This includes mapping the raw boolean flags to their corresponding decoration categories (Beds, Plants, Posters, Consoles, Ornaments, Dolls) and identifying Mystery Gift exclusives.

## Requirements
- Create custom hooks (e.g., `useGen2RoomDecorations`) to access decoration data from the global store.
- Group the decorations by category based on the save data extraction structure.
- Provide a clear way to identify which unlocked decorations are Mystery Gift exclusives.

## Acceptance Criteria
- [ ] Break down into Tasks
