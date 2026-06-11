---
id: task-095-157-pokerus-byte-parsing-impl
type: TASK
title: Implement Pokerus Byte Parsing
status: ACTIVE
owner_persona: coder
created_at: '2026-06-08'
updated_at: '2026-06-11'
depends_on: []
jules_session_id: '2790675517966690274'
pr_number: null
parent: story-061-095-pokerus-byte-parsing
tags:
  - gen2
  - save-engine
  - pokerus
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Pokerus Byte Parsing

## Description
The Pokerus byte contains information about the strain and the days remaining. We need to parse this raw byte into a structured object within `PokemonInstance`.

The Pokerus byte is an 8-bit integer:
- The upper 4 bits (bits 4-7) represent the strain.
- The lower 4 bits (bits 0-3) represent the days remaining.

We should update `PokemonInstance` in `src/engine/saveParser/parsers/common.ts` to reflect this structured object:
```typescript
pokerus?: {
  strain: number;
  daysRemaining: number;
} | undefined;
```
If the raw byte is 0, the pokemon has no pokerus. If the strain is 0, but the byte is > 0, it means the pokemon has an invalid pokerus, but typically the game handles it. Wait, the strain is upper 4 bits, if strain is > 0, the pokemon has or had pokerus. If daysRemaining > 0, it's contagious. If daysRemaining == 0, it's cured.
Let's parse it as:
```typescript
const pokerus = rawPokerusByte > 0 ? {
  strain: rawPokerusByte >> 4,
  daysRemaining: rawPokerusByte & 0x0F
} : undefined;
```

Update `parseGen2PokemonInstance` in `src/engine/saveParser/parsers/gen2.ts` to parse the raw byte into this object.

## Acceptance Criteria
- [x] Update `PokemonInstance.pokerus` type in `src/engine/saveParser/parsers/common.ts`
- [x] Update `parseGen2PokemonInstance` to parse the pokerus byte into the structured object.

### Critical Contract Reminders
- If you abort or permanently fail a task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
