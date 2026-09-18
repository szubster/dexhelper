---
id: epic-565-569-gen3-secret-base-parsing
type: EPIC
title: Gen 3 Secret Base Data Extraction & Parsing
status: READY
owner_persona: story_owner
created_at: '2026-09-16T20:44:15Z'
updated_at: '2026-09-16T20:44:15Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-522-565-gen3-secret-base-radar
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

# EPIC: Gen 3 Secret Base Data Extraction & Parsing

## Context
In Generation 3 (Ruby, Sapphire, Emerald), players can create "Secret Bases" in specific locations across Hoenn. This epic covers parsing the save file (SaveBlock1) to safely extract the `SecretBase` array, utilizing the `DataView` API and handling relative offsets to support A/B bank flash memory architecture according to ADR 010.

## Requirements
1. **Save File Parsing**: Safely extract the `SecretBase` array from SaveBlock1 using the `DataView` API and relative offsets (supporting A/B bank flash memory architecture), adhering to ADR 010 and schema guidelines.
2. **NPC Party Analyzer**: Extract the Pokémon party for each base owner, including species, levels, and moves.

## Acceptance Criteria
- [x] Break down into Stories
- [x] Generate an exclusive STORY dedicated to Integration and E2E Verification.
- [ ] story-569-581-gen3-secret-base-array-extraction
- [ ] story-569-582-gen3-secret-base-party-extraction
- [ ] story-569-583-gen3-secret-base-parsing-e2e
