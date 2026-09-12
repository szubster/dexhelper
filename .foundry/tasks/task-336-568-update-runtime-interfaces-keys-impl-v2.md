---
id: task-336-568-update-runtime-interfaces-keys-impl-v2
type: TASK
title: Update Runtime Interfaces to Verbose Keys Implementation (v2)
status: READY
owner_persona: coder
created_at: '2026-09-10'
updated_at: '2026-09-10'
depends_on:
  - research-336-567-investigate-runtime-interfaces-keys-failure
jules_session_id: null
pr_number: null
parent: story-043-336-update-runtime-interfaces-keys
tags:
  - feature
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Update Runtime Interfaces to Verbose Keys Implementation (v2)

## Objective
Implement changes required by ADR 015. Update the runtime interfaces and components that load the generated PokeData to expect the new verbose property names, replacing the old minified accessors. This task depends on the findings from `research-336-567-investigate-runtime-interfaces-keys-failure` to avoid previous permanent failures.

## Scope
- Review the findings from `research-336-567-investigate-runtime-interfaces-keys-failure`.
- Update `src/db/schema.ts`, `src/db/PokeDB.ts` and associated application interfaces to map correctly to properties like `name`, `captureRate`, `genderRate`, `chance` and others defined in PokeData Property Naming Schema.
- Update data-consuming components to accurately retrieve the data via the extended, readable keys.
- Ensure that memory offsets, lengths, bit locations, and shifts for dynamic block extraction (if any) are defined as reusable constants at the module level.
- Ensure `RangeError` from out-of-bounds `DataView` reads throws a new error with the message "The save file is corrupted or incomplete."

## Acceptance Criteria
- [ ] Implement verbose property names according to the schema and research findings.
- [ ] Web app renders properly.
- [ ] Build and tests pass.
