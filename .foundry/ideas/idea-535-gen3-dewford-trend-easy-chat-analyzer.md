---
id: idea-535-gen3-dewford-trend-easy-chat-analyzer
type: IDEA
title: Gen 3 Dewford Town Trendy Phrase & Easy Chat System Analyzer
status: READY
owner_persona: product_manager
created_at: '2026-10-04'
updated_at: '2026-10-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
priority: 50
confidence_score: null
tags:
  - dexhelper
  - gen3
  - dewford
  - easy-chat
  - feebas
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Gen 3 Dewford Town Trendy Phrase & Easy Chat System Analyzer

## Problem Statement
In Generation 3 (Ruby, Sapphire, Emerald), Dewford Town features a "trendy phrase" system governed by the game's Easy Chat system. Two words chosen from the Easy Chat vocabulary define the current trend in Dewford, which impacts NPC dialogues, record mixing data exchanges, and alters underlying pseudo-random seeds (such as influencing Feebas tile calculations on Route 119 in Ruby/Sapphire).

Because the Easy Chat vocabulary consists of hundreds of dictionary words mapped to specific 16-bit word IDs stored in save memory blocks (`SaveBlock1`), players cannot easily:
1. Inspect their save file's current active Dewford trend phrase or its remaining trend popularity duration.
2. Decode raw Easy Chat word byte pairs into human-readable words across supported localized save games.
3. Analyze how active trendy phrases affect record mixing outcomes or seed shifts when interacting with other players.

## Proposed Solution
Architect a dedicated **Gen 3 Dewford Town Trendy Phrase & Easy Chat System Analyzer** utility in DexHelper:

1. **Trendy Phrase Extraction**: Parse the Dewford trend structures from `SaveBlock1` (including phrase word IDs, trend popularity counters, and submission flags) to display the current trendy phrase in human-readable format.
2. **Easy Chat Dictionary Explorer**: Provide an interactive lookup and decoder for Easy Chat word IDs, allowing players to preview how custom phrases are structured and stored in save data.
3. **Record Mixing & Trend Impact Insights**: Surface telemetry on how the active phrase propagates during record mixing with linked Ruby/Sapphire/Emerald save files and how phrase changes shift associated world states.

## Acceptance Criteria
- [ ] PRD generated detailing Easy Chat word ID lookup tables and Dewford trend save block parsing specifications.
- [ ] Define UI specifications for the Dewford Trend & Easy Chat Analyzer dashboard.
