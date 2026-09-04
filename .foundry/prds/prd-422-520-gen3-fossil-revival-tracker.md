---
id: prd-422-520-gen3-fossil-revival-tracker
type: PRD
title: Gen 3 Fossil Revival Tracker
status: READY
owner_persona: epic_planner
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: null
parent: idea-422-gen3-fossil-revival-tracker
tags:
  - dexhelper
  - gen3
  - tracking
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Gen 3 Fossil Revival Tracker

## 1. Context & Goals
The goal of this feature is to provide DexHelper users with a UI tracker for fossil revival processes in Generation 3 games (RSE and FRLG). Players often drop off fossils at the Devon Corporation (RSE) or Cinnabar Lab (FRLG) and forget about them. This tracker will parse the save file to determine if a fossil is currently being revived, which fossil it is, and whether the revived Pokémon is ready for pickup.

## 2. Requirements & Data Extraction
The save parsing engine needs to extract specific event flags or variables to determine the revival status.

### 2.1. Supported Games & Scenarios
*   **Ruby/Sapphire/Emerald (RSE):**
    *   Location: Devon Corporation
    *   Fossils: Root Fossil (Lileep), Claw Fossil (Anorith)
*   **FireRed/LeafGreen (FRLG):**
    *   Location: Cinnabar Island Pokémon Lab
    *   Fossils: Helix Fossil (Omanyte), Dome Fossil (Kabuto), Old Amber (Aerodactyl)

### 2.2. Missing Information (Research Needed)
The exact memory offsets, event flags, or variables tracking fossil states are currently unknown.
*   **Late-Binding Requirement:** A `RESEARCH` node MUST be spawned to determine the exact memory locations (variables/flags) used by Gen 3 games to track fossil drop-off and pickup statuses before implementation begins.

## 3. User Interface (UI)
*   A new UI component on the DexHelper dashboard for Gen 3 saves.
*   It should display the current status. Possible states:
    *   **No Fossil Dropped Off:** (e.g., "No active revivals")
    *   **Processing:** (e.g., "Helix Fossil being revived at Cinnabar Lab")
    *   **Ready for Pickup:** (e.g., "Lileep ready for pickup at Devon Corp!")
*   The UI must adhere to the tactical hardware aesthetic (ADR 008) with `rounded-none`, `border-dashed`, and `font-mono`.

## 4. Acceptance Criteria
- [ ] Epic Planner: Break down this PRD into manageable Epics, including a dedicated Epic for memory offset research.
