---
id: epic-036-053-health-scanner-core-engine
type: EPIC
title: Health Scanner Core Engine
status: PENDING
owner_persona: story_owner
created_at: '2026-05-31'
updated_at: '2026-06-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-066-036-save-file-health-scanner
tags:
  - feature
  - preservation
  - save-file
  - gen1
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Health Scanner Core Engine

## 1. Goal
Implement the core engine for scanning Gen 1 and Gen 2 Pokémon save files (`.sav`). This engine will perform rigorous integrity checks without modifying the underlying data. It must reliably identify corruption caused by failing batteries or faulty retro-dumping hardware.

## 2. Scope
*   **Checksum Validation:** Re-calculate and verify both main and backup checksums across all relevant save banks for Generation 1 and Generation 2 structures.
*   **Data Boundary Verification:**
    *   Identify out-of-bounds Pokémon IDs (e.g., >151 in Gen 1, >251 in Gen 2).
    *   Verify Determinant Values (DVs) fall within mathematically possible ranges.
    *   Detect corrupted or mathematically impossible movesets based on internal game logic data.
    *   Validate inventory items against known good item index lists.
*   **Diagnostic Output:** The engine should return structured data pinpointing the exact location (e.g., PC Box 8, Party Slot 3, Inventory position) and nature of any detected anomaly, suitable for rendering in a UI.

## 3. Dependencies
None. This is the foundational engine epic.

## 4. Acceptance Criteria
- [x] Story Owner: Break this Epic down into actionable Stories.
- [ ] .foundry/archive/stories/story-053-090-health-scanner-diagnostic-models.md
- [ ] .foundry/stories/story-053-091-health-scanner-gen1-checksum-validation.md
- [ ] .foundry/stories/story-053-092-health-scanner-gen2-checksum-validation.md
- [ ] .foundry/stories/story-053-093-health-scanner-pokemon-bounds-verification.md
- [ ] .foundry/stories/story-053-094-health-scanner-moveset-inventory-validation.md
