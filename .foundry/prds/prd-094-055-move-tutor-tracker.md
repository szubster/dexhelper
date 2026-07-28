---
id: prd-094-055-move-tutor-tracker
type: PRD
title: Gen 3 Move Tutor Availability Dashboard PRD
status: PENDING
owner_persona: epic_planner
created_at: '2026-06-30'
updated_at: '2026-07-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-094-move-tutor-tracker
tags:
  - feature
  - gen3
  - move-tutor
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Gen 3 Move Tutor Availability Dashboard

## Problem Statement
In Gen 3 games (FireRed/LeafGreen, Emerald), one-time Move Tutors are scattered across the region. Tracking which tutors remain available is tedious and manual. Cross-referencing available tutor moves with Pokémon in the player's PC boxes requires external resources. This dashboard will parse the save file for event flags and display available/used tutors alongside a list of compatible Pokémon in the PC.

## Target Audience
- Nuzlockers who need specific moves for key battles.
- Competitive players optimizing team builds.
- Casual players looking to maximize resources.

## Value Proposition
- **Automated Tracking:** Eliminates manual note-taking by parsing save file flags directly.
- **Actionable Insights:** Cross-references available moves with the player's current PC boxes.
- **Time Saving:** Removes the need to consult external wikis for move compatibility.

## Functional Requirements
1. **Save Parsing for Move Tutors:**
   - Parse Gen 3 save files to read specific event flags associated with one-time Move Tutors.
   - Utilize the `DataView` API as mandated by ADR 010.
2. **Dashboard UI:**
   - Create a dedicated dashboard view for Move Tutors.
   - Display a list of all one-time Move Tutors.
   - Visually distinguish between "Available" and "Used" tutors based on save file flags.
   - Adhere to the 'tactical hardware/snooping' aesthetic (ADR 008).
3. **Compatibility Cross-Referencing:**
   - For each available tutor, identify the specific move taught.
   - Cross-reference the move's compatibility matrix with the Pokémon currently stored in the player's PC boxes (and Party).
   - Display a visual list/grid of viable Pokémon that can learn the move.
4. **Data Sourcing:**
   - Leverage the existing `PokeData` MsgPack architecture (ADR 015) for move compatibility data.
   - Identify memory offsets and event flag IDs for Move Tutors in Emerald and FireRed/LeafGreen. (This may require a RESEARCH node).

## Non-Functional Requirements
- **Performance:** Parsing and cross-referencing should be fast and non-blocking, ensuring the UI remains responsive, especially with full PC boxes.
- **Robustness:** Gracefully handle corrupted save files or out-of-bounds reads using `RangeError` catching (ADR 010).
- **Extensibility:** The architecture should allow for easy addition of Gen 3 repeatable tutors or expansion to other generations later.

## Dependencies & Pre-requisites
- **Research Needed:** A `RESEARCH` node is likely required to find the exact event flag offsets for Move Tutors in Gen 3 games.

## Out of Scope (for v1)
- Move Tutor tracking for Gen 1/2 or Gen 4+.
- Tracking repeatable/infinite use Move Tutors (e.g., Battle Frontier tutors), as their availability is not state-dependent in the same way (though they could be listed as always available for reference).
- Simulating team builds (only showing compatibility).

## Acceptance Criteria
- [ ] Move Tutor flags are correctly parsed from Emerald and FireRed/LeafGreen save files using `DataView`.
- [ ] A dashboard UI displays available and used Move Tutors clearly, adhering to the tactical aesthetic.
- [ ] For each available tutor, a list of compatible Pokémon from the player's save file (PC/Party) is displayed.
- [ ] Cross-referencing relies on the MsgPack `PokeData` system.

## Generated Epics
<!-- Append generated child EPIC nodes here as unchecked checkboxes -->
- [ ] research-055-247-gen3-move-tutor-offsets
- [ ] epic-055-119-gen3-move-tutor-save-parsing
- [ ] epic-055-120-gen3-move-tutor-compatibility
- [ ] epic-055-121-gen3-move-tutor-dashboard-ui
