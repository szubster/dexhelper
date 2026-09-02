---
id: task-478-516-test-pokeblock-parser
type: TASK
title: Write Unit Tests for Pokeblock Parser
status: READY
owner_persona: coder
created_at: 2026-09-02
updated_at: 2026-09-02
depends_on:
  - task-478-515-impl-pokeblock-parser
jules_session_id: null
parent: story-400-478-gen3-pokeblock-parsing-logic
tags:
  - gen3
  - pokeblocks
  - testing
research_references:
  - .foundry/docs/knowledge_base/gen3_pokeblock_offsets.md
rejection_count: 0
rejection_reason: ""
notes: ""
---

## Description
Write unit tests to verify the correctness of the Gen 3 Pokeblock parsing logic as referenced in .foundry/docs/knowledge_base/gen3_pokeblock_offsets.md.

## Acceptance Criteria
- [ ] Write unit tests asserting that the parsing function correctly extracts the color, spicy, dry, sweet, bitter, sour, and feel properties from an 8-byte binary structure.
- [ ] Write unit tests asserting that the returned array contains exactly 40 Pokeblocks when reading from a valid SaveBlock1 fixture.
