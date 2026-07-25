---
id: task-333-334-gen3-secret-base-locations-impl
type: TASK
title: Implement Gen 3 Secret Base Locations Parser
status: ACTIVE
owner_persona: coder
created_at: '2026-07-19'
updated_at: '2026-07-20'
depends_on: []
jules_session_id: '11257634579018117702'
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

# TASK: Implement Gen 3 Secret Base Locations Parser

## Context
As part of the Gen 3 Secret Base and Mixed Record Viewer, we need to extract the locations of all active Secret Bases from the save file. This involves finding where the Secret Bases are built and who owns them.

## Requirements
- Use the `DataView` API (per ADR 010) to parse the Gen 3 save file and identify all active Secret Base locations.
- Ensure that you properly catch `RangeError` exceptions originating from out-of-bounds `DataView` reads, and rethrow them with the message: `'The save file is corrupted or incomplete.'` (per ADR 010).
- **CRITICAL (ADR 028):** All memory offsets, lengths, bit locations, and shifts must be explicitly defined as reusable constants at the module level. Inline magic numbers for memory operations are strictly forbidden.
- **CRITICAL:** Use the resolved section offset (e.g., `section1Offset`) to calculate relative memory offsets instead of using absolute hardcoded offsets.
- Map the internal location IDs to the unified Gen 3 map graph.

## Acceptance Criteria
- [ ] Parser correctly extracts the internal location IDs and active state of the secret bases.
- [ ] `RangeError` is caught and rethrown with the exact message.
- [ ] No inline magic numbers; all memory offsets and sizes are module-level constants.
- [ ] Parsing correctly uses the relative `section1Offset` rather than absolute offsets.
- [ ] Location IDs are mapped to the correct Gen 3 map graph locations.
