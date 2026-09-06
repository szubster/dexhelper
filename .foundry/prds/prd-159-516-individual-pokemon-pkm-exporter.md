---
id: prd-159-516-individual-pokemon-pkm-exporter
type: PRD
title: Individual Pokémon PKM/PK3 Exporter
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-09-02'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: '8415511988634348130'
parent: idea-159-individual-pokemon-pkm-exporter
tags:
  - feature
  - gen1
  - gen2
  - gen3
  - export
rejection_reason: ''
---

# PRD: Individual Pokémon PKM/PK3 Exporter

## Overview
Implement an Export Pokémon feature within the DexHelper Party and PC Box views to allow users to download raw binary data for a single Pokémon in PKM and PK3 formats.

## Requirements
1. Add an export action to individual Pokémon detail views in the Party and PC Box.
2. Extract the specific memory block corresponding to the Pokémon from the save file.
3. Generate standard PKM files for Gen 1 and 2, and PK3 files for Gen 3.
4. Trigger a browser download with the correct file name and extension.

## Acceptance Criteria
- [ ] Epic Planner: Break down this PRD into Epics.
