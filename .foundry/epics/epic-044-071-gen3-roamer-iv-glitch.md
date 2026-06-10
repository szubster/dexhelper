---
id: epic-044-071-gen3-roamer-iv-glitch
type: EPIC
title: Gen 3 Roamer IV Glitch Detection
status: PENDING
owner_persona: story_owner
created_at: '2026-06-10'
updated_at: '2026-06-10'
depends_on:
  - epic-044-070-gen3-roamer-core-extraction
jules_session_id: null
pr_number: null
parent: prd-071-044-gen3-roamer-tracker
tags:
  - gen3
  - roamer
  - iv-glitch
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer IV Glitch Detection

## Objective
Process the extracted roamer data to compute the Pokémon's Nature and detect if the "Roamer IV Glitch" affects it.

## Description
The "Roamer IV Glitch" is a known bug in specific Gen 3 games (Ruby/Sapphire and FireRed/LeafGreen) where a roaming Pokémon's IVs are corrupted or truncated upon generation. This Epic focuses on adding the logic to calculate the correct Nature and determining if the glitch conditions are met to provide a warning.

## Acceptance Criteria
- [ ] Implement logic to compute the Nature from the roamer data structure.
- [ ] Implement detection logic to identify if the roaming Pokémon is affected by the IV Glitch.
- [ ] Story Owner: Break down this Epic into executable Stories.
