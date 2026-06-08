---
id: prd-068-039-mirage-island-ui-alerts
type: PRD
title: Gen 3 Mirage Island UI Alerts
status: PENDING
owner_persona: epic_planner
created_at: '2026-06-04'
updated_at: '2026-06-04'
depends_on:
  - .foundry/prds/prd-068-038-mirage-island-data-extraction.md
jules_session_id: null
pr_number: null
parent: idea-068-mirage-island-predictor
tags:
  - feature
  - gen3
  - mirage-island
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Mirage Island UI Alerts

## Context
Following the extraction of the Gen 3 Mirage Island daily value (`prd-068-038-mirage-island-data-extraction`), we need to build the user interface to notify players when they own a Pokémon in their PC box that matches the required value to trigger Mirage Island.

## Requirements

1. **PC Scanner Logic**: Implement a client-side utility or hook that continuously (or on state change) scans all boxed Pokémon and the current party. It should identify any Pokémon whose lower 16 bits of their personality value match the current daily Mirage Island value.
2. **Alert Component**: Design and implement a notification or alert component that is prominently displayed on the dashboard when a matching Pokémon is found. This alert should clearly state:
   - That Mirage Island can be triggered today.
   - Which specific Pokémon (species, nickname, box location) has the matching personality value.
3. **Empty State / Negative State**: When no matching Pokémon is found, there should be a subtle indication (or no indication) that the scan was performed, without cluttering the UI.

## Constraints
- The UI must strictly follow the "tactical hardware/snooping" aesthetic as defined in ADR 008 (sharp edges, dashed borders, monospaced fonts).
- Ensure the alert logic is performant and does not lock the React UI thread, especially given the potentially large number of Pokémon to scan.

## Acceptance Criteria
- [ ] Epic Planner: Generate child epics that implement the PC scanner logic and the alert component adhering to the tactical aesthetic constraints.
