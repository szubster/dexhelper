---
id: prd-522-565-gen3-secret-base-radar
type: PRD
title: PRD for Gen 3 Secret Base Radar & Analyzer
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-09-13'
updated_at: '2026-09-16'
depends_on: []
jules_session_id: '10639137465168804836'
pr_number: null
parent: idea-522-gen3-secret-base-radar
tags:
  - dexhelper
  - gen3
  - secret-base
  - map
research_references: []
priority: 30
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# PRD: Gen 3 Secret Base Radar & Analyzer

## Context
In Generation 3 (Ruby, Sapphire, Emerald), players can create "Secret Bases" in specific locations across Hoenn. Tracking these bases and the embedded NPC party data (especially from mixed records) is crucial for players. This PRD details the implementation of a "Secret Base Radar" in DexHelper.

## Requirements
1. **Save File Parsing**: Safely extract the `SecretBase` array from SaveBlock1 using the `DataView` API and relative offsets (supporting A/B bank flash memory architecture), adhering to ADR 010 and schema guidelines.
2. **Global Base Radar**: Display all active Secret Bases with their locations. The locations are determined from `secretBaseId`.
3. **Base Owner Details**: Display the trainer's name (`trainerName`) who owns the base.
4. **NPC Party Analyzer**: Extract and display the Pokémon party for each base owner, including species, levels, and moves.
5. **Decoration Viewer**: As a stretch goal, list the decorations within the base.

## Acceptance Criteria
- [ ] Break down into Epics
