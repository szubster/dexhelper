---
id: idea-121-gen3-e-reader-event-tracker
type: IDEA
title: Gen 3 E-Reader and Mystery Event Tracker
status: PENDING
owner_persona: auditor
created_at: '2026-07-21'
updated_at: '2026-08-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - app
  - gen3
  - collection
  - events
  - hardware
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 3 E-Reader and Mystery Event Tracker

## Context
Generation 3 (Ruby/Sapphire, Emerald, FireRed/LeafGreen) features deeply integrated obscure hardware mechanics, notably the e-Reader (e.g., Eon Ticket, Berry Glitch Fix, specialized trainer battles) and localized Mystery Gift events (e.g., Mystic Ticket, Aurora Ticket, Old Sea Map). Currently, DexHelper lacks a way for collectors and completionists to easily audit which of these extremely rare flags and event items have been triggered or injected into their specific save files.

## Proposal
Implement an "Event and Mystery Gift Audit Dashboard" specifically targeting Gen 3 hardware/event flags.

By systematically parsing the save file for specific event flags (e.g., `FLAG_SYS_EON_TICKET_ENABLE`, `FLAG_ENABLE_MYSTERY_GIFT`, `FLAG_RECEIVED_AURORA_TICKET`) and checking for the presence of the corresponding key items in the Bag (Item ID 0x0113 Eon Ticket, 0x0172 Mystic Ticket, 0x0173 Aurora Ticket, 0x0174 Old Sea Map), DexHelper can display an actionable checklist of obscure hardware and distribution events.

This would further the "premium companion app" ethos by turning hidden save-state data into a visual gallery for players validating injected or legitimate historical distributions.

## Value Proposition
This feature transforms deeply obscure, external hardware dependencies (e-Reader) and regional event distributions into a clean, trackable dashboard. It caters specifically to the hardcore retro-collector audience that values verifying complete save files and historical event preservation, providing immense unique utility not found in standard tracker apps.

## Acceptance Criteria
- [x] prd-121-gen3-e-reader-event-tracker
