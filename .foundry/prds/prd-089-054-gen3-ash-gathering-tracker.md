---
id: prd-089-054-gen3-ash-gathering-tracker
type: PRD
title: PRD for Gen 3 Volcanic Ash Gathering Tracker
status: PENDING
owner_persona: epic_planner
created_at: "2026-06-28"
updated_at: "2026-06-28"
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-089-gen3-ash-gathering-tracker
tags:
  - feature
  - gen3
  - mechanics
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# PRD: Gen 3 Volcanic Ash Gathering Tracker

## 1. Context & Problem Statement
In Generation 3 (Ruby, Sapphire, Emerald), players can gather volcanic ash on Route 113 by walking or running through the ash-covered grass with the Soot Sack. The ash can be exchanged at the Glass Workshop for items like the Blue Flute or White Flute, as well as secret base furniture.

The game tracks the exact number of steps taken in the ash grass, which represents the ash count. However, this count is hidden from the player. To know if they have gathered enough ash for a desired item, the player must repeatedly return to the Glass Workshop NPC to check. This process is tedious and time-consuming.

By extracting the Volcanic Ash count from the Gen 3 save file, DexHelper can provide a precise, actionable dashboard for players, eliminating the need to guess or run back and forth to the NPC.

## 2. Target Audience
- Hardcore completionists grinding for specific flutes or furniture.
- Casual players who want to save time and track their progress efficiently.
- Any player exploring Route 113 in a Gen 3 game.

## 3. Product Features & Requirements

### 3.1. Save File Parsing (Engine)
- **Requirement:** Extract the current Volcanic Ash count (step counter) from the Gen 3 save file (Ruby, Sapphire, Emerald).
- **Constraint:** All parsing logic MUST utilize the `DataView` API to enforce bounds checking and prevent silent failures, as mandated by ADR 010.
- **Dependency:** A `RESEARCH` node must be spawned or incorporated to discover the precise memory offsets for the Volcanic Ash counter in `SaveBlock1` or `SaveBlock2` for Ruby/Sapphire and Emerald.

### 3.2. Ash Tracker Dashboard (UI)
- **Requirement:** Create a dedicated UI view or panel within DexHelper that explicitly displays the player's current Volcanic Ash count.
- **Requirement:** Integrate this view contextually (e.g., within the location details for Route 113 or the Glass Workshop).
- **Design Constraint:** The dashboard component MUST adhere to the tactical hardware aesthetic defined in ADR 024. This includes utilizing Tailwind v4 `@utility` classes (e.g., `tactical-panel`), sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts (`font-mono`).

### 3.3. Goal Planner
- **Requirement:** Implement a feature allowing the player to select a target item they wish to exchange ash for.
- **Data Needed:** A static mapping of Glass Workshop items and their required ash costs:
  - Blue Flute (250 steps)
  - Yellow Flute (500 steps)
  - Red Flute (500 steps)
  - White Flute (1000 steps)
  - Black Flute (1000 steps)
  - Pretty Chair (6000 steps)
  - Pretty Desk (8000 steps)
- **Requirement:** Display a progress bar or remaining step count showing how much more ash is required to afford the selected target item.

## 4. Architecture & Technical Considerations
- **Data Layer:** Expand the `PokeData` or save parsing output to include the `volcanicAsh` count property for Gen 3 states.
- **UI Consistency:** Ensure the new Ash Tracker components reuse existing layout patterns and state management (Zustand) for consistency.
- **No PokeAPI Dependency:** This feature relies entirely on internal logic and local save data, adhering to the offline-first modernization strategy.

## 5. Acceptance Criteria
- [ ] Epic Planner: Break down this PRD into corresponding EPICs (e.g., Save Parsing, UI Dashboard, Goal Planner Logic).
