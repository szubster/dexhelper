---
id: task-158-250-gen2-egg-hatch-parsing-qa
type: TASK
title: QA - Verify Gen 2 Egg Hatch Data Extraction
status: READY
owner_persona: qa
created_at: '2026-06-29'
updated_at: '2026-07-02'
depends_on:
  - task-158-249-gen2-egg-hatch-parsing-impl
jules_session_id: null
pr_number: null
parent: story-106-158-gen2-egg-hatch-parsing
tags:
  - qa
  - gen2
  - save-parsing
  - breeding
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA - Verify Gen 2 Egg Hatch Data Extraction

## Objective
Verify that the coder successfully implemented the Gen 2 egg hatch data extraction logic and that the calculation is accurate.

## Verification Steps
1. Verify that `eggSteps?: number | undefined;` is present in the `PokemonInstance` interface (`src/engine/saveParser/parsers/common.ts`).
2. Verify that in `src/engine/saveParser/parsers/gen2.ts` (`parseGen2PokemonInstance`), `eggSteps` is calculated as `friendship * 256` if the `speciesId` is `253`.
3. Verify that unit tests were written and they pass by running `pnpm test`. The tests should cover both Egg and non-Egg parsing.

## Constraints & Contract
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] `PokemonInstance` is confirmed to have the `eggSteps` property.
- [ ] `parseGen2PokemonInstance` is confirmed to correctly calculate `eggSteps` for eggs.
- [ ] Unit tests for `eggSteps` pass and cover edge cases.
