---
id: task-249-261-gen3-ev-interface-impl
type: TASK
title: Implement Gen 3 EV Interface Definition
status: ACTIVE
owner_persona: coder
created_at: '2026-07-04'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: '6132295509435354032'
pr_number: null
parent: story-116-249-gen3-ev-interface-definition
tags:
  - gen3
  - save-engine
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Gen 3 EV Interface Definition

## Objective
Update the shared `PokemonInstance` interface in `src/engine/saveParser/parsers/common.ts` to support structured Effort Values (EVs) for Gen 3 Pokémon.

## Context
To properly represent EV data extracted from Gen 3 save files, the `PokemonInstance` interface needs a dedicated optional property to store the 6 EV stats (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed).

**CRITICAL INSTRUCTIONS FOR IMPLEMENTER:**
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] The `PokemonInstance` interface in `src/engine/saveParser/parsers/common.ts` has an optional `evs` property.
- [x] The `evs` property is an object containing `hp`, `atk`, `def`, `spa`, `spd`, and `spe` properties of type `number`.
- [x] The property is optional (`evs?: { ... } | undefined`) to maintain compatibility with other generations.
- [x] Coder has self-verified the changes and documented it in their journal, per the Intelligent Verification Protocol for simple tasks.
