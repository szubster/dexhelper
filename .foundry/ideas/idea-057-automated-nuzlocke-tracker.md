---
id: idea-057-automated-nuzlocke-tracker
type: IDEA
title: Automated Nuzlocke Verification and Run Tracker
status: PENDING
owner_persona: product_manager
created_at: '2026-05-18'
updated_at: '2026-07-01'
depends_on: []
jules_session_id: null
parent: null
tags:
  - feature
  - nuzlocke
  - verification
notes: >-
  Resurrected: Auditor found that automated encounter tracking and the status
  dashboard are missing.
rejection_reason: ''
---

# Idea: Automated Nuzlocke Verification and Run Tracker

## Context
A large portion of the Pokémon community plays with self-imposed "Nuzlocke" rules (e.g., catching only the first encounter per route, permanent death for fainted Pokémon). Currently, players use manual spreadsheets or external web tools to track their route encounters and deaths. DexHelper, as a save file analyzer, is perfectly positioned to automate this entirely.

## Proposal
Create a dedicated "Nuzlocke Tracker" mode in DexHelper.
- **Automated Encounter Tracking:** By reading the `met_location` of all owned Pokémon in the save file, DexHelper can automatically populate a route checklist, flagging if multiple Pokémon share the same catch location (a rule violation).
- **Death Tracking:** Automatically detect Pokémon with 0 HP or Pokémon moved to a user-designated "Grave" PC Box, marking them as dead in the UI.
- **Run Status Dashboard:** Provide a visual summary of the run, showing available routes, completed routes, current team, and the graveyard.

## Value Proposition
This significantly reduces the friction of playing Nuzlocke challenges on original hardware or emulators by removing manual data entry. It leverages our existing robust save parsing and location mapping capabilities to provide a unique feature no other tool currently offers automatically.

## Next Steps
- [x] Product Manager: Convert this idea into a PRD.

## Acceptance Criteria
- [x] prd-057-026-automated-nuzlocke-tracker
- [ ] prd-057-097-automated-nuzlocke-tracker
