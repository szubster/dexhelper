---
id: prd-104-109-missed-trainer-radar
type: PRD
title: Missed Trainer Radar PRD
status: PENDING
owner_persona: epic_planner
created_at: '2026-07-11'
updated_at: '2026-08-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-104-missed-trainer-radar
tags:
  - feature
  - gen1
  - gen2
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Missed Trainer Radar Product Requirements Document (PRD)

## Objective
Implement a "Missed Trainer Radar" feature that parses the save file's trainer defeat event flags for Generations 1 through 3 to build a comprehensive dashboard of trainers that the player has encountered but not yet defeated, providing actionable insights such as route locations, team compositions, and expected rewards.

## Background
Players often accidentally or deliberately skip trainers during their initial route traversal. Later, when they need EXP or EVs, finding these skipped trainers is tedious. By surfacing hidden trainer defeat event flags, we provide a "bounty board" that optimizes their playthrough.

## Requirements

### Data Extraction
1.  **Gen 1 Extraction:** Map and parse trainer defeat flags for Generation 1 games.
2.  **Gen 2 Extraction:** Map and parse trainer defeat event flags from Bank 1 for Generation 2 games.
3.  **Gen 3 Extraction:** Map and parse trainer defeat flags (including Rematch flags) for Generation 3 games.
4.  **Data Structure:** The extracted flags must be mapped against statically defined trainer data to identify their locations, team composition (species, level), and reward yield (EXP, EVs, Money).
5.  **Adherence to Cured Boundaries ADR (ADR 026):** All flag extractions must utilize explicit bitwise masking and shifting, and absolute zero boundary states must be comprehensively tested.

### UI Dashboard
1.  **Encounter Filter:** The UI must display trainers the player has encountered (based on story progress, badges, or visited locations) but not yet defeated.
2.  **Trainer Information Display:** Each entry must display the trainer's exact route/location, Pokémon team composition, and aggregate rewards.
3.  **Aesthetics:** The UI should follow the project's tactical, snooping aesthetic as defined by existing ADRs and the UI style guides.

## Acceptance Criteria
- [ ] .foundry/archive/epics/epic-109-306-missed-trainer-data-extraction-gen1-gen2.md
- [ ] .foundry/epics/epic-109-307-missed-trainer-data-extraction-gen3.md
- [ ] .foundry/archive/epics/epic-109-308-missed-trainer-radar-ui.md
- [ ] epic-109-498-missed-trainer-ui-gen3
- [x] Break down into Epics
