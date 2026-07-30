---
id: task-320-322-gen2-tm-hm-parsing-impl
type: TASK
title: Gen 2 TM/HM Parse Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-07-14'
updated_at: '2026-07-29'
depends_on: []
jules_session_id: '11028355809744573427'
pr_number: null
parent: story-306-320-gen2-tm-hm-parsing
tags:
  - feature
  - gen2
  - save-parsing
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Gen 2 TM/HM Parsing Implementation

## Overview
Implement TM/HM parsing for Gen 2 save files within src/engine/saveParser/parsers/gen2.ts, adhering strictly to defined memory structures and offsets.

## Context and Contracts
- Extract the player's current TM and HM inventory.
- Map parsed items to their corresponding moves.
- Extract Event Flags to determine if one-time TMs have already been collected.
- **ADR 028 Contract:** All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden. Use dynamically resolved offsets for relative calculation (though Gen2 pockets are primarily absolute offsets, use constants like 0x23c8 for Crystal and 0x23e7 for GS).
- **ADR 015 Contract:** Adhere to full PokeData property names. No short property mappings.
- **Failure Protocol:**
  - If a transient failure occurs requiring a retry, update the YAML frontmatter to status: FAILED with a clear rejection_reason.
  - If the task is permanently aborted (impossible or max rejections), update the YAML frontmatter to status: CANCELLED with a rejection_reason.
  - If submitting an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Define module-level constants for TM/HM pocket offsets and event flag offsets.
- [x] Extract TM/HM inventory quantities.
- [x] Map TM/HMs to their corresponding items/moves.
- [x] Extract one-time TM collection event flags.
- [x] Ensure all tests pass.
