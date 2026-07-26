---
id: task-323-346-integrate-pokerus-strain-party-view-impl
type: TASK
title: Integrate Pokerus Strain Badge in Party View Implementation
status: READY
owner_persona: coder
created_at: '2026-07-25'
updated_at: '2026-07-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-323-323-integrate-pokerus-strain-party-view
tags:
  - pokerus
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Integrate Pokerus Strain Badge in Party View Implementation

## 1. Objective
Implement the integration of the Pokerus Strain Badge into the StorageGrid component when rendering Pokémon in the Party location.

## 2. Technical Blueprint
- Locate the `StorageCard` component within `src/components/StorageGrid.tsx`.
- Import the `PokerusBadge` component from `src/components/PokerusBadge.tsx`.
- Inside `StorageCard`, check if the `location` is `'Party'`.
- Check if the Pokémon instance (`p`) has the `pokerus` property defined and if its `strain` is greater than 0.
- If both conditions are met, render the `PokerusBadge` component, passing the `strain` value from the `p.pokerus` object.
- Ensure the badge is visually integrated with the `StorageCard`'s layout (e.g., using absolute positioning or inline with other badges like `ShinyBadge` or OT name).
- **Intelligent Verification Protocol:** As this is a UI integration task that involves simple rendering logic with low risk, self-verification by the coder is sufficient. Ensure component integration tests are updated in `src/components/__tests__/StorageGrid.test.tsx`.

## 3. Acceptance Criteria
- [ ] Integrate `PokerusBadge` into the `StorageCard` component for Party Pokémon in `src/components/StorageGrid.tsx`.
- [ ] Extract Pokerus data from the parsed Pokémon structure (`p.pokerus.strain`) and pass it down.
- [ ] Update `src/components/__tests__/StorageGrid.test.tsx` to verify the badge is rendered when appropriate data is provided.