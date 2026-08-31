---
id: task-336-346-update-runtime-interfaces-keys-impl
type: TASK
title: Update Runtime Interfaces to Verbose Keys Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-07-26'
updated_at: '2026-08-31'
depends_on: []
jules_session_id: '8264805315433216706'
pr_number: null
parent: story-043-336-update-runtime-interfaces-keys
tags:
  - feature
  - architecture
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Task: Update Runtime Interfaces to Verbose Keys Implementation

## Objective
Implement changes required by ADR 015. Update the runtime interfaces and components that load the generated PokeData to expect the new verbose property names, replacing the old minified accessors.

## Scope
- Update `src/db/schema.ts`, `src/db/PokeDB.ts` and associated application interfaces to map correctly to properties like `name`, `captureRate`, `genderRate`, `chance` and others defined in PokeData Property Naming Schema.
- Update data-consuming components to accurately retrieve the data via the extended, readable keys.
- Ensure that memory offsets, lengths, bit locations, and shifts for dynamic block extraction (if any) are defined as reusable constants at the module level.
- Ensure `RangeError` from out-of-bounds `DataView` reads throws a new error with the message "The save file is corrupted or incomplete."

## Acceptance Criteria
- [ ] Implement verbose property names according to the schema.
- [ ] Web app renders properly.
- [ ] Build and tests pass.
