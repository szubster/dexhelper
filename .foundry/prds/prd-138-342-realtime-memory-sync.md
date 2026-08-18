---
id: prd-138-342-realtime-memory-sync
type: PRD
title: Real-Time WebAssembly Memory Sync and Extraction
status: PENDING
owner_persona: epic_planner
created_at: '2026-08-12'
updated_at: '2026-08-12'
depends_on:
  - idea-137-builtin-emulator
jules_session_id: null
pr_number: null
parent: idea-138-realtime-memory-sync-extraction
tags:
  - emulator
  - save-engine
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Real-Time WebAssembly Memory Sync and Extraction

## Objective
Develop a high-performance WebAssembly Memory Bridge between the embedded emulator core and the DexHelper React state store to extract active memory (RAM) continuously while the game runs. This will enable real-time, turn-by-turn/step-by-step assistance by keeping DexHelper perfectly synchronized with gameplay.

## Target Offset Blocks

### Gen 1 (WRAM)
- Player coordinates (X, Y, Map ID)
- Current Battle State (Enemy Pokemon, HP, Status)
- Event flags (Item pickups, story progression)
- Active Party Data

### Gen 2 (WRAM)
- Player coordinates (X, Y, Map ID)
- Current Battle State
- Event flags (Roamer active, time of day)
- Active Party Data

### Gen 3 (IRAM/EWRAM)
- Player coordinates (X, Y, Map ID)
- Current Battle State
- Event flags (Roamer location, Swarms, Weather)
- Active Party Data

## Pub-Sub Mechanism

1.  **Memory Polling Engine:** A lightweight loop in the emulator wrapper that reads the mapped offset blocks at a fixed interval (e.g., once per frame or once every X frames).
2.  **State Sync Middleware:** Extracted RAM blocks are fed into our existing save file parsing logic (which will be adapted to read continuous chunks instead of a full save payload).
3.  **Event Emitter / React Context:** A global React Context (e.g., `LiveMemoryContext`) acts as the publisher. Changes detected in the RAM chunks trigger state updates.
4.  **Subscribers:** UI overlays and assistant tools (e.g., active route guide, battle helper) subscribe to the Context and re-render reactively when the game state changes.

## Constraints
- **Performance:** Reading memory must not impact emulator framerate.
- **Cross-Version Support:** Use dynamic offset mappings for different ROM versions (Red, Blue, Yellow, Gold, Silver, Crystal, Ruby, Sapphire, FireRed, LeafGreen, Emerald).
- **Architecture:** Keep memory extraction strictly decoupled from UI rendering.

## Acceptance Criteria
- [ ] Epic Planner: Break this PRD down into actionable Epics.
