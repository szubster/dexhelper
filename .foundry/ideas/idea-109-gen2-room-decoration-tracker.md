---
id: idea-109-gen2-room-decoration-tracker
type: IDEA
title: Gen 2 Room Decoration & Mom's Savings Tracker
status: READY
owner_persona: product_manager
created_at: '2026-07-09'
updated_at: '2026-07-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Room Decoration & Mom's Savings Tracker

## The Problem
In Generation 2 (Gold, Silver, Crystal), the player's room can be decorated with various items such as beds, carpets, posters, game consoles, and dolls. Many of these items are unlocked through obscure or hidden methods, like Mystery Gift interactions or by having the player's Mom save money.

The current system relies entirely on manual tracking or constantly running back to the player's house and checking the PC to see what has been unlocked. Furthermore, Mom's savings and what she has bought for the player are completely opaque, making it difficult for completionists to know if they have obtained all possible decorations.

## Proposed Solution
We should introduce a "Room Decoration & Savings" dashboard for Gen 2 save files. By parsing the exact event flags and memory blocks associated with room decorations and Mom's bank account, we can expose this hidden state directly in the DexHelper app.

### Key Features:
1. **Decoration Inventory Viewer:** Display all unlocked room decorations categorized by type (Beds, Plants, Posters, Consoles, Ornaments, Dolls) vs. the complete list of possible decorations.
2. **Mom's Savings Tracker:** Show the current amount of money saved by Mom.
3. **Unlock Progress:** For decorations unlocked via Mom's savings, show the progress towards the next threshold (e.g., how much more needs to be saved to unlock the Snorlax Doll).
4. **Mystery Gift Tracker:** Highlight which decorations can only be obtained via Mystery Gift, helping players focus their efforts.

## Value Proposition
This aligns perfectly with DexHelper's vision as a premium companion app for retro games. It transforms an opaque, hard-to-track, and version-specific mechanic into an easily understandable and actionable dashboard. It provides immense value to completionists and hardcore players who want to fully complete their Gen 2 experience without tedious in-game guesswork.

## Acceptance Criteria
- [x] Break down into PRD
- [ ] prd-109-112-gen2-room-decoration-tracker
