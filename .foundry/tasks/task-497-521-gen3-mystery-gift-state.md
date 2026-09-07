---
id: task-497-521-gen3-mystery-gift-state
type: TASK
title: Define Gen 3 Mystery Gift State Interface
status: COMPLETED
owner_persona: coder
created_at: '2026-09-02'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-405-497-gen3-e-reader-dashboard-state
tags:
  - gen3
  - state
research_references:
  - .foundry/docs/knowledge_base/gen3_mystery_gift_event_flags.md
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Define Gen 3 Mystery Gift State Interface

## Objective
Define the state structures and data types for the Gen 3 Mystery Gift and E-Reader event flags (such as the Aurora Ticket, MysticTicket, Old Sea Map, and Eon Ticket) within the application's global save data interface.

## Scope
1. In `src/engine/saveParser/parsers/common.ts` (or an appropriate type file), define a new interface (e.g., `Gen3MysteryGift`) that explicitly represents the state of these specific event items and their corresponding ship enablers.
2. Extend the core `Gen3SaveData` interface in `src/engine/saveParser/parsers/common.ts` to include a new property `gen3MysteryGift?: Gen3MysteryGift`.

## Constraints & Architecture
- Only add type definitions; the actual extraction logic will be handled in a separate parser implementation task.
- Ensure the property names are clear and conform to standard `camelCase` naming conventions for boolean flags (e.g., `hasAuroraTicket`, `isBirthIslandEnabled`).
- Read `.foundry/docs/knowledge_base/gen3_mystery_gift_event_flags.md` for context on what properties to define.

## Acceptance Criteria
- [x] `Gen3MysteryGift` interface is defined in `src/engine/saveParser/parsers/common.ts`.
- [x] `Gen3SaveData` interface is updated to include the `gen3MysteryGift` property.
- [x] The build (e.g. `pnpm type-check`) completes without errors.
