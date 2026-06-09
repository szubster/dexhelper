---
id: prd-069-038-mirage-island-predictor
type: PRD
title: Gen 3 Mirage Island Predictor PRD
status: PENDING
owner_persona: epic_planner
created_at: '2026-06-04'
updated_at: '2026-06-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-069-mirage-island-predictor
tags:
  - gen3
  - mirage-island
  - rng
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Gen 3 Mirage Island Predictor PRD

## Overview
This PRD defines the requirements for implementing the Gen 3 Mirage Island Predictor, based on the `idea-069-mirage-island-predictor` node. The feature aims to parse and track the daily Mirage Island random value and cross-reference it against the player's stored Pokémon PIDs to surface matches.

## Proposed Epics Breakdown

To ensure granular execution and minimize complexity, this PRD should be broken down into the following Epics by the `epic_planner`:

### Epic 1: Engine / Parsing Updates
**Objective**: Enhance the Gen 3 save parser to extract the Mirage Island random value and cross-reference it with the PIDs of all Pokémon owned by the player.
- **Logic**: Use the `DataView` API to parse the daily Mirage Island random 2-byte value from the Gen 3 save file structure.
- **Output**: The parsed application data must include the current Mirage Island value and identify any "Mirage Island Key" Pokémon across the active party and all PC storage boxes.
- **Testing**: Requires unit tests verifying the extraction logic and correctly identifying matching PIDs.

### Epic 2: UI / Notification Updates
**Objective**: Surface the Mirage Island status in the user interface.
- **Logic**: Add a dedicated tracker view or notification indicating whether the player currently possesses a matching Pokémon for the current day.
- **Display**: If a match is found, highlight exactly which Pokémon it is and which PC Box it resides in.
- **Design Constraints**: Must adhere strictly to the "tactical hardware/snooping" aesthetic (`rounded-none`, dashed borders, monospace fonts) as defined in ADR 008.

## Acceptance Criteria
- [x] Epic 1 (Engine Updates) node created.
- [x] Epic 2 (UI Updates) node created.

- [ ] .foundry/epics/epic-038-061-mirage-island-engine.md
- [ ] .foundry/epics/epic-038-062-mirage-island-ui.md
