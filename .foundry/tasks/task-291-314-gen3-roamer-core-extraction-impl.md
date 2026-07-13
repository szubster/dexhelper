---
id: task-291-314-gen3-roamer-core-extraction-impl
type: TASK
title: Gen 3 Roamer Core Extraction Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-07-11'
updated_at: '2026-07-13'
depends_on: []
jules_session_id: '16749667053303794390'
pr_number: null
parent: story-149-291-gen3-roamer-core-extraction
tags:
  - gen3
  - roamer
research_references:
  - .foundry/docs/knowledge_base/gen3_roamer_offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer Core Extraction Implementation

## Objective
Implement base DataView parsing for the Gen 3 Roamer structure in SaveBlock1.

## Description
Develop the core parsing logic to extract the Roamer data block from SaveBlock1. The target schema is defined in `.foundry/docs/knowledge_base/gen3_roamer_offsets.md`.

You need to modify `src/engine/saveParser/parsers/gen3.ts` and `src/engine/saveParser/parsers/gen3.test.ts`.

It seems a preliminary version of `parseGen3Roamer` already exists in `gen3.ts`, but you must ensure it fully conforms to the `Gen3RoamerState` interface defined in the research:
```typescript
export interface Gen3RoamerState {
    isActive: boolean;    // Derived from the 'active' boolean (offset 0x13 in Roamer struct). True if roaming the map.
    speciesId: number;    // The species ID of the roamer (e.g., Latios/Latias in RS/E, Legendary Beast in FRLG).
    level: number;        // Current level of the roamer.
    hp: number;           // Current HP (useful for tracking damage across encounters).
    status: number;       // Status condition (Sleep, Paralysis, etc.).
    personality: number;  // Personality Value (PID).
    ivs: number;          // 32-bit integer containing IVs. Can be unpacked into individual stats.
    cool: number;         // Cool contest stat.
    beauty: number;       // Beauty contest stat.
    cute: number;         // Cute contest stat.
    smart: number;        // Smart contest stat.
    tough: number;        // Tough contest stat.
}
```

The current implementation in `gen3.ts` returns:
```typescript
    return {
      ivs: { hp: ivHp, atk, def, spd, spAtk, spDef },
      personalityValue,
      speciesId,
      hp,
      level,
      statusCondition,
      active,
    };
```
You need to update `parseGen3Roamer` to extract the missing contest stats (cool, beauty, cute, smart, tough) at offsets `0x0E` through `0x12` respectively. Also, adjust the returned object properties to match the required schema exactly (`isActive`, `personality`, and unpacking `ivs` or returning the 32-bit number as requested by the schema, although unpacking is usually preferred - check standard practices in `gen3.ts`). The schema requires `isActive`, `personality`, `status` and the raw 32-bit `ivs` number. Reconcile this with the existing code which unpacks IVs and names fields differently (e.g., `personalityValue`, `active`, `statusCondition`).

Wait, the research schema says:
```typescript
    ivs: number;          // 32-bit integer containing IVs. Can be unpacked into individual stats.
```
But `parseGen3Roamer` currently unpacks them into an object. We should standardize to match the `Gen3RoamerState` type.

Be sure to define constants for the new offsets (cool, beauty, cute, smart, tough).

**CRITICAL REMINDERS FOR CODER:**
1. **Transient Failures:** If you experience a transient failure requiring a retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
2. **Permanent Failures:** If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
3. **Empty PRs:** If you submit an empty PR for a completed task (e.g. if you discover the logic is already correct), you MUST check off all Acceptance Criteria checkboxes before submitting.
4. **Magic Numbers:** When modifying save file parsing, explicitly require that all memory offsets, lengths, bit locations, and shifts MUST be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.

## Acceptance Criteria
- [ ] Ensure `parseGen3Roamer` in `src/engine/saveParser/parsers/gen3.ts` fully implements the `Gen3RoamerState` structure.
- [ ] Define reusable constants at the module level for all new memory offsets (cool, beauty, cute, smart, tough). No inline magic numbers.
- [ ] Ensure the returned object keys exactly match `Gen3RoamerState` (`isActive`, `personality`, `status`, `ivs` as a number, plus the contest stats).
- [ ] Update `src/engine/saveParser/parsers/gen3.test.ts` to reflect the new return shape of `parseGen3Roamer`.
