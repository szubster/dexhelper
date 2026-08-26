---
id: idea-159-individual-pokemon-pkm-exporter
type: IDEA
title: Individual Pokémon PKM/PK3 Exporter
status: READY
owner_persona: product_manager
created_at: '2026-08-20'
updated_at: '2026-08-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen1
  - gen2
  - gen3
  - export
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Individual Pokémon PKM/PK3 Exporter

## Context
Players often get deeply attached to specific Pokémon during their playthroughs, particularly in challenges like Nuzlockes or when discovering a full-odds Shiny. While DexHelper successfully reads save data to display these Pokémon, there is currently no way to extract an individual Pokémon out of the save file. Third-party tools like PKHeX allow this, but they are desktop-only applications that require manually moving the full save file around.

## Proposal
Implement an "Export Pokémon" feature within the DexHelper Party and PC Box views.
- **Format Support:** Export individual Pokémon data to the standard `.pkm` (Gen 1/2) and `.pk3` (Gen 3) file formats.
- **One-Click Download:** Allow users to download the raw binary file for a single Pokémon directly from the web UI.
- **Integration with Third-Party Tools:** The resulting files will be fully compatible with external tools (like PKHeX or battle simulators), allowing players to back up, trade, or analyze their favorite team members without managing the entire `.sav` file.

## Value Proposition
This significantly improves the utility of DexHelper for the hardcore community. It bridges the gap between DexHelper (a read-only dashboard) and the wider ecosystem of Pokémon save editing/backup tools, allowing players to archive their beloved "Hall of Fame" or shiny Pokémon securely and easily directly from their browser.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD.
