---
id: prd-424-001-gen3-interactive-map-dashboard
type: PRD
title: Gen 3 Interactive Map Dashboard PRD
status: READY
owner_persona: epic_planner
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-424-gen3-interactive-map-dashboard
tags:
  - dexhelper
  - feature
  - gen3
  - map
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Gen 3 Interactive Map Dashboard PRD

## Product Requirements Document

### 1. Objective
Transform the scattered Gen 3 geospatial data into a unified, visually engaging "Interactive Map" dashboard. This map will serve as the central hub for players to view their in-game state geographically across the Hoenn region, supporting Ruby, Sapphire, and Emerald saves.

### 2. Scope & Features
- **Map Base Layer:** A high-quality image asset of the Hoenn region map.
- **Player Location Pin:** An indicator showing where the player currently is.
- **Roamer Tracking:** An icon/indicator for Latias/Latios' current location.
- **Berry Farming Overlay:** Visual indicators on routes containing active/grown berries.
- **TV Swarm/Outbreak Overlay:** Highlight the route of the current swarm.
- **Feebas Tiles (Stretch):** Route 119 specific overlay.
- **Interactive Tooltips:** Hovering/clicking on an overlay element should provide detailed information (e.g., exact berries planted, roamer stats).

### 3. User Interface (UI) Layout
- **Full-Width Canvas:** The map should take up the majority of the dashboard space.
- **Toggle Controls:** A side panel or top bar with toggles (e.g., "Show Berries", "Show Roamers") to declutter the map if needed.
- **Aesthetic:** Must adhere strictly to the "tactical hardware/snooping" aesthetic (ADR 008) — sharp edges (`rounded-none`), dashed borders, monospaced telemetry fonts (`font-mono`), and high contrast indicators against the map backdrop.

### 4. Data Integration Strategy
- **Extraction:** Continue utilizing the existing Gen 3 save file parsing logic (using relative offsets for section parsing).
- **Mapping:** We need a coordinate mapping system (e.g., a JSON file) that maps in-game `mapBank` and `mapId` (or specific route IDs) to X/Y pixel coordinates on the base map asset.
- **State Management:** Use a React Context or a centralized Zustand store to manage the toggle states and the currently selected map features.

### 5. Open Questions / Research Needs
- **Asset Acquisition:** Where will we source the high-quality Hoenn map asset, and is it appropriately licensed/clean?
- **Coordinate Mapping:** Creating the coordinate map manually might be tedious. Can we find existing data, or should a specific research task be created for it?

## Acceptance Criteria
- [ ] Epic Planner: Break this PRD down into EPIC nodes, explicitly including an E2E verification STORY.
