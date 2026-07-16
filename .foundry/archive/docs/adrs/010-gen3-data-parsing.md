---
id: adr-010-gen3-data-parsing
type: ADR
title: 'ADR 010: Gen3 Data Parsing Strategy'
status: COMPLETED
owner_persona: architect
created_at: '2026-05-15'
updated_at: '2026-05-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# ADR 010: Gen3 Data Parsing Strategy

## Status
Accepted

## Context
As part of the Gen3 support expansion (Ruby, Sapphire, Emerald, FireRed, LeafGreen), we need to handle parsing save files that have different internal structures compared to Gen 1 and Gen 2. Previous generations recently migrated from `Uint8Array` to `DataView` for robustness and native bounds checking (as documented in `save_parser/dataview_migration.md`). The Gen3 data parsing must align with this architectural pattern to maintain system-wide consistency, safety against corrupted files, and long-term maintainability.

## Decision
1. **Mandate `DataView` API**: All new Gen3 save parsing logic MUST exclusively use the native `DataView` API (e.g., `getUint8`, `getUint16`, `getUint32`) rather than raw `Uint8Array` manipulations.
2. **Bounds Checking & Graceful Failures**: The parser must rely on `DataView` to throw `RangeError` on out-of-bounds reads. These must be caught explicitly by the parser engine, and gracefully propagated up as specific validation errors (e.g., "Corrupted Save File"), rather than crashing the application or returning malformed data.
3. **Backwards Compatibility**: Implement the Gen3 parsing handlers alongside the existing Gen 1 and Gen 2 handlers without altering the legacy parsing interfaces. This ensures the backwards compatibility mandated by PRD 053-022.

## Consequences
- **Positive**: Prevents silent failures and corrupted data rendering when parsing truncated or malformed Gen3 save files.
- **Positive**: Maintains architectural consistency with the rest of the parsing engine, reducing technical debt.
- **Negative**: The `DataView` API can be slightly more verbose to write than raw array access, but this is an acceptable trade-off for safety.
