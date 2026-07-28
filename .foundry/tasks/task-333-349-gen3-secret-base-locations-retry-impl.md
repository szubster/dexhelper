---
id: task-333-349-gen3-secret-base-locations-retry-impl
type: TASK
title: Implement Gen 3 Secret Base Locations Parser (Retry)
status: ACTIVE
owner_persona: coder
created_at: '2026-07-28'
updated_at: '2026-07-28'
depends_on:
  - research-333-348-investigate-secret-base-offsets
jules_session_id: '14515499224242142360'
pr_number: null
parent: story-324-333-parse-secret-base-locations
tags:
  - feature
  - gen3
  - secret-base
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Implement Gen 3 Secret Base Locations Parser (Retry)

## Context
As part of the Gen 3 Secret Base and Mixed Record Viewer, we need to extract the locations of all active Secret Bases from the save file. This involves finding where the Secret Bases are built and who owns them.
The previous implementation failed due to incorrect offsets. It incorrectly assumed Emerald uses 8 bytes for `trainerName` and `0x0A` for the `trainerId` offset.

## Requirements
- Use the `DataView` API (per ADR 010) to parse the Gen 3 save file and identify all active Secret Base locations.
- **CRITICAL:** You must strictly adhere to all guidelines defined in **Section 13 ("Save File Parsing & Extraction Guidelines")** of `.foundry/docs/schema.md`.
- **CRITICAL (Research Node):** As per `research-333-348-investigate-secret-base-offsets`, `trainerName` is 7 bytes (offset `0x02`) and `trainerId` is 4 bytes (offset `0x09`). These offsets are identical across all Gen 3 games.
- Ensure that you properly catch `RangeError` exceptions originating from out-of-bounds `DataView` reads, and rethrow them with the message: `'The save file is corrupted or incomplete.'` (per ADR 010).
- **CRITICAL (ADR 028):** All memory offsets, lengths, bit locations, and shifts must be explicitly defined as reusable constants at the module level. Inline magic numbers for memory operations are strictly forbidden.
- **CRITICAL:** Use the resolved section offset (e.g., `section1Offset`) to calculate relative memory offsets instead of using absolute hardcoded offsets.
- Map the internal location IDs to the unified Gen 3 map graph.

## Acceptance Criteria
- [ ] Parser correctly extracts the internal location IDs and active state of the secret bases, using the correct trainer name length (7) and trainer ID offset (0x09).
- [ ] `RangeError` is caught and rethrown with the exact message.
- [ ] No inline magic numbers; all memory offsets and sizes are module-level constants.
- [ ] Parsing correctly uses the relative `section1Offset` rather than absolute offsets.
- [ ] Location IDs are mapped to the correct Gen 3 map graph locations.
