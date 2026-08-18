---
id: task-362-416-refactor-savedata-type-qa
type: TASK
title: Verify SaveData Type Refactor
status: ACTIVE
owner_persona: qa
created_at: '2026-08-10'
updated_at: '2026-08-18'
depends_on:
  - task-362-415-refactor-savedata-type-impl
jules_session_id: '7135923792955239708'
pr_number: null
parent: story-404-362-refactor-savedata-type
tags:
  - savedata
  - typescript
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Verify SaveData Type Refactor

## Description
Verify the implementation of the `SaveData` type refactor in `src/engine/saveParser/parsers/common.ts`. Ensure the discriminated union correctly enforces type safety and that downstream consumers properly handle generation-specific properties without non-null assertions or optional chaining when inappropriate.

## Acceptance Criteria
- [ ] Verify `SaveData` is refactored into a discriminated union.
- [ ] Verify core parser functions return specific generation types.
- [ ] Verify downstream consumers use proper type guards.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
