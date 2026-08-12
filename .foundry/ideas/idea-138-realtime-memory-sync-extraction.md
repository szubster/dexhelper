---
id: idea-138-realtime-memory-sync-extraction
type: IDEA
title: Real-Time WebAssembly Memory Sync and Extraction
status: ACTIVE
owner_persona: product_manager
created_at: '2026-08-08'
updated_at: '2026-08-12'
depends_on: []
jules_session_id: '3007686605071408403'
pr_number: null
parent: null
tags:
  - emulator
  - save-engine
  - architecture
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Real-Time WebAssembly Memory Sync and Extraction

## Problem
Even with an embedded emulator, if we only parse save states or wait for in-game saves to occur, we cannot provide turn-by-turn or step-by-step assistance. To be truly reactive, DexHelper must extract game state continuously from active memory (RAM) while the game is running.

## Proposed Solution
Develop a high-performance WebAssembly Memory Bridge between the embedded emulator core and the DexHelper React state store.
1. **Memory Polling & Hooking Engine:** Rather than parsing the entire memory space, map critical RAM offsets (WRAM for GB/GBC, IRAM/EWRAM for GBA) for player coordinate structures, battle state blocks, party data, and event flag banks.
2. **Dynamic Offset Mappings:** Define cross-version memory offset schemas (Red, Blue, Yellow, Gold, Silver, Crystal, Ruby, Sapphire, FireRed, LeafGreen, Emerald) to accurately read state regardless of the active ROM.
3. **State Sync Middleware:** Feed extracted RAM blocks directly into existing save-file parsers (which already understand the binary structures) but adapted to continuous real-time updates.

## Value Proposition
Enables absolute synchrony between gameplay and data overlays without CPU performance impact. This serves as the pipeline enabling all other live features.

## Acceptance Criteria
- [ ] Product Manager: Draft a PRD defining the target RAM offset blocks for Gen 1, Gen 2, and Gen 3, and outline the pub-sub mechanism for the memory bridge.
