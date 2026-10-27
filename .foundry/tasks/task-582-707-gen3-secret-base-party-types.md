---
id: task-582-707-gen3-secret-base-party-types
type: TASK
title: Define Gen 3 Secret Base Party Types and Constants
status: ACTIVE
owner_persona: coder
created_at: '2026-09-30'
updated_at: '2026-10-27'
depends_on: []
jules_session_id: '18345966039281414004'
pr_number: null
parent: story-569-582-gen3-secret-base-party-extraction
tags:
  - dexhelper
  - gen3
  - secret-base
  - map
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 30
---

# TASK: Define Gen 3 Secret Base Party Types and Constants

## Context
As part of extracting the NPC party for each base owner, we need to establish the appropriate type definitions and module-level constants for Gen 3 Secret Base parties.

## Requirements
- Adhere to the PokeData Property Naming Schema.
- Define module-level constants for memory offsets, lengths, bit locations, shifts, and array bounds checking limits. Do not use magic numbers.

## Acceptance Criteria
- [x] Define PokeData types for Secret Base NPC party (including species, levels, and moves) using full readable property names.
- [x] Define module-level constants for Gen 3 extraction offsets and lengths.
