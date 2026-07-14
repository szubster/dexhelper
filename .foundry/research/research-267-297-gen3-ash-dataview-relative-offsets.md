---
id: research-267-297-gen3-ash-dataview-relative-offsets
type: RESEARCH
title: Gen 3 Volcanic Ash Relative Offsets
status: COMPLETED
owner_persona: researcher
created_at: '2026-07-12'
updated_at: '2026-07-14'
jules_session_id: null
depends_on: []
parent: story-113-267-gen3-ash-dataview-extraction
tags:
  - gen3
  - ash
  - parsing
research_references:
  - .foundry/archive/research/research-054-243-gen3-ash-gathering-offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Volcanic Ash Relative Offsets

## Context
The previous implementation task for extracting Volcanic Ash count (`task-267-261-gen3-ash-dataview-extraction-impl`) failed permanently because it used hardcoded absolute offsets (`0x142C` / `0x13D0`). Gen 3 saves use an A/B bank rotation system for flash memory. Using absolute offsets will fail when the active bank rotates. We must determine the correct relative offset calculation.

## Acceptance Criteria
- [x] Investigate the root cause of the previous implementation failure regarding absolute offsets vs relative offsets.
- [x] Document how to calculate the correct relative memory offset for Volcanic Ash using the dynamically resolved `section1Offset` provided by the parsing engine.
- [x] Define what the module-level constant values should be for these relative offsets, adhering to ADR 028.

## Developer Instructions
- **Failure conditions:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`. If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Completion conditions:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

### Findings

**1. Root Cause of Previous Failure**
The previous implementation used hardcoded absolute offsets (`0x142C` for Emerald and `0x13D0` for Ruby/Sapphire). This failed because Gen 3 save files use an A/B bank rotation system for flash memory. Depending on which bank was recently saved, the active `SaveBlock1` data will either reside at `0x0000` or `0xE000`. Absolute offsets do not account for this rotation.

**2. Relative Offset Calculation using `section1Offset`**
The `section1Offset` dynamically resolves to the beginning of the active Section 1 within the save file.

According to the knowledge base document (`.foundry/docs/knowledge_base/gen3_ash_gathering_offsets.md`):
- In Emerald, the `vars` array is located at offset `0x139C` within `SaveBlock1`.
- In Ruby/Sapphire, the `vars` array is located at offset `0x1340` within `SaveBlock1`.
- The Volcanic Ash count is at variable `0x4048`, which gives a byte offset of `0x90` within the `vars` array.

However, `section1Offset` points to the *start of Section 1 data* within the save block.

Section 1 contains `Team / Items`. In pokeemerald/pokeruby decompilations:
- `SaveBlock1` size is 0x3D68, which spans 4 sections (0, 1, 2, 3).
- Section 0: `SaveBlock1` offset 0x0000
- Section 1: `SaveBlock1` offset 0x0F80
- Section 2: `SaveBlock1` offset 0x1F00
- Section 3: `SaveBlock1` offset 0x2E80

Because the Ash gather count variable is in `SaveBlock1` at offset `0x142C` (Emerald) or `0x13D0` (Ruby/Sapphire), and `0x0F80 <= offset < 0x1F00`, the data resides within Section 1.

To get the offset *relative to the start of Section 1*:
- **Emerald relative offset:** `0x142C - 0x0F80 = 0x4AC`
- **Ruby/Sapphire relative offset:** `0x13D0 - 0x0F80 = 0x450`

Thus, the exact calculation is: `section1Offset + 0x4AC` for Emerald, or `section1Offset + 0x450` for Ruby/Sapphire.

**3. Module-Level Constants**
Following ADR 028, these should be defined as constants in the Gen 3 parser module (`src/engine/saveParser/parsers/gen3.ts` or similar):
```typescript
export const GEN3_EMERALD_ASH_RELATIVE_OFFSET = 0x04AC;
export const GEN3_RS_ASH_RELATIVE_OFFSET = 0x0450;
```
