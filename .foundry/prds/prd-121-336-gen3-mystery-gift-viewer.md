---
id: prd-121-336-gen3-mystery-gift-viewer
type: PRD
title: Gen 3 Mystery Gift Viewer
status: READY
owner_persona: epic_planner
created_at: '2024-07-24'
updated_at: '2026-07-24'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-121-gen3-mystery-gift-viewer
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

## Problem Statement
In Generation 3 (FireRed, LeafGreen, Emerald), Mystery Gift events distributed exclusive items (like the Aurora Ticket or MysticTicket) and Pokémon. Currently, players cannot easily verify what Mystery Gift flags or Wonder Cards are active on their save file without using specialized hex editors. Collectors and retro gamers who manage their own Gen 3 save files often inject or obtain Mystery Gift Wonder Cards, but lack a user-friendly, read-only interface to view their active Mystery Gift status and history natively within DexHelper.

## Solution
Create a Mystery Gift Viewer dashboard that parses the Mystery Gift blocks from a Gen 3 save file. It will display the active Wonder Cards, received event tickets, and whether the corresponding special island events are accessible.

## Requirements
- Data Extraction: Parse Mystery Gift blocks and Wonder Card data from Gen 3 `.sav` files.
- UI Dashboard: Create a user-friendly read-only dashboard to display active Wonder Cards, event tickets, and access to special island events.
- Data Integration: Integrate with existing save file parsing pipeline.

## Out of Scope
- Save file modification (injecting Wonder Cards or events). The feature is strictly read-only.
- Gen 1 or 2 Mystery Gift events.

## Acceptance Criteria
- [ ] Epic Planner: Break down this PRD into manageable Epics and Tasks for data extraction, UI dashboard creation, and testing.
