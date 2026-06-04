---
id: prd-066-036-feebas-tile-predictor
type: PRD
title: Gen 3 Feebas Tile Predictor
status: PENDING
owner_persona: architect
created_at: '2026-05-30'
updated_at: '2026-05-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-066-feebas-tile-predictor
tags:
  - feature
  - gen3
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Gen 3 Feebas Tile Predictor

## Objective
Provide a feature to read the player's Gen 3 save file to extract the Dewford Town trendy phrase/Feebas seed, calculate the exact 6 water tiles on Route 119 where Feebas can be caught, and display these tiles visually to the user.

## Background
In Pokémon Ruby, Sapphire, and Emerald, Feebas can only be found by fishing on 6 random water tiles out of hundreds on Route 119. These tiles are determined by a hidden seed stored in the player's save file, which changes when the "trendy phrase" in Dewford Town is updated. Finding these tiles manually is incredibly tedious. By programmatically parsing the save file and extracting the Feebas seed, we can pinpoint the exact locations and present them visually, turning a multi-hour task into a 1-minute task.

## Scope & Functional Requirements

1. **Memory Offset Investigation & Research**:
   - Determine the exact memory offset for the Feebas seed in Ruby, Sapphire, and Emerald save files.

2. **Extraction Utility**:
   - Create a utility module that reads the parsed save file's data at the identified offset.
   - Implement the PRNG/math algorithm used by Gen 3 to translate the seed into the 6 specific tile coordinates on Route 119.

3. **Visual Route 119 Component**:
   - Design and build a visual map component specifically for Route 119.
   - The component should dynamically overlay indicators (e.g., highlights or markers) on the target water tiles based on the extracted coordinates.

## Non-Functional Requirements
- **Performance**: The seed extraction and tile calculation must be fast and happen concurrently with normal save file hydration.
- **Accuracy**: The calculated tiles must be 100% accurate based on the decompiled Gen 3 game logic.

## Acceptance Criteria
- [ ] Research: Spawn a RESEARCH node to investigate the exact memory offset for the Feebas seed in R/S/E save files.
- [ ] Architect: Produce an Architecture Decision Record (ADR) detailing how to integrate the Feebas tile visualization into the existing UI.
- [ ] Epic: Break down into Epics for backend parsing/logic and frontend visualization.
