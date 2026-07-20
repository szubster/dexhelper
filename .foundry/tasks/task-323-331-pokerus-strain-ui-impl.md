---
id: task-323-331-pokerus-strain-ui-impl
type: TASK
title: Implement Pokerus Strain Detail UI
status: COMPLETED
owner_persona: coder
created_at: '2024-07-18'
updated_at: '2026-07-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-322-323-pokerus-strain-detail-ui
tags:
  - pokerus
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Pokerus Strain Detail UI

## 1. Objective
Update the `PokemonCaughtDetails` component to display the Pokerus strain when a Pokemon has Pokerus.

## 2. Scope
- Modify `src/components/pokemon/details/PokemonCaughtDetails.tsx` to read `p.pokerus` and display its `strain` property if the value exists.
- Ensure the new UI elements strictly follow the tactical hardware aesthetic rules (ADR 024, ADR 008) utilizing the `@utility` primitives when applicable, or explicit `rounded-none`, `border-dashed`, and `font-mono`.
- Update `src/components/pokemon/details/__tests__/PokemonCaughtDetails.test.tsx` to assert that the Pokerus strain is rendered when present.
- The Coder will self-verify this change (Intelligent Verification Protocol) because this is a low-risk, cosmetic UI change. Ensure the tests pass and UI renders correctly via standard testing procedures. Note the verification in the journal.

## 3. Acceptance Criteria
- [x] Render the Pokerus strain number dynamically.
- [x] Add unit tests covering the new strain display.
- [x] Adhere to the Tactical Hardware Aesthetic.
