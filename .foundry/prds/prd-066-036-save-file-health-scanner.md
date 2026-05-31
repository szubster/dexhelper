---
id: prd-066-036-save-file-health-scanner
type: PRD
title: Save File Health & Corruption Scanner
status: READY
owner_persona: epic_planner
created_at: '2026-05-29'
updated_at: '2026-05-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - preservation
  - save-file
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Save File Health & Corruption Scanner

## 1. Problem Statement
Generation 1 and 2 Pokémon games use SRAM and batteries for save data, leading to a high rate of corrupted saves over decades. Players attempting backups using retro-dumping hardware often encounter subtle corruption (e.g., byte flips) that remains unnoticed until a game crash or data loss occurs.

## 2. Objective
Leverage DexHelper's deep understanding of save file structures (checksums, magic bytes, valid offsets) to introduce a diagnostic feature. The "Save File Health Scanner" will run a comprehensive integrity check on `.sav` files before rendering the main UI, generating a detailed report on any corruption.

## 3. Scope & Requirements

### 3.1. Integrity Checks
- **Checksum Validation**: Verify main and backup checksums across all save banks for both Gen 1 and Gen 2 formats.
- **Data Boundary Verification**: Identify out-of-bounds data points, such as:
  - Pokémon IDs exceeding valid maximums (e.g., >151 in Gen 1, >251 in Gen 2).
  - Invalid DVs (Determinant Values).
  - Corrupted or impossible movesets.
  - Invalid inventory items.

### 3.2. User Interface & Reporting
- **Pre-Render Interception**: When a `.sav` is uploaded, perform the health scan prior to allowing access to Pokédex or Storage views.
- **Diagnostic Report**: Present a detailed, actionable report pinning the exact location (e.g., PC Box 8, Party Slot 3, Inventory position) of any detected anomalies.
- **Successful Dump Validation**: Give clear feedback when a save dump is 100% valid, assuring users of a successful backup from hardware to PC.

## 4. Non-Goals
- Fixing or automatically repairing corrupted save data. This PRD strictly focuses on scanning, diagnostics, and reporting.

## 5. Acceptance Criteria
- [x] Epic Planner: Break this PRD down into actionable Epics.

## 6. Generated Epics
- [ ] .foundry/epics/epic-036-053-health-scanner-core-engine.md
- [ ] .foundry/epics/epic-036-054-diagnostic-reporting-ui.md
