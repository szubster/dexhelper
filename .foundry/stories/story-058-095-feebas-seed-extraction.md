---
id: story-058-095-feebas-seed-extraction
type: STORY
title: Feebas Seed Extraction Utility
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-08'
updated_at: '2026-06-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-036-058-feebas-backend-parsing
tags:
  - gen3
  - backend
  - save-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Feebas Seed Extraction Utility

## Objective
Implement a utility function to extract the 16-bit Feebas seed from Gen 3 save files (Ruby, Sapphire, Emerald) using the native `DataView` API.

## Acceptance Criteria
- [ ] Create `src/engine/gen3/feebas.ts` (if it doesn't exist).
- [ ] Implement `extractFeebasSeed(saveData: DataView, gameVersion: GameVersion)` function.
- [ ] Handle version-specific offsets (`0x2DD6` for Ruby/Sapphire, `0x2E66` for Emerald) within `SaveBlock1`.
- [ ] Use `DataView` API (e.g. `getUint16`) to read the seed value.
- [ ] Write unit tests to verify extraction for all supported Gen 3 versions.
