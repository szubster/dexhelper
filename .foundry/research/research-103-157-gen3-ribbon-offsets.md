---
id: research-103-157-gen3-ribbon-offsets
type: RESEARCH
title: Investigate Gen 3 Ribbon Bitfields Offsets
status: ACTIVE
owner_persona: researcher
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-103-157-gen3-ribbon-bitfields-impl
tags:
  - research
  - gen3
  - contests
  - parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# RESEARCH: Investigate Gen 3 Ribbon Bitfields Offsets

## Context
During the implementation of `task-103-157-gen3-ribbon-bitfields-impl`, it was determined that the exact memory offsets and block structures for Contest Ribbons (e.g. Cool, Beauty, Cute, Smart, Tough across Normal, Super, Hyper, Master ranks) in the Gen 3 save format are undocumented in the current knowledge base. Without these offsets, it is impossible to correctly implement the `DataView` parsing logic.

## Instructions
1. Investigate the Gen 3 save data structure (Ruby, Sapphire, Emerald) to determine where Pokémon Ribbon bitfields are stored.
2. Document the exact block, section, offset, and size for these bitfields within the Pokémon data structure.
3. Identify how the different ribbons (categories and ranks) are packed into these bitfields.
4. Update the knowledge base (e.g., in `.foundry/docs/knowledge_base/`) with these findings.

## Acceptance Criteria
- [ ] Memory offsets and structure for Gen 3 Ribbon bitfields are fully documented in the knowledge base.
- [ ] The exact block, offset, and size for the bitfields are identified.
- [ ] The mapping of individual bits to specific ribbons is documented.
