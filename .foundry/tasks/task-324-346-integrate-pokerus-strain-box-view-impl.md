---
id: task-324-346-integrate-pokerus-strain-box-view-impl
type: TASK
title: Integrate Pokerus Strain Badge in Box View Impl
status: ACTIVE
owner_persona: coder
created_at: '2026-07-25'
updated_at: '2026-08-01'
depends_on: []
jules_session_id: '8541221980582332310'
pr_number: null
parent: story-323-324-integrate-pokerus-strain-box-view
tags:
  - pokerus
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Integrate Pokerus Strain Badge in Box View Impl

## 1. Objective
Integrate the `PokerusBadge` component into the PC Box storage grid component (`src/components/StorageGrid.tsx`) to visually display the Pokerus strain for each Pokemon.

## 2. Scope
- Modify the `StorageCard` component within `src/components/StorageGrid.tsx`.
- Import and render the `PokerusBadge` component.
- Pass the appropriate strain ID/value (e.g., `p.pokerus?.strain`) as a prop to the `PokerusBadge`. Ensure the badge only renders when Pokerus data is present and the strain is active.
- Ensure the badge aligns correctly within the dense PC UI, adhering to the tactical design constraints.
- The Coder will self-verify this UI integration as per the Intelligent Verification Protocol for simple UI tasks.

## 3. Acceptance Criteria
- [ ] Coder: Integrate `PokerusBadge` into the `StorageCard` component within `src/components/StorageGrid.tsx`.
- [ ] Coder: Self-verify the integration and log findings in `.foundry/journals/coder/<session_id>.md`.
