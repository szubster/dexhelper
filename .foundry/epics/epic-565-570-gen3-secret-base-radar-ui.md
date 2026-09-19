---
id: epic-565-570-gen3-secret-base-radar-ui
type: EPIC
title: Gen 3 Secret Base Radar Dashboard & UI
status: PENDING
owner_persona: story_owner
created_at: '2026-09-16T20:44:15Z'
updated_at: '2026-09-18'
depends_on:
  - epic-565-569-gen3-secret-base-parsing
jules_session_id: null
pr_number: null
parent: prd-522-565-gen3-secret-base-radar
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

# EPIC: Gen 3 Secret Base Radar Dashboard & UI

## Context
Once the Secret Base data is extracted from the save file, we need to build a UI radar dashboard to visualize the data. This epic covers building the UI to display active bases with locations, trainer names, NPC parties, and potentially decorations.

## Requirements
1. **Global Base Radar**: Display all active Secret Bases with their locations. The locations are determined from `secretBaseId`.
2. **Base Owner Details**: Display the trainer's name (`trainerName`) who owns the base.
3. **NPC Party Analyzer**: Display the Pokémon party for each base owner, including species, levels, and moves.
4. **Decoration Viewer**: As a stretch goal, list the decorations within the base.

## Acceptance Criteria
- [ ] Break down into Stories
- [ ] Generate an exclusive STORY dedicated to Integration and E2E Verification.
