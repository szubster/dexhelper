---
id: task-346-353-gen3-pv-iv-extraction-qa
type: TASK
title: QA Gen 3 PV and IV Data Extraction
status: PENDING
owner_persona: qa
created_at: '2026-07-28'
updated_at: '2026-07-30'
depends_on:
  - task-346-352-gen3-pv-iv-extraction-impl
jules_session_id: null
pr_number: null
parent: story-324-346-gen3-pv-iv-extraction
tags:
  - dexhelper
  - generation-3
  - save-parsing
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# QA Gen 3 PV and IV Data Extraction

## Objective
Verify the implementation of Gen 3 PV and IV data extraction.

## Verification Requirements
1.  **Logic Verification**:
    - Verify that the 100-byte structure is parsed correctly for PV and OT ID.
    - Verify that the `PV % 24` permutation logic is correctly implemented to locate the Miscellaneous substructure.
    - Verify that the `PV ^ OT_ID` XOR decryption is correctly implemented.
    - Verify that the IV extraction from the Miscellaneous substructure is accurate.
2.  **Code Contract Verification**:
    - Verify that the implementation strictly adheres to Section 13 guidelines in `.foundry/docs/schema.md`.
    - Ensure there are no inline magic numbers used in the parsing functions.
    - Ensure `RangeError` is caught and re-thrown with the specific message: "The save file is corrupted or incomplete."
    - Ensure all offsets and shifts are defined as module-level constants.

## Acceptance Criteria
- [ ] Verify correctness of PV and IV extraction logic and decryption.
- [ ] Verify strict adherence to Section 13 guidelines (no magic numbers, RangeError handling).
