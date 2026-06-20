---
id: task-139-209-individual-contest-ribbons-impl
type: TASK
title: Implement Individual Contest Ribbons Integration
status: READY
owner_persona: coder
created_at: '2026-06-16'
updated_at: '2026-06-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-065-139-individual-contest-ribbons-ui
tags:
  - feature
  - gen3
  - contests
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Individual Contest Ribbons Integration

## Context
This task implements the UI integration required for `story-065-139-individual-contest-ribbons-ui`. We need to display the Contest Ribbons a Pokémon has earned in the `PokemonCaughtDetails` view.

## Requirements
1. Implement a new component (e.g. `ContestRibbonsPanel`) that uses the existing `ContestRibbonBadge` component to render all ribbons a Pokémon has earned.
2. Integrate `ContestRibbonsPanel` into `PokemonCaughtDetails.tsx` (found in `src/components/pokemon/details/`). It should only render for Gen 3 Pokémon (or when `p.ribbons` is defined).

## Architectural Scaffolding
- The `PokemonInstance` object has an optional `ribbons` property of type `Gen3Ribbons`, which contains the ranks (0-4) for each condition (`cool`, `beauty`, `cute`, `smart`, `tough`).
- A value of `0` means no ribbon was earned for that condition category. Do not render a badge for `0`.
- The `ContestRibbonBadge` component expects a `ContestRibbonRank` string (`'Normal' | 'Super' | 'Hyper' | 'Master'`).
- You must map the numeric ranks to these strings:
  - `1` -> `'Normal'`
  - `2` -> `'Super'`
  - `3` -> `'Hyper'`
  - `4` -> `'Master'`
- Group these badges nicely using a `TacticalPanel` (or similar section grouping) next to the other stats (e.g. Contest Condition Stats, Sheen).

## Contract
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Create a `ContestRibbonsPanel` component to wrap and display the earned ribbons.
- [ ] Correctly map numeric ribbon values (1-4) to their string equivalents.
- [ ] Integrate the ribbon display into `PokemonCaughtDetails.tsx` when `p.ribbons` is present.
- [ ] Add rendering tests (e.g., using Vitest/Playwright) to verify the integration.
