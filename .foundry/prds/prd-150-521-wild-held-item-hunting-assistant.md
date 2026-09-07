---
id: prd-150-521-wild-held-item-hunting-assistant
type: PRD
title: PRD - Wild Held Item Hunting Assistant
status: READY
owner_persona: epic_planner
created_at: '2026-08-15'
updated_at: '2026-08-15'
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: idea-150-wild-held-item-hunting-assistant
tags:
  - dexhelper
  - feature
  - gen2
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Product Requirements Document: Wild Held Item Hunting Assistant

## Objective
To provide a Wild Held Item Hunting Assistant for DexHelper that aids players in efficiently hunting and tracking valuable held items on wild Pokemon in Gen 2 and Gen 3 games. The tool will leverage save state parsing to guide players and automatically track item acquisition.

## User Flows

1. **Item Selection & Hunt Initiation:**
   - The user opens the Wild Held Item Hunting Assistant section in DexHelper.
   - The user selects a target item to hunt (e.g., "Lucky Egg", "Light Ball", "Thick Club").
   - The assistant displays the best routes and encounters for wild Pokemon holding the selected item, including encounter rates and held item drop rates.

2. **Team Optimization (Thief/Covet Tracker):**
   - The assistant parses the user's uploaded save state to analyze the current Party and PC Boxes.
   - It identifies and highlights Pokemon that know item-stealing moves like "Thief" or "Covet", suggesting them for the hunt.

3. **Progress Tracking & Notification:**
   - As the player uploads new save states during the hunt, the assistant automatically scans the Bag inventory, Party Pokemon held items, and PC Box Pokemon held items.
   - If the target item is detected as newly acquired, the assistant provides a celebratory success notification.

## Technical Requirements
- **Save File Parsing:** Must parse Gen 2 and Gen 3 save files to read the Bag, Party, and PC Boxes.
- **Pokemon Data Context:** Must leverage DexHelper's Pokemon data (e.g., encounters, held item lists and percentages) to show location suggestions.
- **Move Analysis:** Must analyze the movesets of caught Pokemon to find "Thief" (Gen 2/3) and "Covet" (Gen 3).
- **E2E & Integration:** The feature requires full End-to-End coverage testing its UI and state tracking upon save state uploads.
- **Data Naming Schema:** Ensure MsgPack (`msgpackr`) with `useRecords: true` is used and adherence to the PokeData Property Naming Schema.

## Acceptance Criteria
- [ ] Epic Planner: Break down this PRD into Epics.
