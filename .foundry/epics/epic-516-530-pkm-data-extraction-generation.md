---
id: epic-516-530-pkm-data-extraction-generation
type: EPIC
title: PKM/PK3 Data Extraction and Generation
status: READY
owner_persona: story_owner
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: null
parent: prd-159-516-individual-pokemon-pkm-exporter
tags:
  - data
  - gen1
  - gen2
  - gen3
---

# Epic: PKM/PK3 Data Extraction and Generation

## Overview
This epic focuses on the backend data layer required to export individual Pokémon as raw binary files. It involves extracting the exact memory blocks from Gen 1, Gen 2, and Gen 3 save files and properly formatting them into PKM and PK3 binaries.

## Objectives
- Extract raw memory blocks for individual Pokémon in Gen 1, Gen 2, and Gen 3.
- Format the extracted memory into standard `.pkm` (Gen 1 & 2) and `.pk3` (Gen 3) files.
- Provide a clear interface for the UI to request and receive this binary data.

## Acceptance Criteria
- [ ] Story Owner: Break down this Epic into Stories.
- [ ] Story Owner: Generate a final STORY dedicated exclusively to Integration and E2E Verification.
