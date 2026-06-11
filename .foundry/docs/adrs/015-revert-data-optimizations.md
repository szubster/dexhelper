---
id: adr-015-revert-data-optimizations
type: ADR
title: 'ADR 015: Revert Data Format Optimizations (Short Property Names)'
status: COMPLETED
owner_persona: architect
created_at: '2026-05-21'
updated_at: '2026-05-21'
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
# ADR 015: Revert Data Format Optimizations (Short Property Names)

## Date
2026-05-21

## Status
Accepted

## Context
With the transition to MsgPack (`msgpackr`) and the configuration of highly-efficient decoding options (specifically `useRecords: true` and `bundleStrings: true`), our previous optimizations around making JSON as compact as possible may be obsolete and negatively impacting developer experience (DX).

MsgPack's `useRecords` extension extracts object structures/keys and passes them as an extension rather than stringifying them repetitively. This makes short property names largely redundant in terms of size optimization. A recent benchmark confirmed that long property strings differ by only 52 bytes per 1,000 objects.

## Decision
We will revert the short property names back to their full, readable names across the application (`PokeDB.ts`, `schema.ts`, `scripts/generate-pokedata.ts`, etc.) to improve Developer Experience (DX) while maintaining enum-to-number optimizations (which still provide significant size reductions as strings cannot be perfectly deduplicated).

## Consequences
- **Positive:** Improved readability and DX. Developers will no longer need to map obscure short keys (e.g., `n` to `name`, `cr` to `captureRate`) back to their logical meanings.
- **Negative:** Negligible increase in serialized payload size, estimated at ~52 bytes per 1,000 objects.
- **Constraints:** The data generation pipeline and runtime hydration interfaces must be refactored to use the verbose keys. The application must still work correctly with MsgPack `useRecords: true`. Enum-to-number optimizations must be preserved.
