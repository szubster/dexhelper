---
id: task-340-476-gen3-safari-zone-state-qa
type: TASK
title: Gen 3 Safari Zone State QA
status: READY
owner_persona: qa
created_at: '2026-08-23'
updated_at: '2026-08-25'
depends_on:
  - task-340-475-gen3-safari-zone-encounters-impl
jules_session_id: null
pr_number: null
parent: story-324-340-gen3-safari-zone-save-state
tags:
  - backend
  - safari-zone
  - gen3
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Gen 3 Safari Zone State QA

## Overview
Verify the Safari Zone state extraction and missing encounters calculation logic for Gen 3 save files, ensuring compliance with architectural directives.

## Verification Scope
- Verify that the Pokédex state data is extracted correctly.
- Verify that the PC Box state data is extracted correctly.
- Verify that the Safari Zone missing encounters are correctly calculated based on static tables.
- **Strict Architecture Check**: Ensure no inline magic numbers were used for memory offsets, lengths, bit locations, or shifts. They must all be module-level constants.
- **Strict Architecture Check**: Ensure the coder used resolved section offsets (relative offsets) to support A/B bank flash memory.
- **Strict Architecture Check**: Ensure out-of-bounds `DataView` reads throwing `RangeError` are caught and re-thrown with the message "The save file is corrupted or incomplete."

## Acceptance Criteria
- [ ] Pokédex data extraction logic is verified.
- [ ] PC Box data extraction logic is verified.
- [ ] Encounter calculation is verified.
- [ ] Architectural directives (constants, relative offsets, RangeError handling) are explicitly verified in the implementations.
