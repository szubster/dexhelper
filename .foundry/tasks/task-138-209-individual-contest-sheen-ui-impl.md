---
id: task-138-209-individual-contest-sheen-ui-impl
type: TASK
title: Implement Contest Sheen UI Integration
status: READY
owner_persona: coder
created_at: '2026-06-19'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-065-138-individual-contest-sheen-ui
tags:
  - feature
  - gen3
  - contests
  - ui
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Task: Implement Contest Sheen UI Integration

## 1. Context
This task integrates the `ContestSheenDisplay` component into the detailed Pokémon view (`PokemonCaughtDetails.tsx`) to display a Pokémon's Sheen value when applicable (Generation 3).

## 2. Technical Blueprint
- **File**: `src/components/pokemon/details/PokemonCaughtDetails.tsx`
- **Instructions**:
  - Import `ContestSheenDisplay` from `./ContestSheenDisplay`.
  - Inside the rendering map for each Pokémon instance (`yourPokemon.map`), check if the `generation` is `3` and if the Pokémon instance (`p`) has a `condition` object (`p.condition`).
  - If the conditions are met, render the `ContestSheenDisplay` component.
  - Pass `p.condition.sheen` as the `sheen` prop to the `ContestSheenDisplay`.
  - Position the display appropriately within the `TacticalPanel`, likely as a new block after the caught data/origin point.

- **File**: `src/components/pokemon/details/__tests__/PokemonCaughtDetails.test.tsx`
- **Instructions**:
  - Update the tests to verify that the `ContestSheenDisplay` renders correctly when a Gen 3 Pokémon has contest condition stats.
  - You can spy on or mock `ContestSheenDisplay` if needed, or simply assert on the text/bar output.

## 3. Important Reminders for Coder & QA Personas
- **Transient Failures**: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures**: If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Policy**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting. Do not modify the YAML frontmatter on successful completion.

## 4. Acceptance Criteria
- [ ] Integrate `ContestSheenDisplay` into `PokemonCaughtDetails.tsx` for Gen 3 Pokémon with condition stats.
- [ ] Ensure the component renders beautifully and fits the tactical UI aesthetic.
- [ ] Add tests to verify the integration.
