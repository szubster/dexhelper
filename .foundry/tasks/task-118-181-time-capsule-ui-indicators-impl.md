---
id: task-118-181-time-capsule-ui-indicators-impl
type: TASK
title: Implement Time Capsule UI Indicators
status: READY
owner_persona: coder
created_at: '2026-06-13'
updated_at: '2026-06-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-052-118-time-capsule-ui-indicators
tags:
  - feature
  - gen2
  - trade
  - ui
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Implement Time Capsule UI Indicators

## Objective
Implement UI indicators for Time Capsule readiness in the DexHelper application, explicitly using the core validation logic (Gen 1 species validity and Gen 2 exclusive moves detection).

## Contract
- Create a Time Capsule validation utility (e.g., `src/utils/timeCapsule.ts`) that determines if a Pokémon is eligible for the Time Capsule.
  - A Pokémon is eligible if it is a valid Gen 1 species AND it does not possess any Gen 2 exclusive moves.
  - You MUST use the existing `isGen1Species` (from `src/utils/species.ts`) and `hasGen2ExclusiveMove` (from `src/engine/moves/gen2Moves.ts`) utilities for this logic.
- Update `src/components/StorageGrid.tsx` (and/or `StorageCard` inside it) to display a visual indicator for eligible Pokémon.
  - The indicator should only be active/visible if the currently loaded save file is a Generation 2 save.
  - Apply an aesthetic that matches the "tactical hardware/snooping" theme (ADR 008). For example, a small glowing LED, or a "[ TIME CAPSULE READY ]" badge.
- Update the detailed Pokémon view (`src/components/pokemon/details/PokemonCaughtDetails.tsx` or similar component) to show Time Capsule readiness.
  - If the Pokémon is invalid for the Time Capsule, clearly indicate *why* (e.g., "INVALID: Gen 2 Species" or "INVALID: Gen 2 Exclusive Move(s)").
  - If valid, show a "[ TIME CAPSULE READY ]" status.
- Do not modify architectural constraints or system files unless absolutely necessary.
- Write or update unit tests to verify the UI components correctly display the Time Capsule status based on mock data.
- Ensure any missing types or type errors are corrected, and `pnpm type-check` passes.
- Run `pnpm test` to verify the tests pass.
- Provide explicit integration steps and tests for rendering components if creating new UI components, adhering to the Component Integration Policy.

## Notes for Coder
- If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Time Capsule validation utility implemented and uses `isGen1Species` and `hasGen2ExclusiveMove`.
- [ ] Visual indicator added to the Storage View for Gen 2 saves.
- [ ] Detailed Pokémon view displays Time Capsule status and highlights validation failures.
- [ ] Unit tests implemented and passing.
- [ ] `pnpm type-check` passes.
