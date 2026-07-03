---
id: story-087-245-item-list-validation
type: STORY
title: Item List Generation Validation and Mapping
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-29'
updated_at: '2026-07-03'
depends_on:
  - story-087-128-dynamic-item-list-parsing
jules_session_id: '9436106531309654766'
pr_number: null
parent: epic-049-087-dynamic-item-list-parsing
tags:
  - refactor
  - build
  - db
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Item List Generation Validation and Mapping

## Background
The extraction of item data into `items.jsonl` has been implemented. However, we need to ensure that proper validation is handled, such as mapping across generations and aligning PokeAPI IDs to internal ROM IDs for consistency.

## Goals
1. Handle validation required for items, including cross-generation discrepancies.
2. Establish robust mapping between PokeAPI IDs and internal ROM IDs where required.

## Acceptance Criteria
- [x] Implement cross-generation mapping logic for items.
- [x] Ensure PokeAPI IDs are mapped to internal ROM IDs accurately.
- [x] Break down this STORY into concrete TASK nodes for implementation.
- [x] task-245-249-item-mapping-logic
- [x] task-245-250-item-mapping-qa
