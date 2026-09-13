---
id: idea-522-gen3-secret-base-radar
type: IDEA
title: Gen 3 Secret Base Radar & Analyzer
status: PENDING
owner_persona: product_manager
created_at: "2026-09-12"
updated_at: "2026-09-12"
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - dexhelper
  - gen3
  - secret-base
  - map
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
locks: []
---

# Idea: Gen 3 Secret Base Radar & Analyzer

## Context
In Generation 3 (Ruby, Sapphire, Emerald), players can create "Secret Bases" in specific trees, bushes, and caves across Hoenn. When players mix records with friends, their friends' secret bases appear in their world, complete with their party (which can be battled daily) and decorations. However, keeping track of where these mixed-record bases are located, and what Pokémon are inside them, is impossible within the game itself. Players often forget where a friend's base is, or worse, accidentally overwrite it because the game only allows a limited number of active bases.

## Proposed Solution
Introduce a "Secret Base Radar" in DexHelper. By parsing the Gen 3 save file, DexHelper can extract the locations, owners, and embedded NPC party data for all active Secret Bases in the player's world.

*   **Global Base Radar:** Display a list (or highlight on an interactive map) of all currently active Secret Bases in the save file, including the player's own base and those imported via record mixing.
*   **Base Owner Details:** For each imported base, display the name of the friend (Trainer Name) who owns it.
*   **NPC Party Analyzer:** Extract and display the Pokémon party contained within the base. This is incredibly valuable for players using Secret Bases for EV training or EXP farming (e.g., the famous "Level 100 Blissey base"), allowing them to verify the party before traveling there.
*   **Decoration Viewer:** (Stretch Goal) List the decorations currently placed in the base.

## Strategic Value
This perfectly aligns with DexHelper's goal of surfacing hidden state. Secret Bases are a core mechanic of Gen 3 multiplayer, but tracking them is completely opaque. This feature transforms DexHelper into an essential tool for players managing multiple record-mixed saves, continuing the focus on premium, offline-first companion features.
