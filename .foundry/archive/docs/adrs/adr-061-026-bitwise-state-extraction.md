---
id: adr-061-026-bitwise-state-extraction
type: ADR
title: 'ADR 026: Bitwise State Extraction and Cured Boundaries'
status: COMPLETED
owner_persona: architect
created_at: '2026-06-19'
updated_at: '2026-06-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-038-061-pokerus-state-exfiltration
tags:
  - architecture
  - save-engine
  - parsing
  - bitwise
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# ADR 026: Bitwise State Extraction and Cured Boundaries

## Context
When extracting state from Pokémon save files, data is frequently compressed into single bytes via bitwise flags (e.g., the Pokerus status byte, which combines the "strain" and "days remaining" into a single 8-bit integer).
In previous generations, parsing these bytes directly into boolean or simple numeric states led to regressions when scaling, specifically because these bitfields contain specific combinations of bits that represent distinct edge case states (e.g., the game engine treating a non-zero strain with zero days remaining differently than an absolute zero state).

## Decision
We formally standardize the pattern for bitwise state extraction across the parsing engine:
1.  **Explicit Bitwise Logic**: Parsers MUST use explicit bitwise shifting (`>>`) and masking (`&`) to isolate multi-value bitfields into discrete properties rather than evaluating the entire byte.
2.  **Cured State Enforcement**: Any bitwise data structure representing a "condition" that degrades or changes over time (like Pokerus or Contest conditions) MUST explicitly define and test its boundary states (such as the "cured" state where the identity/strain is non-zero but the duration is zero).
3.  **Comprehensive Boundary Testing**: All parsing logic involving bitwise extraction MUST be accompanied by extensive unit tests that explicitly cover:
    -   Absolute zero state (uninfected/uninitialized).
    -   Boundary states (cured/expired).
    -   Max boundary values (e.g., max strain and max days remaining).

## Consequences
-   **Positive**: This guarantees parsing regressions will not occur when migrating logic to Gen 3 or Gen 4, where bitwise structures become increasingly dense.
-   **Positive**: Distinguishing accurately between states like "uninfected" and "cured" enables richer UI logic (e.g., showing a Pokerus dot icon for cured Pokémon).
-   **Negative**: Requires additional boilerplate testing around bitwise masking logic for data fields that might seem trivially numeric.

## Acceptance Criteria
- [x] Standardize bitwise extraction and cured boundary testing rules.
