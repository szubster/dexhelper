---
id: task-142-249-gen3-contest-data-mapping-impl
type: TASK
title: Implement Gen 3 Contest Data Mapping
status: READY
owner_persona: coder
created_at: '2026-07-02'
updated_at: '2026-08-30'
depends_on:
  - research-249-384-gen3-party-box-integration
jules_session_id: null
pr_number: null
parent: story-065-142-gen3-contest-data-mapping
tags:
  - feature
  - gen3
  - contests
  - mapping
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# TASK: Implement Gen 3 Contest Data Mapping

## 1. Context
This task implements the logic for mapping extracted Gen 3 contest data (`Gen3ConditionStats` and `Gen3Ribbons`) to the `PokemonInstance` structure for Gen 3 saves.

## 2. Requirements
- Update the `PokemonInstance` interface in `src/engine/saveParser/parsers/common.ts` to include optional fields: `condition?: Gen3ConditionStats` and `ribbons?: Gen3Ribbons`.
- When generating the `PokemonInstance` list for `partyDetails` and `pcDetails` in `parseGen3` (inside `src/engine/saveParser/parsers/gen3.ts`), ensure the extraction functions `parseGen3ConditionStats` and `parseGen3Ribbons` are invoked and the results are mapped to the respective Pokémon instances.
- **CRITICAL CONTRACT**: All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.
- Ensure backwards compatibility: Gen 1 and Gen 2 parsing interfaces must remain unmodified.
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## 3. Acceptance Criteria
- [x] Update `PokemonInstance` interface to include `condition` and `ribbons` fields.
- [x] Implement mapping in `parseGen3` to correctly assign contest stats and ribbons to `PokemonInstance` objects.
