---
id: prd-140-342-automated-location-tracking-and-checklist-sync
type: PRD
title: Automated Location Tracking and Checklist Sync
status: PENDING
owner_persona: epic_planner
created_at: 2026-08-12
updated_at: 2026-08-12
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-140-auto-checklist-location-tracker
tags:
  - emulator
  - map
  - checklist
rejection_count: 0
rejection_reason: ""
notes: ""
---

# PRD: Automated Location Tracking and Checklist Sync

## Goal
Automatically track player progress and update the checklist using memory parsing instead of requiring the player to manually check off items. This encompasses three major pillars:
1. **Coordinate Mapping and Auto-Panning:** Mapping in-game player X/Y coordinates and Map ID to DexHelper Map UI to highlight exact player positioning.
2. **Event Flag Mappers:** Bridging the bitwise event flags in emulator memory (hidden items, trainers defeated) directly to DexHelper checkable states.
3. **Auto-Nuzlocke Logger:** Detecting wild encounter battles in-game and logging the species/location directly into the Nuzlocke Database.

## Scope
### 1. Map Coordinates and ID Sync
The emulator memory should be polled periodically. We need an API layer that extracts:
- Current Map Group and Map ID.
- Player's X and Y coordinates.

This extracted data will trigger an automatic map zoom and pan on the Map UI so the user always knows where they are relative to the larger Pokemon World Map.

### 2. Event Flag Tracker
Each event flag in Pokémon corresponds to a specific bit in a large boolean array inside the save state RAM. The architecture must map known flags (e.g., hidden item collected, specific trainer defeated) to UI components.
- When an event flag changes to `true` (bit flipped to 1), the corresponding item on the user's active Route or Trainer Checklist should be automatically checked off.
- The system must ensure this doesn't conflict with any manual checks, or provide a toggle to disable auto-tracking if the player prefers manual control.

### 3. Auto-Nuzlocke Encounter Logger
Identify the RAM offset that indicates the start of a wild battle and the species of the wild Pokémon.
- When a new wild encounter begins, read the species data.
- Read the current Map ID to determine the location.
- Automatically insert a new row in the user's Nuzlocke Encounter tracker marking the species as encountered for that location.

## Technical Constraints & Guidelines
- Follow **Section 13 ("Save File Parsing & Extraction Guidelines")** of `.foundry/docs/schema.md` when interacting with emulator save blocks and memory mapping. Use relative offsets for Gen 3 memory. No magic numbers inline. Catch `RangeError` with a standard message.
- Provide a robust mechanism for polling memory that does not hang or bottleneck the main thread (Web Worker pattern is suggested but will be defined in Epic/ADRs).

## Acceptance Criteria
- [ ] Epic Planner: Break down the PRD into Epic blocks (e.g. Memory Polling Infra, UI Map Auto-Panning, Checklist State Mapping).
- [ ] Architect: A follow-up ADR may be required to decide the architecture for polling the event flag bit arrays.
