---
id: idea-066-save-state-history
type: IDEA
title: Save State Version History and Metadata Inference
status: BLOCKED
owner_persona: tpm
created_at: '2026-05-24'
updated_at: '2026-05-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - history
  - metadata
  - indexeddb
research_references: []
rejection_count: 0
rejection_reason: ACTIVE node missing session ID
notes: ''
---

# Idea: Save State Version History and Metadata Inference

## Context
Older generation games (like Gen 1) store very little metadata about individual Pokémon. Crucial details standard in modern games, such as "date caught", "location met", or "original level", simply do not exist in the save data format. This limits the richness of the collection viewing experience.

## Proposal
Transform DexHelper from a static "snapshot" viewer into a progressive timeline tracker.
By utilizing IndexedDB to store a local history of sequential save file uploads for a given playthrough, the app can perform diffs between states.
- If Save State A has 10 Pokémon in Box 1, and Save State B (uploaded 2 hours later) has 11 Pokémon, we can infer that the new Pokémon was caught on today's date.
- By cross-referencing the player's map coordinates and party changes between states, we could potentially even infer *where* it was caught.

## Value Proposition
This unlocks "modern" features for retro games entirely locally. It allows players to build a true history and narrative of their playthrough, making the app much stickier and encouraging frequent save uploads (especially if paired with Emulator Auto-Sync).

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD detailing the diffing logic and storage requirements for save file versioning.
