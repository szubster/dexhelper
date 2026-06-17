---
id: idea-082-gen3-secret-id-shiny-rng
type: IDEA
title: Gen 3 Secret ID Viewer and Shiny RNG Assistant
status: BLOCKED
owner_persona: tpm
created_at: '2026-06-16'
updated_at: '2026-06-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen3
  - rng
  - shiny-hunting
research_references: []
rejection_reason: Abandoned by maintainer.
notes: ''
---

# Idea: Gen 3 Secret ID Viewer and Shiny RNG Assistant

## Context
In Generation 3, every trainer has a Trainer ID (TID) which is visible, and a Secret ID (SID) which is permanently hidden from the player. The combination of TID and SID determines which Pokémon are "shiny" (alternate color). Because games like Pokémon Emerald have a fixed initial random seed, and games like Ruby/Sapphire with dry batteries also have fixed initial seeds, the "RNG Manipulation" meta is extremely popular. However, manipulating shiny encounters is impossible without knowing the SID.

Players currently have to rely on external, complex tools or capturing an already-shiny Pokémon to calculate their SID.

## Proposal
Leverage DexHelper's programmatic save parsing to extract and display the player's Secret ID (SID) directly from their Gen 3 save file.
- **Trainer Card Expansion:** Add a view displaying the exact SID next to the standard TID.
- **Shiny Frame Calculator Integration:** Provide basic utilities or data exports that format the player's TID/SID combo specifically for use in popular community RNG tools like RNG Reporter or PokéFinder.

## Value Proposition
By surfacing this single hidden variable, DexHelper instantly becomes a mandatory foundational tool for a massive segment of the hardcore playerbase: Shiny Hunters and RNG Manipulators. It bridges the gap between raw save data and advanced community gameplay strategies, perfectly fitting the app's "premium utility" vision.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD to define the implementation of Gen 3 Trainer Data extraction including the SID.
