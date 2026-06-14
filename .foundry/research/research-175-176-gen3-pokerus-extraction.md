---
id: research-175-176-gen3-pokerus-extraction
type: RESEARCH
title: Investigate Gen 3 Pokerus Data Extraction
status: ACTIVE
owner_persona: researcher
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: '16329644812449438361'
pr_number: null
parent: null
tags:
  - gen3
  - save-engine
  - pokerus
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Pokerus Data Extraction

## Context
During the audit of `epic-038-061-pokerus-state-exfiltration`, we verified the extraction of Pokerus data (strain and days remaining) from an 8-bit integer in Gen 2 saves using bitwise operators (`>> 4` and `& 0x0f`). This has proven to be an effective strategy for parsing. However, Generation 3 uses a different overarching save structure (the double-buffered flash memory system across 14 Sections) and potentially uses a different internal structure for Pokemon data, including Pokerus.

## Objectives
1. Investigate the location and memory structure of Pokerus flags in Generation 3 saves (Ruby, Sapphire, Emerald, FireRed, LeafGreen).
2. Determine if the bitwise structure (upper 4 bits for strain, lower 4 bits for days remaining) is identical to Gen 2, or if it has changed.
3. Propose a technical strategy for implementing Gen 3 Pokerus extraction within `src/engine/saveParser/parsers/gen3.ts`, noting any dependencies or blockers.

## Output
Update this markdown body with the research findings and create a downstream IDEA or PRD node if actionable work is required to support Gen 3 Pokerus extraction.
