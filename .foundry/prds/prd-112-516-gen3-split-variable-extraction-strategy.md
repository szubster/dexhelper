---
id: prd-112-516-gen3-split-variable-extraction-strategy
type: PRD
title: "Gen3 Split Variable Extraction Strategy"
status: READY
owner_persona: epic_planner
created_at: "2026-09-02"
updated_at: "2026-09-02"
depends_on:
  - .foundry/ideas/idea-158-dataview-composite-wrapper.md
jules_session_id: null
pr_number: null
parent: idea-112-gen3-split-variable-extraction-strategy
tags:
  - gen3
  - architecture
rejection_count: 0
rejection_reason: ""
notes: ""
---

# PRD: Gen3 Split Variable Extraction Strategy

## Objective
Establish a standardized architectural strategy and utility for correctly extracting split 32-bit values (such as the Lottery PRNG seed) from Gen 3 save files, accounting for endianness and ordering differences between Ruby/Sapphire and Emerald versions.

## Background
During the verification of `epic-104-133-gen3-lottery-offsets-research`, it was discovered that some 32-bit variables are stored as two separate 16-bit variables. The high and low 16-bit words are swapped depending on the game version:
- **Ruby/Sapphire**: Low 16 bits first, High 16 bits second.
- **Emerald**: High 16 bits first, Low 16 bits second.

To avoid hardcoded version checks scattered throughout the parsing engine, we need a cohesive strategy and generic utility to handle these cases.

## Requirements
1. **ADR Generation**: The Architect must draft an ADR detailing how to handle multi-word variables where endianness/ordering is version-dependent in Gen 3.
2. **Generic Utility**: Implement a standardized generic utility/helper in the data extraction layer to read split 32-bit variables securely across versions.

## Acceptance Criteria
- [ ] Draft an ADR defining the Gen 3 split 32-bit variable extraction strategy.
- [ ] Create an Epic to implement the generic helper utility based on the ADR.
