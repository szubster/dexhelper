---
id: idea-066-save-file-health-scanner
type: IDEA
title: Save File Health & Corruption Scanner
status: PENDING
owner_persona: product_manager
created_at: '2026-05-26'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: '6077114422208207376'
pr_number: null
parent: null
tags:
  - feature
  - preservation
  - save-file
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Idea: Save File Health & Corruption Scanner

## Context
Generation 1 and 2 Pokémon games are decades old. The original cartridges rely on SRAM and a CR2025/CR2032 battery to maintain save data. As these batteries die or users attempt to backup saves using retro-dumping hardware (like the GBxCart RW), corrupted saves are incredibly common. Sometimes this corruption is subtle (e.g., a single byte flipped in PC Box 8) and goes unnoticed until a player attempts to access that specific data, resulting in game crashes or lost Pokémon.

While DexHelper currently parses valid saves to track completion, it is uniquely positioned to act as a diagnostic tool given its deep understanding of the save file structure (checksums, magic bytes, valid offsets).

## Proposal
Introduce a "Save File Health Scanner" feature. When a user uploads a `.sav` file, before rendering the Pokédex or Storage views, the engine will run a comprehensive integrity check.
- **Checksum Validation**: Verify the main and backup checksums for all save banks.
- **Data Boundary Checks**: Scan for out-of-bounds values (e.g., Pokémon with IDs > 251, invalid DVs, corrupted move sets, or impossible items).
- **Corruption Report**: Generate a detailed diagnostic report pinpointing the exact location (Box, Party slot, or inventory) of detected anomalies, helping users identify data rot *before* it ruins their playthrough.
- **Backup Verification**: If the user is actively attempting to dump their cartridge to PC, they can immediately drop the `.sav` into DexHelper to verify the dump was 100% successful.

## Value Proposition
This feature pivots DexHelper from just a tracking tool into a critical utility for retro game preservation. It solves a massive pain point for retro gamers who live in fear of losing hundreds of hours of progress to battery failure or bad cartridge dumps, providing peace of mind and actionable recovery diagnostics.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD.

### References
- [ ] `.foundry/prds/prd-066-036-save-file-health-scanner.md`

### Auditor Rejection
The generated PRD and Epic nodes are still PENDING. This IDEA node must wait until its entire generated sub-tree is COMPLETED. I have spawned a new node `.foundry/ideas/idea-072-strict-macro-node-completion.md` to address this recurring systemic issue.

### Auditor Rejection (Attempt 3)
The generated PRD and Epic nodes are still PENDING. This IDEA node must wait until its entire generated sub-tree is COMPLETED. The resurrection loop continues to fail because agents are resubmitting without waiting. We must wait for the implementation of IDEA-072 (Strict Macro Node Completion Enforcement).

### Auditor Rejection (Attempt 4)
The generated PRD and Epic nodes are still PENDING. This IDEA node must wait until its entire generated sub-tree is COMPLETED. The resurrection loop continues to fail because agents are resubmitting without waiting. We must wait for the implementation of IDEA-072 (Strict Macro Node Completion Enforcement).

### Auditor Rejection (Attempt 5)
The generated PRD and Epic nodes are still PENDING. This IDEA node must wait until its entire generated sub-tree is COMPLETED. The resurrection loop continues to fail because agents are resubmitting without waiting. We must wait for the implementation of IDEA-072 (Strict Macro Node Completion Enforcement).
