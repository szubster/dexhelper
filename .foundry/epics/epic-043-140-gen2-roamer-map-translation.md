---
id: epic-043-140-gen2-roamer-map-translation
type: EPIC
title: Gen 2 Roamer Map Translation
status: PENDING
owner_persona: story_owner
created_at: '2026-07-06'
updated_at: '2026-07-06'
depends_on:
  - epic-043-139-gen2-roamer-data-extraction
jules_session_id: null
pr_number: null
parent: prd-070-043-roamer-tracking-dashboard
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Roamer Map Translation

## Objective
Translate the raw `mapGroup` and `mapId` bytes extracted from the Gen 2 save files into human-readable Route names corresponding to the UI's routing system and map rendering components.

## Description
- The raw `mapGroup` and `mapId` bytes are internal engine concepts.
- Implement mapping logic to translate these raw bytes into recognizable route identifiers (e.g., "Route 34").
- Ensure the translation logic leverages existing `gen2Graph.ts` mapping structures or creates specific lookup tables if necessary.

## Acceptance Criteria
- [ ] Gen 2 raw map coordinates for roamers are translated into human-readable route names.
- [ ] Fallback logic is present if a map coordinate cannot be translated (e.g., "Unknown Location").
- [ ] Story Owner: Break down this Epic into executable Stories.
