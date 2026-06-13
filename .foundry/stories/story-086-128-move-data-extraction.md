---
id: story-086-128-move-data-extraction
type: STORY
title: "Move Data Extraction from PokeAPI"
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on:
  - adr-049-025-dynamic-pokedata-parsing
jules_session_id: null
pr_number: null
parent: epic-049-086-dynamic-move-pp-parsing
tags:
  - refactor
  - build
  - db
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Move Data Extraction from PokeAPI

## Background
As part of the EPIC to dynamically generate move PP PokeData, we need to first extract the base move parameters from our existing dataset or PokeAPI.

## Goals
1. Implement the initial data extraction pipeline in `scripts/generate-pokedata.ts` to fetch move data.
2. Focus on extracting `id`, `name`, `type`, `power`, `accuracy`, `pp`, `damage_class`, and `effect_chance` as defined in ADR 025.

## Acceptance Criteria
- [ ] Determine how to fetch move data efficiently during the build.
- [ ] Implement the extraction logic to capture the necessary fields for each move.
- [ ] Ensure that default values and nulls are appropriately handled at the extraction boundary.
