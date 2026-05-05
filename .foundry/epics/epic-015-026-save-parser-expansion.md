---
id: epic-015-026-save-parser-expansion
type: EPIC
title: 'Phase 1: Save Parser Expansion'
status: ACTIVE
owner_persona: story_owner
created_at: '2026-05-04'
updated_at: '2026-05-05'
depends_on: []
jules_session_id: '7015515826154438326'
pr_number: null
parent: .foundry/prds/prd-006-015-gen2-expansion-phase-1-2.md
tags:
  - gen2
  - save-parser
research_references:
  - .foundry/docs/knowledge_base/development/gen2_implementation_plan.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Phase 1: Save Parser Expansion

## Context
The current save parser logic (`src/engine/saveParser/parsers/gen2.ts`) is missing parsing capabilities for several key aspects of Gen 2 structure, such as extended inventories and dynamic roamers. This Epic breaks down Phase 1 of the Gen 2 Implementation Plan.

## Objectives
Implement the missing data extraction layers for Gen 2 save files to provide accurate data for the engine.

## High-level Acceptance Criteria
- [x] Detailed Inventory Parsing: Able to extract Key Items, Special Rods, TM/HMs (Headbutt, Rock Smash), Apricorns, and Evolution Items.
- [ ] Hall of Fame & Roamers: Able to extract the Hall of Fame counts and the specific map locations of roaming legendaries (Raikou, Entei, Suicune).

## Stories
- [.foundry/stories/story-026-041-inventory-parsing.md](.foundry/stories/story-026-041-inventory-parsing.md)
