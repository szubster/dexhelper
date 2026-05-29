---
id: task-064-142-gen3-strategy-impl
type: TASK
title: Implement Gen 3 Assistant Strategy
status: ACTIVE
owner_persona: coder
created_at: '2026-05-23'
updated_at: '2026-05-29'
depends_on: []
jules_session_id: '11200701881166441865'
parent: task-064-134-encounter-integration-impl
tags:
  - gen3
  - data
  - msgpack
notes: ''
rejection_reason: ''
---

# Implement Gen 3 Assistant Strategy

## Description
Integrate the newly parsed Gen 3 encounter data into the suggestion engine and map graph by implementing the Gen 3 Assistant Strategy.

## Acceptance Criteria
- [ ] `src/engine/exclusives/gen3Exclusives.ts` is created and defines `GEN3_VERSION_EXCLUSIVES` for Ruby, Sapphire, Emerald, FireRed, LeafGreen, and exports `getGen3UnobtainableReason`.
- [ ] `src/engine/assistant/strategies/gen3Strategy.ts` is created and implements the `AssistantStrategy` interface for Gen 3.
- [ ] `src/engine/assistant/strategies/index.ts` is updated to include `gen3Strategy`.
- [ ] Tests are written for `gen3Exclusives.ts` and `gen3Strategy.ts`.

## Technical Blueprint
1. **Create `src/engine/exclusives/gen3Exclusives.ts`**:
   - Define `GEN3_VERSION_EXCLUSIVES` for Ruby, Sapphire, Emerald, FireRed, LeafGreen.
   - Implement and export `getGen3UnobtainableReason(pokemonId, version, ownedCount, ownedSet)`.
2. **Create `src/engine/assistant/strategies/gen3Strategy.ts`**:
   - Implement the `AssistantStrategy` interface for Generation 3.
   - For `resolveMapAid` and `getMapDistance`, delegate to `resolveOutdoorMapId` and `getDistanceToMap` from `../../mapGraph/gen3Graph`.
   - For `getUnobtainableReason`, delegate to `getGen3UnobtainableReason`.
   - Implement `getSpecialSuggestions` for Gen 3 mechanics (e.g. Roamers).
   - Implement `isInternallyObtainable`.
3. **Update `src/engine/assistant/strategies/index.ts`**:
   - Import `gen3Strategy` and add it to the `STRATEGIES` registry for generation `3`.
4. **Update tests**:
   - Write tests for `gen3Exclusives.ts` and `gen3Strategy.ts`.
   - Update `src/engine/assistant/strategies/index.test.ts` to verify `gen3Strategy` is correctly returned.

> **CRITICAL REMINDER TO CODER AND QA PERSONAS**:
> - If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
> - If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
