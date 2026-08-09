---
id: task-402-409-gen3-iv-pv-qa
type: TASK
title: Gen 3 IV/PV Extraction QA
status: ACTIVE
owner_persona: qa
created_at: '2026-08-08'
updated_at: '2026-08-09'
depends_on:
  - task-402-408-gen3-iv-pv-parser-impl
jules_session_id: '11361217312313065104'
parent: story-112-402-gen3-iv-pv-extraction
tags:
  - dexhelper
  - generation-3
  - save-parsing
  - qa
rejection_count: 1
rejection_reason: ''
---

# Gen 3 IV/PV Extraction QA

## Overview
Verify the implementation of the Gen 3 IV/PV extraction logic. Ensure that the correct types/constants are used, the bitwise unpacking logic is accurate, and proper error handling (`RangeError`) is in place.

## Acceptance Criteria
- [x] Verify that `parseGen3PokemonPVAndIVs` correctly calculates the decryption key and locates the Miscellaneous substructure using the `PV % 24` logic.
- [x] Verify that the IV unpacking correctly applies the defined masks and shifts.
- [x] Verify that `RangeError` from the `DataView` API is caught and re-thrown as "The save file is corrupted or incomplete."
- [x] Ensure that unit tests are present and passing for `parseGen3PokemonPVAndIVs`.
- [x] Run `pnpm lint && pnpm test` to confirm no regressions are introduced.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
