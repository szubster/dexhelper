---
id: epic-516-531-pkm-export-ui-integration
type: EPIC
title: PKM/PK3 Export UI Integration
status: ACTIVE
owner_persona: story_owner
created_at: '2026-09-04'
updated_at: '2026-11-06'
depends_on:
  - epic-516-530-pkm-data-extraction-generation
jules_session_id: '6883151170347422398'
parent: prd-159-516-individual-pokemon-pkm-exporter
tags:
  - ui
  - export
locks: []
rejection_reason: ''
---

# Epic: PKM/PK3 Export UI Integration

## Overview
This epic focuses on integrating the PKM/PK3 generation logic into the user interface. Users must be able to click an export action on individual Pokémon detail views to download the corresponding binary file.

## Objectives
- Add an "Export" action to individual Pokémon detail views in the Party view.
- Add an "Export" action to individual Pokémon detail views in the PC Box view.
- Trigger browser downloads with the correct file name and extension (`.pkm` or `.pk3`).

## Acceptance Criteria
- [x] Story Owner: Break down this Epic into Stories.
- [x] Story Owner: Generate a final STORY dedicated exclusively to Integration and E2E Verification.
- [ ] story-531-743-pkm-export-ui-component
- [ ] story-531-744-pkm-export-e2e-verification
