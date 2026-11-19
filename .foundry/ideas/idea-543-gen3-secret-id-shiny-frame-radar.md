---
id: idea-543-gen3-secret-id-shiny-frame-radar
type: IDEA
title: Gen 3 Secret ID (SID) Extraction & Shiny Frame Encounter Radar
status: READY
owner_persona: product_manager
created_at: '2026-11-04'
updated_at: '2026-11-04'
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: null
priority: 50
confidence_score: 100
tags:
  - dexhelper
  - gen3
  - shiny
  - rng
  - saveParser
  - radar
research_references: []
experiment_variants: []
rejection_count: 0
system_failure_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Secret ID (SID) Extraction & Shiny Frame Encounter Radar

## Context & Problem Statement
In Generation 3 (Ruby, Sapphire, Emerald, FireRed, LeafGreen), shiny determination depends strictly on a bitwise XOR calculation combining the trainer's Public Trainer ID (`TID`), the trainer's hidden Secret Trainer ID (`SID`), and the Pokémon's 32-bit personality value (`PID`):
`Shiny = ((TID ^ SID) ^ (PID_high ^ PID_low)) < 8`

While the player's 5-digit Public Trainer ID (`TID`) is visible on the Trainer Card, the 16-bit Secret ID (`SID`) is completely hidden from normal gameplay. Players seeking wild shiny Pokémon or evaluating RNG encounter frames (especially in Pokémon Emerald and dry-battery Ruby/Sapphire where the PRNG starts from a fixed seed of `0x00000000` or the initial boot timer) have no built-in or visual way to know their exact SID or identify upcoming shiny frames.

Currently, DexHelper extracts trainer profile information and box Pokémon, but:
1. It does not extract or surface the player's `SID` from the Trainer Info block in the save file, nor does it deduce it from owned shiny Pokémon in the PC boxes.
2. Players lack a predictive "Shiny Frame Radar" utility to know what personality values (`PID`) would trigger shininess for their save's specific `TID`/`SID` pair, and how many PRNG advances or target encounter frames yield shiny spreads for static legendaries (e.g. Rayquaza, Kyogre, Groudon, Mewtwo) or wild encounters.

## Proposed Solution
Introduce a dedicated **Gen 3 Secret ID (SID) Extraction & Shiny Frame Encounter Radar** into DexHelper:
1. **Trainer Info SID Extraction**:
   - Extract the 16-bit `SID` from Section 0 (Trainer Info Block) across Gen 3 games (`Ruby/Sapphire`, `Emerald`, `FireRed/LeafGreen`) alongside the existing `TID` in `src/engine/saveParser/gen3/`.
   - Provide an optional fallback derivation algorithm that calculates candidate `SID` values if an existing shiny Pokémon caught by the original trainer (`OT`) is present in the player's party or PC boxes.
2. **PRNG Frame Simulator Engine (`Gen3RngRadar`)**:
   - Implement the standard Gen 3 Linear Congruential Generator (`next_seed = (seed * 0x41C64E6D + 0x6073) & 0xFFFFFFFF`).
   - Given the game version (Emerald fixed seed `0`, dry battery RS seed `0`, or live RTC seed) and the extracted `TID`/`SID`, compute the next $N$ shiny frames, displaying their frame index, elapsed time (minutes/seconds at 60 FPS), resulting nature, ability, and IV spread (Method 1 for static/legendary encounters, Method 2/4 for wild encounters).
3. **Tactical Shiny Radar UI (`ShinyFrameRadarView`)**:
   - Present a tactical telemetry panel adhering to ADR 008 and ADR 024 (`tactical-panel`, `border-dashed`, `font-mono`, `rounded-none`).
   - Display the player's exact `TID` and `SID` in a secure telemetry readout.
   - Filterable target encounter table showing upcoming shiny frames, target nature, target stats, and target encounter delay countdown.

## Impact & Value
- **Premium Collector Utility**: Unlocks one of the most requested and essential mechanics for Generation 3 collectors, shiny hunters, and speedrunners without requiring external third-party closed-source calculators.
- **Deep Save File Integration**: Directly surfaces hidden save state values (`SID`) that standard games keep obscured, fulfilling DexHelper's vision as the ultimate companion tool.
- **Strategic System Balance**: Adds a rich, mechanics-driven product capability to DexHelper following recent Foundry orchestrator improvements.

## Acceptance Criteria
- [ ] Product Manager: Draft a comprehensive PRD specifying the Gen 3 SID extraction rules, PRNG frame calculation engine, and Shiny Radar UI requirements.
- [ ] Save Parser: Implement 16-bit `SID` extraction from Gen 3 Trainer Info blocks in `src/engine/saveParser/gen3/` with unit test validation.
- [ ] Engine: Implement the Gen 3 PRNG simulation utility supporting Method 1 and Method 2/4 PID/IV spread calculations for given `TID`/`SID` pairs.
- [ ] UI: Create `ShinyFrameRadarView` utilizing tactical styling primitives (`tactical-panel`, `tactical-table`) to display SID telemetry and shiny frame countdowns.
- [ ] Tests: Add comprehensive unit tests and Playwright integration tests covering SID extraction and shiny frame calculations.
