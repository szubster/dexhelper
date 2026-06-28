---
id: prd-086-054-box-duplicate-analyzer
type: PRD
title: PC Box Duplicate Analyzer & Release Assistant
status: PENDING
owner_persona: epic_planner
created_at: '2026-06-22'
updated_at: '2026-06-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-086-box-duplicate-analyzer
tags:
  - feature
  - ui
  - ux
  - gen2
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Product Requirements Document: PC Box Duplicate Analyzer & Release Assistant

## 1. Context & Problem Statement
End-game activities in Pokémon Generation 2 and 3—such as breeding for perfect IVs, shiny hunting, or Safari Zone runs—result in PC boxes filling up with dozens of identical Pokémon species. The in-game UI is notoriously slow and lacks the ability to quickly compare hidden stats like DVs/IVs, Natures (in Gen 3), and Hidden Power. Players are forced to manually check each Pokémon individually to decide which to keep for competitive use and which to release, leading to significant friction and wasted time.

## 2. Proposed Solution
Build a "Duplicate Analyzer" view inside DexHelper's PC Box tracking system. This tool will:
1. Parse the save file and automatically group all Pokémon in the PC boxes by species.
2. Provide a side-by-side comparison matrix for each species group.
3. Highlight critical competitive stats (DVs/IVs, Natures, Hidden Power Type and Base Power, Shininess).
4. Allow users to tag specific duplicates as "To Release" directly within DexHelper, acting as a checklist they can reference when returning to the game to mass-release the unwanted Pokémon.

## 3. Scope & Requirements

### 3.1 Data Grouping & Aggregation
- **Grouping:** Pokémon stored in the PC must be aggregated across all boxes and grouped by their species ID.
- **Exclusions:** The system should only analyze PC Box data. Party Pokémon should be excluded from the mass release checklist to prevent accidental release of active team members.

### 3.2 Comparison Matrix UI
- **Stat Columns:** The matrix must display the following data points for each duplicate:
  - Pokémon Level and Gender.
  - Individual Values (DVs for Gen 2, IVs for Gen 3) for all stats (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed).
  - Calculated IV Total or Average.
  - Nature (Gen 3 only).
  - Hidden Power (Type and calculated Base Power).
  - Shiny status indicator.
- **Highlighting:** The UI should visually highlight the "best" stats within a group (e.g., highlighting a perfect 31 IV in green) to make quick visual scanning easy.

### 3.3 "To Release" Checklist Workflow
- **Tagging System:** Users must be able to toggle a "To Release" state for any Pokémon in the matrix.
- **Checklist View:** A dedicated summary view or persistent sidebar should display all tagged Pokémon, clearly indicating their Box Number and Slot/Position, so the player can easily find them in the game.
- **Persistence:** These UI tags do NOT modify the `.sav` file (we do not write to save files). They should persist locally (e.g., in IndexedDB or component state) during the active session.

## 4. User Experience (UX) Goals
- **Clarity:** The comparison matrix must use monospaced fonts and a dense, tabular layout to fit as much comparative data on screen as possible, adhering to the "tactical hardware" aesthetic (ADR 024).
- **Speed:** Grouping and calculating IVs/Hidden Power for hundreds of Pokémon must be near-instantaneous upon loading the `.sav` file.

## 5. Next Steps
- [ ] Break down this PRD into Epics for backend parsing extensions and frontend UI implementation.
