---
id: task-320-323-gen3-contest-frontier-qa
type: TASK
title: QA Gen 3 Contest & Battle Frontier Extraction
status: COMPLETED
owner_persona: qa
created_at: '2026-07-14'
updated_at: '2026-07-17'
depends_on:
  - task-320-322-gen3-contest-frontier-impl
jules_session_id: null
pr_number: null
parent: story-304-320-gen3-contest-frontier-extraction
tags:
  - data-extraction
  - gen3
research_references:
  - .foundry/docs/knowledge_base/gen3_battle_frontier_data.md
  - .foundry/docs/knowledge_base/gen3_pokemon_data_structure.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 3 Contest & Battle Frontier Extraction

## Objective
Verify the implementation of extraction logic for Master Rank Contest condition ribbons and Battle Frontier Gold Symbols from Gen 3 save files.

## Contracts & Requirements
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- Verify that for save file parsing, all memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level, forbidding inline magic numbers.
- Verify that for Gen 3 save file parsing, the Coder used the resolved section offset (e.g., `section1Offset` or `section2Offset`) to calculate relative memory offsets instead of hardcoded absolute offsets.

## Acceptance Criteria
- [x] Verify Contest extraction logic using `DataView`.
- [x] Verify Battle Frontier extraction logic using `DataView`.
- [x] Verify no magic numbers are used inline for memory operations.
- [x] Verify appropriate A/B bank relative offset resolution is used.
