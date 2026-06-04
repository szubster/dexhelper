---
id: prd-068-037-hidden-items-finder
type: PRD
title: Missing Hidden Items Finder Feature
status: PENDING
owner_persona: architect
created_at: '2026-06-01'
updated_at: '2026-06-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-068-hidden-items-finder
tags:
  - feature
  - tool
  - quality-of-life
  - save-parsing
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Missing Hidden Items Finder

## 1. Context & Background
In Generation 1, 2, and 3, hidden items are scattered throughout the game world, often requiring the Itemfinder or randomly pressing the A button. Since there is no in-game tracker, completionists frequently lose track of which high-value items (Rare Candies, PP Ups, evolution stones) they have already collected, leading to tedious backtracking with external guides.

As DexHelper already parses the save file, we can read the underlying event flags for hidden items and present a unified, dynamic checklist. This actionable insight feature directly aligns with our goal of eliminating retro-gaming friction.

## 2. Product Requirements

### 2.1 Event Flag Parsing
- Extend the Gen 1, Gen 2, and Gen 3 save parsing engines to read the hidden item event flags.
- Map the parsed flags to known hidden item locations in each game.

### 2.2 Data Structure & Aggregation
- Define a structured data model to represent hidden item details: location, item type, and whether it has been acquired (based on the save state).
- Ensure the data can easily be mapped and filtered.

### 2.3 UI / Presentation Layer
- Create a dedicated "Missing Hidden Items Finder" view within DexHelper.
- Display a categorized checklist of valuable hidden items (grouped by route, town, or region).
- Dynamically check off items that the player has already picked up in their current save file.
- Implement the 'tactical hardware/snooping' aesthetic (sharp edges, dashed borders, monospaced telemetry fonts) for this component as defined in ADR 008.

## 3. Acceptance Criteria
- [ ] Save parsing engine successfully extracts event flags for Gen 1, Gen 2, and Gen 3 hidden items.
- [ ] UI component is built displaying the checklist, filtered and grouped logically.
- [ ] UI updates dynamically to check off acquired items upon save file hydration.
- [ ] Appropriate unit tests are added for the save parser extensions.
- [ ] E2E tests verify the new view correctly renders based on an initialized save state.
