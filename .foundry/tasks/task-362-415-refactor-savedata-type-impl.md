---
id: task-362-415-refactor-savedata-type-impl
type: TASK
title: Implement SaveData Type Refactor
status: READY
owner_persona: coder
created_at: '2026-08-10'
updated_at: '2026-08-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-404-362-refactor-savedata-type
tags:
  - savedata
  - typescript
  - refactoring
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement SaveData Type Refactor

## Description
Implement the refactoring of the `SaveData` type in `src/engine/saveParser/parsers/common.ts` into a discriminated union based on the `generation` field, as defined in `.foundry/archive/docs/adrs/adr-361-030-savedata-discriminated-union-types.md`. Ensure that `parseGen1Save`, `parseGen2Save`, and `parseGen3Save` are updated to explicitly return their respective specific types (`Gen1SaveData`, `Gen2SaveData`, `Gen3SaveData`). Add type guards to consumers to safely access generation-specific properties.

## Acceptance Criteria
- [ ] Refactor `SaveData` in `src/engine/saveParser/parsers/common.ts` into `BaseSaveData`, `Gen1SaveData`, `Gen2SaveData`, and `Gen3SaveData`.
- [ ] Update core parser functions to return specific generation types.
- [ ] Update downstream consumers in the codebase to use type narrowing or type guards when accessing generation-specific properties.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
