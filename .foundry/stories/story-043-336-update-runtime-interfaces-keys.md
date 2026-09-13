---
id: story-043-336-update-runtime-interfaces-keys
type: STORY
title: Update Runtime Interfaces to Verbose Keys
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-21'
updated_at: '2026-09-10'
depends_on: []
jules_session_id: '4511290988511264512'
pr_number: null
parent: epic-032-043-runtime-interfaces-keys
tags:
  - feature
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Story: Update Runtime Interfaces to Verbose Keys

## Objective
Implement changes required by ADR 015. Update the runtime interfaces and components that load the generated PokeData to expect the new verbose property names, replacing the old minified accessors.

## Scope
- Update `src/db/schema.ts`, `src/db/PokeDB.ts` and associated application interfaces to map correctly to properties like `name`, `captureRate`, `genderRate`, `chance` and others defined in PokeData Property Naming Schema.
- Verify components accurately retrieve the data via the extended, readable keys.

## Acceptance Criteria
- [ ] Implement required application changes.
- [x] Break down story into tasks for technical blueprinting and implementation.
- [x] task-336-346-update-runtime-interfaces-keys-impl
- [x] task-336-347-update-runtime-interfaces-keys-qa
- [ ] research-336-567-investigate-runtime-interfaces-keys-failure
- [ ] task-336-568-update-runtime-interfaces-keys-impl-v2
- [ ] task-336-569-update-runtime-interfaces-keys-qa-v2
