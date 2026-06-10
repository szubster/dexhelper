---
id: epic-040-064-gen3-contest-data-extraction
type: EPIC
title: Gen 3 Contest Data Extraction Engine
status: COMPLETED
owner_persona: story_owner
created_at: '2026-06-09'
updated_at: '2026-06-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-070-040-gen3-contest-data-parsing
tags:
  - feature
  - gen3
  - contests
  - parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# EPIC: Gen 3 Contest Data Extraction Engine

## 1. Context
As derived from PRD `prd-070-040-gen3-contest-data-parsing`, DexHelper requires the ability to extract hidden contest-related statistics and ribbons directly from Gen 3 save files.

This Epic focuses specifically on the core extraction logic, navigating the Gen 3 save format blocks to locate and read the Condition (Cool, Beauty, Cute, Smart, Tough), Sheen, and Contest Ribbons across all Pokémon.

## 2. Requirements
- The parsing engine must be updated to target the correct blocks and offsets for Gen 3 save formats (Ruby, Sapphire, Emerald, FireRed, LeafGreen) to locate contest data.
- **Strict DataView API Usage**: All parsing logic for contest data MUST exclusively use the native `DataView` API (e.g., `getUint8`, `getUint16`, `getUint32`) as mandated by ADR 010.
- Extract the following hidden Condition stats per Pokémon: Cool, Beauty, Cute, Smart, and Tough.
- Extract the Pokémon's Sheen value.
- Extract the bitfield/flags associated with all Contest Ribbons.

## 3. Acceptance Criteria
- [ ] Implement `DataView`-based parsing logic for Gen 3 Condition stats (Cool, Beauty, Cute, Smart, Tough).
- [ ] Implement `DataView`-based parsing logic for Gen 3 Sheen data.
- [ ] Implement `DataView`-based parsing logic to extract Gen 3 Ribbon bitfields.
- [ ] Write targeted unit tests confirming extraction logic accurately reads raw binary fixtures representing Gen 3 contest data.

- [ ] .foundry/stories/story-064-101-gen3-condition-stats-parsing.md
- [ ] .foundry/stories/story-064-102-gen3-sheen-value-parsing.md
- [ ] .foundry/stories/story-064-103-gen3-ribbon-bitfields-extraction.md
