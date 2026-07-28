---
id: task-346-352-gen3-pv-iv-extraction-impl
type: TASK
title: Implement Gen 3 PV and IV Data Extraction
status: PENDING
owner_persona: coder
created_at: '2026-07-28'
updated_at: '2026-07-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-324-346-gen3-pv-iv-extraction
tags:
  - dexhelper
  - generation-3
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 PV and IV Data Extraction

## Objective
Implement the logic to extract the Personality Value (PV) and Individual Values (IVs) for each Pokémon from Gen 3 save files.

## Technical Contract
1.  **Extract Data**:
    - Parse the 100-byte Pokémon structure to obtain the PV and OT ID.
    - Implement the logic to locate the 48-byte encrypted Data block (bytes 32 through 79).
    - Determine the substructure order (Growth, Attacks, EVs, Miscellaneous) using the `PV % 24` permutation logic.
2.  **Decrypt Data**:
    - Decrypt the Data block (or specifically the Miscellaneous substructure) using the 32-bit XOR cipher key obtained by `PV ^ OT_ID`.
3.  **Extract IVs**:
    - Parse the Miscellaneous substructure to extract IVs (HP, Attack, Defense, Speed, Special Attack, Special Defense).

## Guidelines (CRITICAL)
You MUST strictly adhere to all guidelines defined in **Section 13 ("Save File Parsing & Extraction Guidelines")** of `.foundry/docs/schema.md`:
-   **Module-Level Constants:** All memory offsets, lengths, bit locations, shifts, and array bounds checking limits MUST be explicitly defined as reusable constants at the module level.
-   **No Magic Numbers:** The use of inline magic numbers (e.g., `0x2dd6`, `>> 4`) directly in parsing functions is strictly forbidden.
-   **Relative Offsets (Gen 3):** Pass and utilize the resolved section offset to calculate relative memory offsets.
-   **RangeError Handling:** When using the `DataView` API, you MUST catch `RangeError` for out-of-bounds reads and throw a new error with the exact message: "The save file is corrupted or incomplete."

## Acceptance Criteria
- [ ] Implement PV and IV extraction logic for Gen 3.
- [ ] Strictly adhere to Section 13 guidelines (no magic numbers, RangeError handling).
- [ ] Ensure the permutation logic (`PV % 24`) and decryption (`PV ^ OT_ID`) are correctly implemented.
