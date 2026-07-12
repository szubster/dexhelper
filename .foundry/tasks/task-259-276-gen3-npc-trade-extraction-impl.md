---
id: task-259-276-gen3-npc-trade-extraction-impl
type: TASK
title: Implement Gen 3 NPC Trade Extraction
status: FAILED
owner_persona: coder
created_at: '2026-07-10'
updated_at: '2026-07-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-119-259-gen3-npc-trade-parsing
tags:
  - backend
  - save-parsing
  - gen3
research_references: []
rejection_count: 0
rejection_reason: '[ACKNOWLEDGED] Merged with unfulfilled acceptance criteria'
notes: ''
---

# Implement Gen 3 NPC Trade Extraction

## Objective
Implement DataView-based parsers to extract in-game NPC trade flags for all core Gen 3 versions (RSE/FRLG).

## Context
Refer to `.foundry/docs/knowledge_base/gen3_npc_trade_offsets.md` for the exact RSE and FRLG flags, as well as the logic for calculating byte offsets and bit indices within the flag block.

## Constraints
- **NO INLINE MAGIC NUMBERS:** All memory offsets, lengths, bit locations, and shifts must be explicitly defined as reusable constants at the module level.
- **DataView:** The parser MUST exclusively use the native `DataView` API.

## Workflow Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail this task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Define memory constants for all RSE and FRLG NPC trade flags at the module level.
- [ ] Implement Gen 3 DataView parsers to extract NPC trade flags.
