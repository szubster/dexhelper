---
id: prd-093-102-gen3-ribbon-dashboard
type: PRD
title: "Gen 3 Ribbon Master Challenge Tracker - UI Dashboard"
status: PENDING
owner_persona: epic_planner
created_at: "2026-07-02"
updated_at: "2026-07-02"
depends_on:
  - prd-093-101-gen3-ribbon-data-extraction
jules_session_id: null
pr_number: null
parent: null
tags:
  - gen3
  - ui
  - endgame
  - completionist
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Gen 3 Ribbon Master Challenge Tracker - UI Dashboard

## Background
Following the extraction of Gen 3 Ribbon and Contest Condition data from save files (see `prd-093-101-gen3-ribbon-data-extraction`), this data must be presented to the user in an actionable, visual format. The Ribbon Master challenge is highly demanding and easy to permanently fail. A dedicated dashboard will significantly improve the user experience by reducing friction and preventing mistakes.

## Objective
This PRD outlines the requirements for building a dedicated "Ribbon Master Dashboard" UI component in DexHelper. This dashboard will consume the Ribbon data extracted by the engine and provide users with a clear overview of their progress for any Pokémon in their party or PC.

## Requirements

### 1. Ribbon Checklist Visualization
*   **Visual Layout:** Create a clear, visually appealing checklist or grid showing all 27 obtainable Gen 3 Ribbons.
*   **Status Indicators:** Clearly distinguish between obtained Ribbons and missing Ribbons (e.g., using opacity, color coding, or distinct icons).
*   **Contest Ribbon Grouping:** Group the 5 categories of Contest Ribbons (Cool, Beauty, Cute, Smart, Tough) logically, and visually indicate the current rank achieved (Normal, Super, Hyper, Master).

### 2. "Challenge Ready" Indicators
*   **Prerequisite Checking:** Cross-reference the Pokémon's current stats (Level, Contest Condition) against the prerequisites for missing Ribbons.
*   **Visual Cues:** Highlight missing Ribbons where the Pokémon is currently "ready" to attempt obtaining them.
    *   *Example 1:* If missing a Master Rank Cool Ribbon, check if the Coolness stat is sufficiently high.
    *   *Example 2:* If missing the Level 50 Battle Tower Ribbon, ensure the Pokémon is Level 50 or below.

### 3. Point-of-No-Return Warnings
*   **Migration Warning:** Display a prominent warning or visual indicator if a user views a Pokémon that is missing available Gen 3 Ribbons, cautioning against transferring it to Gen 4 before completing the challenge.
*   **Irreversible Action Warning:** Alert users if they are about to exceed a level cap (e.g., leveling past 50 before obtaining the Level 50 Battle Tower Ribbon).

### 4. Integration and Styling
*   **Placement:** Integrate the Ribbon Master Dashboard into the existing Pokémon summary/detail view.
*   **Aesthetic Adherence:** Strictly adhere to the project's "tactical hardware/snooping" aesthetic (ADR 008, ADR 024):
    *   Use sharp edges (`rounded-none`).
    *   Use dashed borders (`border-dashed`).
    *   Use monospaced telemetry fonts (`font-mono`).
    *   Utilize Tailwind v4's native `@utility` directives.

## Acceptance Criteria
- [ ] Create UI components to display the 27 Gen 3 Ribbons in a clear checklist format.
- [ ] Implement logic to visually distinguish obtained vs. missing Ribbons based on `PokeData`.
- [ ] Implement "Challenge Ready" prerequisite checking logic and visual indicators.
- [ ] Implement prominent warnings for point-of-no-return actions (e.g., missing Ribbons before migration, level caps).
- [ ] Ensure all new UI components strictly follow the tactical hardware aesthetic guidelines.
- [ ] Write integration tests for the dashboard components, ensuring they render correctly with mocked save data.
