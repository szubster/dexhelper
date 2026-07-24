---
id: idea-121-gen3-mystery-gift-viewer
type: IDEA
title: Gen 3 Mystery Gift Viewer
status: READY
owner_persona: product_manager
created_at: '2024-07-24'
updated_at: '2026-07-24'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - gen3
  - collection
  - mystery-gift
  - premium-feature
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Mystery Gift Viewer

## Description
In Generation 3 (FireRed, LeafGreen, Emerald), Mystery Gift events distributed exclusive items (like the Aurora Ticket or MysticTicket) and Pokémon. Currently, players cannot easily verify what Mystery Gift flags or Wonder Cards are active on their save file without using specialized hex editors.

By extracting the Wonder Card and Mystery Gift event data directly from the Gen 3 `.sav` file, DexHelper can provide a clean, visual dashboard showing the player exactly which event tickets they have received and which related events (like Navel Rock or Birth Island) have been triggered.

## Problem Statement
Collectors and retro gamers who manage their own Gen 3 save files often inject or obtain Mystery Gift Wonder Cards, but lack a user-friendly, read-only interface to view their active Mystery Gift status and history natively within DexHelper.

## Solution
Create a Mystery Gift Viewer dashboard that parses the Mystery Gift blocks from a Gen 3 save file. It will display the active Wonder Cards, received event tickets, and whether the corresponding special island events are accessible, providing a premium collection utility.

## Acceptance Criteria
- [ ] Product Manager: Convert this idea into a PRD to formalize the parsing approach and assign it to an epic for tracking.
