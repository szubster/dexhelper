---
id: idea-005-revert-data-optimizations
type: IDEA
title: Revert Data Format Optimizations (Short Property Names)
status: COMPLETED
owner_persona: product_manager
created_at: '2026-05-20'
updated_at: '2026-05-21'
depends_on: []
jules_session_id: null
rejection_reason: ''
---

# Revert Data Format Optimizations (Short Property Names)

## Context
With the transition to MsgPack (`msgpackr`) and the configuration of highly-efficient decoding options (specifically `useRecords: true` and `bundleStrings: true`), our previous optimizations around making JSON as compact as possible may be obsolete and negatively impacting developer experience (DX).

During PR review, it was noted that MsgPack's `useRecords` extension extracts object structures/keys and passes them as an extension rather than stringifying them repetitively.

## Investigation Results
A benchmark was run to test if short property names (`n`, `cr`, `eto`) are still needed compared to verbose property names (`name`, `captureRate`, `evolvesTo`):
- **Short Props Size:** 20,737 bytes (1,000 mocked pokemon)
- **Long Props Size:** 20,789 bytes (1,000 mocked pokemon)
- **Difference:** Only 52 bytes per 1,000 objects.

Because MsgPack's `useRecords` only encodes the long property strings exactly *once* per structure type in the header, the impact on file size is negligible.

However, for replacing enums/strings with numbers (e.g. `cr: 1` vs `captureRate: 'Grass'`), the size difference is still substantial (20.7 KB vs 34.7 KB), as strings cannot be perfectly deduplicated if they vary or require string bytes vs integer bytes.

## Proposal
Create a task to revert the short property names (e.g., `n`, `cr`, `gr`, `eto`, `det`, `pid`) back to their full, readable names (e.g., `name`, `captureRate`, `group`, `evolvesTo`, `details`, `pokemonId`).
We will keep enum-to-number optimizations, as those still provide significant size reductions.

## Acceptance Criteria
- [x] Investigate exact list of properties to rename.
- [x] Create an EPIC or STORY to refactor the data generation pipeline (`data/`) and runtime interfaces (`PokeDB.ts`, `schema.ts`) to use verbose keys.


## References
- Created PRD: [[prd-005-032-revert-data-optimizations]]
