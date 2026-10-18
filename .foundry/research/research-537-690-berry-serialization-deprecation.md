---
id: research-537-690-berry-serialization-deprecation
type: RESEARCH
title: Deprecate msgpackr Serialization for Gen 3 Berry Data
status: READY
owner_persona: researcher
created_at: '2026-10-15'
updated_at: '2026-10-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-513-537-gen3-berry-serialization-and-api
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Deprecate msgpackr Serialization for Gen 3 Berry Data

## Context
The parent story originally mandated serializing dynamic berry patch data into the static `msgpackr` payload. This is an architectural anti-pattern since the data is inherently dynamic and generated at runtime per save file.

## Acceptance Criteria
- [x] Document the decision to deprecate the `msgpackr` serialization requirement for Gen 3 Berry Data.
- [x] Propose the new approach for runtime hydration.

## Findings & Recommendations

### 1. Deprecate msgpackr Serialization
As established in `.foundry/docs/adrs/adr-599-638-dynamic-data-hydration.md`, the `PokeData` pipeline (`msgpackr`) is intended solely for static, build-time data (like base stats or item names).
Gen 3 Berry Patch data (e.g., `growthStage`, `minutesUntilNextStage`) is highly dynamic and user-specific, generated at runtime when a `.sav` file is parsed.
Therefore, serializing this dynamic data into the static `pokedata-core.msgpack` payload is an architectural contradiction and this requirement is deprecated.

### 2. Proposed Approach for Runtime Hydration
Parsed dynamic save data (like `Gen3BerryTree` states) must be hydrated directly into the application runtime state manager (e.g., Zustand) or a dedicated runtime IndexedDB wrapper for save files upon loading a save file.
This entirely bypasses the `msgpackr` pipeline and ensures user save data remains safely client-side and ephemeral.
