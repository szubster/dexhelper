---
id: story-136-334-sorting-cross-gen-considerations-retry
type: STORY
title: Cross-Generation Sorting Considerations and Compatibility (Retry)
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-18'
updated_at: '2026-08-03'
depends_on:
  - story-136-333-sorting-standard-strategies-retry
jules_session_id: '6629083021265480732'
pr_number: null
parent: epic-106-136-pc-box-sorting-algorithms
tags:
  - feature
  - gen1
  - gen2
  - gen3
  - sorting
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Cross-Generation Sorting Considerations and Compatibility

## Objective
Ensure that the standard sorting strategies function correctly across Gen 1, Gen 2, and Gen 3 save data. This involves writing adapter logic or edge-case handling for structural differences in `PokeData` payloads across generations, as well as comprehensive cross-generation testing.

## Context
While `PokeData` provides a unified interface, certain properties (e.g., regional dex mappings, internal ID differences, absence of modern properties in Gen 1/2) require specific handling to prevent sorting failures or incorrect layouts.

## Acceptance Criteria
- [x] Implement Generation-specific Regional Dex adapters for sorting (Gen 1 Kanto, Gen 2 Johto, Gen 3 Hoenn/Kanto).
- [x] Ensure `TypeSorter` correctly handles Gen 1 type differences (e.g., Magnemite missing Steel type) if data mapping does not already normalize this.
- [x] Implement robust handling for null/undefined properties that may be missing in older generations.
- [x] Break down story into tasks for technical blueprinting, implementation, and cross-generation test suites.
- [x] task-334-386-cross-gen-sorting-adapters-impl
- [x] task-334-387-cross-gen-sorting-adapters-qa
