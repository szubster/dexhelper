---
id: research-322-396-gen3-trainer-defeat-flags-offsets
type: RESEARCH
title: Investigate Gen 3 Trainer Defeat Flags Offsets
status: PENDING
owner_persona: researcher
created_at: '2026-08-04'
updated_at: '2026-08-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-319-322-gen3-trainer-flags-extraction-impl
tags:
  - data-extraction
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Trainer Defeat Flags Offsets

## Objective
Investigate the exact memory offsets, lengths, bit locations, and bit shifts for trainer defeat flags (both standard and rematch flags) in Generation 3 save files (Ruby, Sapphire, Emerald, FireRed, LeafGreen).

## Context
The current implementation of the Missed Trainer Radar requires extracting trainer defeat flags from Gen 3 save files. However, the exact memory locations and structures for these flags (especially standard trainer defeat flags) are currently missing from the knowledge base. This information is needed to implement the extraction logic correctly without relying on magic numbers or guessing.

## Questions to Answer
1. Where are the standard trainer defeat flags located in Gen 3 saves (RSE and FRLG)? Which section/offset? Are they within `SaveBlock1` or `SaveBlock2`?
2. How are standard trainer defeat flags structured (e.g. array of bytes, bitfield)? How many flags are there?
3. What are the specific offsets and logic for Rematch flags (e.g. VS Seeker data in FRLG)?
