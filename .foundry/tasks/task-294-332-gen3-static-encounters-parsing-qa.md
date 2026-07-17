---
id: task-294-332-gen3-static-encounters-parsing-qa
type: TASK
title: QA - Gen 3 Static Encounters Parsing
status: PENDING
owner_persona: qa
created_at: '2026-07-17'
updated_at: '2026-07-17'
depends_on:
  - task-294-331-gen3-static-encounters-parsing-impl
jules_session_id: null
pr_number: null
parent: story-138-294-gen3-static-encounters-parsing
tags:
  - gen3
  - verification
  - parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA - Gen 3 Static Encounters Parsing

Verify the implementation of the Gen 3 Static Encounters save block parsing logic.

## Context
The Coder has implemented the save block extraction logic for Gen 3 event flags related to static encounters (e.g., legendaries, Sudowoodo, Snorlax, Voltorb/Electrode) across Emerald, FireRed/LeafGreen, and Ruby/Sapphire.

## Technical Verification Requirements
1. **Module-Level Constants:**
   - Verify that all memory offsets, lengths, bit locations, and shifts for the static encounter event flags are defined as module-level constants.
   - Verify that no inline magic numbers were used during save block extraction.
2. **Relative Offsets:**
   - Verify that the Coder used the resolved section offset (e.g., `section1Offset`) to calculate relative memory offsets instead of hardcoded absolute offsets (to support A/B bank flash memory).
3. **Logic Accuracy:**
   - Review the parsing logic to ensure it accurately implements the mappings from `.foundry/docs/knowledge_base/gen3_static_encounters/gen3_static_encounter_offsets.md`.

## Acceptance Criteria
- [ ] Verified that module-level constants are used for all memory offsets and bit locations, and no inline magic numbers exist.
- [ ] Verified that relative offsets are calculated using resolved section offsets for A/B bank flash memory support.
- [ ] Verified that the save file parsing logic correctly maps to the documented offsets for Emerald, FireRed/LeafGreen, and Ruby/Sapphire.

## Reminders for QA
- **Transient Failures:** If you experience a transient failure requiring a retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures/Aborts:** If you must abort or permanently fail this task (impossible or max rejections reached, e.g., the Coder's implementation is fundamentally flawed), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs:** If you submit an empty PR because the target artifact is already verified and complete, you MUST check off all Acceptance Criteria checkboxes before submitting.
- **YAML Frontmatter:** Do not modify the YAML frontmatter on successful completion. Only update the markdown body (e.g., checking off acceptance criteria).
