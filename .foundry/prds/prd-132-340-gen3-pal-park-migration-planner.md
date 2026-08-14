---
id: prd-132-340-gen3-pal-park-migration-planner
type: PRD
title: Gen 3 Pal Park Migration Planner PRD
status: PENDING
owner_persona: epic_planner
created_at: '2026-08-07'
updated_at: '2026-08-07'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-132-gen3-pal-park-migration-planner
tags:
  - feature
  - gen3
  - migration
research_references: []
notes: ''
---

# PRD: Gen 3 Pal Park Migration Planner

## Objective
To build a "Pal Park Migration Planner" utility within DexHelper for Gen 3 save files that streamlines the manual preparation of Pokémon for transfer to Gen 4.

## Features
- **Migration Batching:** Flag Pokémon in Gen 3 PC boxes and group them into "Batches of 6".
- **HM Validation:** Scan for HM moves (Surf, Cut, Strength, etc.) and warn the user.
- **Item Transfer Optimization:** Highlight held items (Master Balls, rare berries, Leftovers).
- **Physical PC Locator:** Display Box and Slot for flagged Pokémon.

## UI Layout
The Pal Park Migration Planner will consist of a dedicated dashboard with two primary panels:
1. **Source Box View (Left Panel):**
   - Displays a grid mirroring the in-game Gen 3 PC Boxes.
   - Users can select a Box from a dropdown and click individual Pokémon to flag them for migration.
   - Flagged Pokémon will have a distinct visual border or icon.
2. **Migration Queue (Right Panel):**
   - Displays a scrollable list of "Batches". Each Batch has exactly 6 slots.
   - As Pokémon are flagged in the Source Box View, they automatically populate the next available slot in the active Batch.
   - Each slot displays the Pokémon sprite, nickname, Box/Slot location, and icons indicating held item status and HM validation status.
3. **Action Bar (Bottom):**
   - Contains controls to "Clear Queue" and "Export Checklist".

## HM Validation Logic
Pal Park rejects any Pokémon knowing an HM move. The validation logic must accurately identify these moves.
- **Validation Execution:**
  - Upon flagging a Pokémon, the utility will check its four move slots against the Gen 3 HM Move List (which includes moves like Surf, Cut, and Strength).
  - If a match is found, the Pokémon is flagged with a red "HM Warning" icon in the Migration Queue.
  - Clicking the icon will display a tooltip specifying the HM move(s) that must be deleted in-game before migration can occur.

## Acceptance Criteria
- [ ] Epic Planner: Break this PRD down into Epics.
