---
id: task-349-380-gen3-spinda-extraction-impl
type: TASK
title: Gen3 Spinda Extraction Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-08-01'
updated_at: '2026-08-19'
depends_on: []
jules_session_id: '6507816064341683273'
pr_number: null
parent: story-345-349-gen3-spinda-extraction-core
tags:
  - gen3
  - spinda
  - data-extraction
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Gen3 Spinda Extraction Implementation

## Context
Implement parsing logic to identify Spinda Pokémon in both PC Box and Party datasets for Generation 3 save files. The core requirement is to extract the 32-bit PID for each identified Spinda, and map this to a specific data structure.

## Acceptance Criteria
- [ ] Implement parsing logic to identify Spinda Pokémon in both PC Box and Party datasets.
- [ ] Extract the 32-bit PID for each identified Spinda.
- [ ] Define the interface/data structure to store the extracted Spinda info for the UI layer.

## Critical Guidelines
You MUST strictly adhere to all guidelines defined in **Section 13 ("Save File Parsing & Extraction Guidelines")** of `.foundry/docs/schema.md`. Specifically:
*   **Module-Level Constants:** All memory offsets, lengths, bit locations, shifts, and array bounds checking limits must be explicitly defined as reusable constants at the module level.
*   **No Magic Numbers:** The use of inline magic numbers (e.g., `0x2dd6`, `>> 4`) directly in parsing functions is strictly forbidden.
*   **Relative Offsets (Gen 3):** When extracting Gen 3 save blocks, you must pass and utilize the resolved section offset (e.g., `section1Offset` or `section2Offset`) to calculate relative memory offsets rather than absolute hardcoded offsets, supporting the A/B bank flash memory architecture.
*   **Bitwise Mapping:** When parsing bitwise blocks (e.g., event flags) using the `DataView` API, you must explicitly map the specific bit offsets corresponding to target events. Just extracting the raw array is insufficient.
*   **RangeError Handling:** When using the `DataView` API, you MUST catch `RangeError` for out-of-bounds reads and throw a new error with the message "The save file is corrupted or incomplete." to prevent application crashes.
