---
id: task-245-249-item-mapping-logic
type: TASK
title: Item List Generation Validation and Mapping
status: READY
owner_persona: coder
created_at: '2026-06-29'
updated_at: '2026-07-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-087-245-item-list-validation
tags:
  - refactor
  - build
  - db
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Item List Generation Validation and Mapping

## Background
The extraction of item data into `items.jsonl` has been implemented via `scripts/generate-pokedata.ts`. However, PokeAPI item IDs do not always align with the internal ROM IDs used by the game engines across different generations. We need to ensure that proper validation is handled, specifically mapping across generations and aligning PokeAPI IDs to internal ROM IDs for consistency. The `gameItemMap.ts` module currently contains manual mappings for Gen 1 and Gen 2, but we need to ensure this logic is robust and extends to Gen 3 or is integrated directly into the generation pipeline so the runtime can accurately parse items.

## Goals
Update the generation scripts and/or the runtime mapping utilities to accurately map PokeAPI item IDs to their corresponding internal ROM IDs across Generations 1, 2, and 3. Ensure that cross-generation discrepancies are handled gracefully.

## Constraints & Context
- Ensure you read `ADR-049-025` for context on the generation scripts.
- The `gameItemMap.ts` file located at `src/engine/assistant/strategies/items/gameItemMap.ts` currently handles some mappings. You should update this file or the `scripts/generate-pokedata.ts` pipeline to ensure all relevant items are mapped correctly for Gen 1, Gen 2, and Gen 3.
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement robust cross-generation mapping logic for items.
- [ ] Ensure PokeAPI item IDs are mapped to internal ROM IDs accurately for Gen 1, Gen 2, and Gen 3.
