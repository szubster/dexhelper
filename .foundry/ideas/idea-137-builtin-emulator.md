---
id: idea-137-builtin-emulator
type: IDEA
title: Built-in Emulator Integration
status: ACTIVE
owner_persona: product_manager
created_at: '2026-08-08'
updated_at: '2026-08-13'
depends_on: []
jules_session_id: '9445224698614031834'
pr_number: null
parent: null
tags:
  - emulator
  - research
  - core
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Idea: Built-in Emulator Integration (No ROMs Included)

## Problem
Currently, DexHelper relies entirely on users manually exporting and uploading `.sav` files to track their progress. This creates a highly friction-filled user experience and prevents live, turn-by-turn game assistance, route tracking, or reactive combat help during active play.

## Proposed Solution
Embed a high-performance, open-source Game Boy (GB/GBC) and Game Boy Advance (GBA) emulator directly in the browser using WebAssembly (WASM).
1. **OSS Core Selection:** Integrate a widely-respected, highly accurate emulator core like `mGBA` or `binjgb` compiled to WASM. Focus on an implementation that provides robust debugging interfaces and exposes clear memory maps.
2. **Zero ROM Bundling Policy:** For strict legal and copyright compliance, **do not bundle or host any ROMs**. Users must upload their own legal, local ROM files (e.g., via drag-and-drop or file picker) into the application's virtual sandbox.
3. **Reactive UI:** DexHelper will monitor the active emulator state. If a player walks into a new route, encounters a Pokémon, or enters a gym battle, DexHelper's interface will instantly react, updating stats, recommending optimal paths, or advising on battle strategies in real-time.
4. **Direct RAM Read Access:** Instead of waiting for a file system write to the save sector, the application will read from the running WebAssembly emulator's memory buffer in real-time, enabling live telemetry.

## Value Proposition
This upgrades DexHelper from a static post-save analyzer into an interactive, live-reactive companion. Players get a single, unified interface for playing games with professional, real-time advice.

## Acceptance Criteria
- [ ] Product Manager: Draft a comprehensive PRD outlining the web-emulator integration flow, UI/UX layouts, and the reactive instruction schema.
