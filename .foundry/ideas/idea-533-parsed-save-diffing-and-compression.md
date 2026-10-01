---
id: idea-533-parsed-save-diffing-and-compression
type: IDEA
title: Parsed Save Delta Diffing and Memory Compression Framework
status: READY
owner_persona: product_manager
created_at: '2026-10-01'
updated_at: '2026-10-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - save-engine
  - storage
  - performance
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Parsed Save Delta Diffing and Memory Compression Framework

## Problem Statement
As DexHelper expands its save state tracking features (e.g. Save History DB, live session diffing, multi-save comparisons, and time-travel state debugging), storing complete serialized `ParsedSaveData` snapshots in IndexedDB and memory (`SaveHistoryDB`, Zustand state) creates significant storage bloat and main thread garbage collection pressure. During active gameplay or frequent save uploads, snapshotting repetitive 128KB binary save structures or large parsed AST representations consumes megabytes of client-side IndexedDB storage rapidly.

Currently, DexHelper stores full parsed save objects or raw binary buffers for each history entry without calculating RFC-6902 JSON patches or delta diffs between consecutive save states. For long gameplay sessions with hundreds of historical states, this causes IndexedDB quota warnings and slower state hydration times.

## Proposed Solution
Introduce a centralized `SaveDeltaCompressor` utility within `src/engine/storage/` to compute compact delta patches between consecutive save snapshots:

1. **Structural Delta Computing**: Implement JSON patch / RFC-6902 micro-diffing (`diffSaveStates(previous, current)`) specifically tailored for `ParsedSaveData` structures (party updates, box changes, flag mutations, item quantities).
2. **Keyframe-Based Storage Model**: Store a full baseline keyframe snapshot periodically (e.g. every 10th save or upon major version changes) alongside lightweight incremental delta patches for intermediate states in `SaveHistoryDB`.
3. **Transparent Reconstitution Engine**: Update `SaveHistoryDB` retrieval methods (`getSaveAtTimestamp`, `getHistoryRange`) to transparently apply sequential deltas onto the nearest keyframe snapshot, returning fully reconstituted `ParsedSaveData` objects seamlessly to callers.
4. **Automated Delta Compression Benchmarks**: Add unit test coverage and memory footprint benchmarks verifying 80%+ storage footprint reduction in `SaveHistoryDB` across multi-save history chains.

## Value Proposition
- **Storage Efficiency**: Reduces IndexedDB storage footprint for Save History DB by up to 80-90% for active gameplay sessions.
- **Improved Performance & Hydration**: Reduces JSON serialization overhead and IndexedDB read I/O times when fetching historical save chains.
- **Foundation for Session Rewind**: Enables fine-grained UI diffing and timeline scrubbers for live gameplay sessions and save file comparisons.

## Acceptance Criteria
- [ ] Product Manager: Draft a PRD defining the structural schema for keyframe and delta patch records in `SaveHistoryDB`.
