---
id: idea-531-web-worker-save-parser
type: IDEA
title: Offload Binary Save File Parsing to Web Worker
status: PENDING
owner_persona: product_manager
created_at: '2026-04-20'
updated_at: '2026-04-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - save-engine
  - performance
  - dx
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Offload Binary Save File Parsing to Web Worker

## Problem Statement
Currently, DexHelper executes binary save file parsing (`parseSaveFile`) synchronously on the main browser thread. As DexHelper scales its parsing logic (extracting complex bitwise event flags, Hall of Fame records, Gen 3 PC Box wallpapers, daycare Pokémon, RTC timestamp calculations, and living dex progress across multi-save files), parsing large binary blobs (such as 128KB Gen 3 save files or multi-save comparisons) blocks the main thread UI event loop.

This synchronous parsing causes visible UI micro-stutters, delayed frame renders during save file drag-and-drop / upload, and unresponsive UI elements (such as frozen progress indicators or delayed tab switches) while the DataView buffer parsing and MsgPack deserialization execute.

## Proposed Solution
Offload binary save file parsing to a dedicated Web Worker pipeline:
1. **Worker Engine Pipeline**: Encapsulate `parseSaveFile` and DataView byte manipulations into a background Web Worker (e.g., `src/engine/saveParser/worker/saveParser.worker.ts`).
2. **Transferable Objects**: Pass `ArrayBuffer` save data payloads between the main UI thread and worker thread using `Transferable` objects to eliminate array copying overhead.
3. **Async Hook & Utility**: Create a clean async wrapper hook/utility (`parseSaveFileAsync` / `useSaveParserWorker`) that manages worker instantiation, request/response message correlation via unique request IDs, worker fallback for environments without Web Worker support, and error handling.
4. **Zustand Integration**: Update `useStore`'s `loadSaveFromStorage` and save upload handlers to leverage non-blocking async parsing, keeping the application UI butter-smooth (60fps) during save loading.

## Value Proposition
- **Enhanced UI Responsiveness**: Guarantees zero main thread blocking during save file drops, file picking, and IndexedDB/cloud save rehydration.
- **Scalability**: Sets up a performant asynchronous pipeline capable of handling batch processing for multi-save comparisons, save state history diffing, and future expanded Gen 4/5 save parsing.
- **Developer Experience**: Standardizes async save parsing interfaces across React components and Zustand state managers.

## Acceptance Criteria
- [ ] Implement a Web Worker parser module for `parseSaveFile` using Vite's native Web Worker support and Transferable `ArrayBuffer` objects.
- [ ] Create an asynchronous client interface with graceful fallback to main-thread execution when Web Workers are unavailable or in test environments.
- [ ] Update `useStore` save loading procedures to use non-blocking background parsing.
- [ ] Add unit tests verifying asynchronous Web Worker communication, buffer transfer, and fallback parsing.
