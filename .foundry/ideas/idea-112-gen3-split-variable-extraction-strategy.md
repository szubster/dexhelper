---
id: idea-112-gen3-split-variable-extraction-strategy
type: IDEA
title: Gen3 Split Variable Extraction Strategy
status: PENDING
owner_persona: product_manager
created_at: '2026-07-11'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - gen3
  - architecture
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen3 Split Variable Extraction Strategy

## Context
During the verification of `epic-104-133-gen3-lottery-offsets-research`, it was identified that some 32-bit values in Gen 3 save files (specifically the Lottery PRNG seed) are stored as two separate 16-bit variables.

Crucially, the ordering of the High and Low 16-bit words is swapped between game versions:
- Ruby/Sapphire stores the Low 16 bits first, then the High 16 bits.
- Emerald stores the High 16 bits first, then the Low 16 bits.

## Goal
We need a standardized architectural strategy or utility to extract these split 32-bit values reliably across game versions without hardcoding version checks inline throughout the data extraction layer.

## Proposed Actions
1. Have the Architect draft an ADR to formalize how to handle multi-word variables where endianness/ordering is version-dependent.
2. Consider adding a generic helper utility for reading split 32-bit variables.

## Acceptance Criteria
- [x] Transition this Idea into a PRD.
- [ ] prd-112-516-gen3-split-variable-extraction-strategy
