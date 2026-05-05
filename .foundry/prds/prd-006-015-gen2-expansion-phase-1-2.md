---
id: prd-006-015-gen2-expansion-phase-1-2
type: PRD
title: 'Gen 2 Expansion PRD: Phase 1 and 2'
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-05-04'
updated_at: '2026-05-04'
depends_on: []
jules_session_id: '16390708864537629693'
pr_number: null
parent: .foundry/ideas/idea-006-gen2-expansion.md
tags:
  - gen2
  - expansion
  - save-parser
research_references:
  - .foundry/docs/knowledge_base/development/gen2_implementation_plan.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Expansion PRD: Phase 1 and 2

## 1. Context and Problem Statement
Currently, the application supports basic parsing of Gen 2 save files but lacks the necessary generation-specific logic for full support. Phase 1 and Phase 2 focus on expanding the Save Parser to handle Gen 2 structs and establishing the static knowledge base for Gen 2.

## 2. Objective
Formalize the implementation scope for Phase 1 (Save Parser Expansion) and Phase 2 (Exclusives & Static Data Setup) to provide the engineering team with clear deliverables.

## 3. Requirements

### Phase 1: Save Parser Expansion (Engine Data Layer)
- **Detailed Inventory Parsing**: Implement extraction for Key Items, special Rods, TM/HMs (Headbutt, Rock Smash), Apricorns, and Evolution Items.
- **Hall of Fame & Roamers**: Extract Hall of Fame counts and the dynamic map locations of roaming legendaries (Raikou, Entei, Suicune) directly from RAM.

### Phase 2: Exclusives & Static Data Setup
- **Gen 2 Exclusives Module**: Define availability differences between Gold, Silver, and Crystal versions.
- **Assistant Configuration**:
  - Define static gift data (e.g., Togepi Egg, Eevee from Bill, Shuckle in Cianwood, Dratini, Tyrogue).
  - Define static NPC trade data.

## 4. Next Steps
- [x] **Epic Planner**: Break down this PRD into Epics for Phase 1 and Phase 2.
  - Epic 1: [.foundry/epics/epic-015-026-save-parser-expansion.md](.foundry/epics/epic-015-026-save-parser-expansion.md)
  - Epic 2: [.foundry/epics/epic-015-027-exclusives-and-static-data.md](.foundry/epics/epic-015-027-exclusives-and-static-data.md)
