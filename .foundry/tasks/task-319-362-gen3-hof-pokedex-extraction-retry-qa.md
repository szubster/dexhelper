---
id: task-319-362-gen3-hof-pokedex-extraction-retry-qa
type: TASK
title: 'QA: Gen 3 Hall of Fame & Pokédex Data Extraction (Retry)'
status: READY
owner_persona: qa
created_at: '2026-07-29'
updated_at: '2026-07-29'
depends_on:
  - task-319-361-gen3-hof-pokedex-extraction-retry-impl
jules_session_id: null
pr_number: null
parent: story-304-319-gen3-hof-pokedex-extraction
tags:
  - data-extraction
  - gen3
research_references:
  - .foundry/docs/knowledge_base/engine/save_parsing/gen3_hall_of_fame.md
  - .foundry/docs/knowledge_base/gen3_pokemon_data_structure.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA: Gen 3 Hall of Fame & Pokédex Data Extraction (Retry)

## Objective
Verify the implementation of the Gen 3 Hall of Fame entry and Pokédex data extraction logic against the architectural requirements, ensuring that all magic numbers have been correctly replaced with constants.

## Verification Tasks
1.  **Architecture Verification (ADR 010):** Verify that the `coder` exclusively used the `DataView` API. If they used raw `Uint8Array` manipulations, reject the PR.
2.  **Architecture Verification (ADR 028) and Section 13 Guidelines:** Verify that all memory offsets, limits, bit locations, shifts, and multipliers are defined as reusable module-level constants. **Inline magic numbers are strictly forbidden (e.g., `* 4`, `/ 8`, `% 8`).**
3.  **Relative Offsets Verification:** Verify that the `coder` used the dynamically resolved `section1Offset` passed to the function to calculate relative memory offsets for `SaveBlock1` data. If they used hardcoded absolute offsets, reject the PR.
4.  **Bounds Checking Verification:** Verify that `DataView` reads are wrapped in a `try...catch` block and that `RangeError` is caught and re-thrown as exactly `"The save file is corrupted or incomplete."`.
5.  **Implementation Verification:** Verify that `GAME_STAT_ENTERED_HOF` (or an equivalent Hall of Fame entry flag) and the Hoenn/National Dex caught Pokémon counts are correctly extracted.
6.  **Test Verification:** Verify that the Vitest test suite is updated and all tests pass.

## Acceptance Criteria
- [ ] Code uses only `DataView` API.
- [ ] No inline magic numbers exist for offsets/limits/shifts/multipliers.
- [ ] Relative offsets based on `section1Offset` are used.
- [ ] `RangeError` handling is strictly implemented as specified.
- [ ] Logic correctly extracts Hall of Fame entry flag and Pokédex caught counts.
- [ ] Tests exist, are comprehensive, and pass.

## Persona Instructions
- **Coder & QA:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Coder & QA:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Coder & QA:** If you submit an empty PR for a completed task (e.g., if the work is already done), you MUST check off all Acceptance Criteria checkboxes before submitting.
- **QA:** If rejecting the implementation, you MUST update the TARGET task's YAML frontmatter (`status: FAILED`, increment `rejection_count`, add `rejection_reason`) while keeping your own QA task's frontmatter unchanged.
