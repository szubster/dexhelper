---
id: prd-524-566-multi-box-search-filtering
type: PRD
title: Multi-Box Advanced Search and Filtering System
status: READY
owner_persona: epic_planner
created_at: '2026-09-16T23:02:43Z'
updated_at: '2026-09-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-524-multi-box-search-filtering
tags:
  - dexhelper
  - ux
  - search
  - pc-box
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# PRD: Multi-Box Advanced Search and Filtering System

## Context
As defined in IDEA-524, finding a specific Pokémon across up to 14 boxes in Gen 3 is a tedious, manual process. This PRD details the requirements for a global, multi-box search and filtering system for DexHelper's Box Viewer, allowing users to search across all boxes simultaneously.

## Target Audience
Hardcore Pokémon players, collectors, and breeders who use DexHelper to manage large save files.

## Functional Requirements

### 1. Global Text Search
- A text input field in the Box Viewer UI.
- **Search Scope:**
  - Pokémon Nickname (case-insensitive partial match).
  - Pokémon Species Name (case-insensitive partial match).
  - Original Trainer (OT) Name (case-insensitive partial match).

### 2. Attribute Filters
- A set of dropdowns or toggle buttons for filtering by specific attributes.
- **Filter Categories:**
  - **Nature:** Dropdown to select one of the 25 natures.
  - **Ability:** Dropdown to select abilities.
  - **Gender:** Toggles for Male, Female, Genderless.
  - **Held Item:** Dropdown or search field for held items.

### 3. Stretch Goals: Stat Filters
- Filters to find Pokémon with specific IVs or EVs.
- Useful for identifying breeding stock or EV-trained Pokémon.

### 4. Visual Highlighting (UX)
- **Active Search State:** When a search query or filter is active, the UI must dim (reduce opacity) Pokémon in the box grid that DO NOT match the criteria.
- **Highlight Matches:** Matching Pokémon remain fully visible, drawing the user's eye instantly.
- **Spatial Preservation:** The spatial organization of the boxes must NOT break. Empty slots and non-matching Pokémon still occupy their normal grid positions.

## Acceptance Criteria
- [x] Epic Planner: Break down this PRD into EPICs detailing the implementation steps for the multi-box search and filtering system.
- [ ] epic-566-574-multi-box-search-engine
- [ ] epic-566-575-multi-box-stat-filters
- [ ] epic-566-576-multi-box-search-ui
- [ ] epic-566-577-multi-box-integration
