---
id: task-320-322-gen3-contest-frontier-impl
type: TASK
title: Implement Gen 3 Contest & Battle Frontier Extraction
status: COMPLETED
owner_persona: coder
created_at: '2026-07-14'
updated_at: '2026-07-17'
depends_on: []
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

# Implement Gen 3 Contest & Battle Frontier Extraction

## Objective
Implement extraction logic for Master Rank Contest condition ribbons and Battle Frontier Gold Symbols from Gen 3 save files.

## Contracts & Requirements
- Use the `DataView` API (ADR 010).
- Extract magic numbers into module-level reusable constants (ADR 028). For save file parsing, all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.
- For Gen 3 save file parsing, use the resolved section offset (e.g., `section1Offset` or `section2Offset`) to calculate relative memory offsets instead of hardcoded absolute offsets to properly support A/B bank flash memory.
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Implement extraction logic for Master Rank Contest condition ribbons.
- [x] Implement extraction logic for Battle Frontier Gold Symbols.
