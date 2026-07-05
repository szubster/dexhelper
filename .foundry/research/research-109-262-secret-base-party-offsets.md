---
id: research-109-262-secret-base-party-offsets
type: RESEARCH
title: Investigate Gen 3 Secret Base Party Memory Offsets
status: ACTIVE
owner_persona: researcher
created_at: '2026-07-04'
updated_at: '2026-07-05'
depends_on: []
jules_session_id: '16835498824022713118'
pr_number: null
parent: story-070-109-extract-mixed-record-trainer-data
tags:
  - gen3
  - save-parsing
  - secret-base
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Secret Base Party Memory Offsets

## Context
We need to implement parsing for the `SecretBaseParty` structure in Gen 3 save files, but the exact internal memory offsets for each Pokémon's properties (personality, moves, species, heldItems, levels, EVs) are missing from the `gen3_secret_base_offsets.md` knowledge base document. Additionally, there are conflicting notes in the documentation regarding whether `trainerName` is 7 or 8 characters in Emerald, and where `trainerId` begins.

## Objectives
- Determine the exact memory offsets for all 6 properties of the `SecretBaseParty` structure (size 108 bytes).
- Definitively verify the correct lengths and offsets for `trainerName` and `trainerId` in both Ruby/Sapphire and Emerald Secret Base structs.
- Document these findings in `.foundry/docs/knowledge_base/gen3_secret_base_offsets.md`.

## Acceptance Criteria
- [ ] Research and document the 6 `SecretBaseParty` memory offsets.
- [ ] Definitively resolve the `trainerName` and `trainerId` version differences and document them.
