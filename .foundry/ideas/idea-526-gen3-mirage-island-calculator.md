---
id: idea-526-gen3-mirage-island-calculator
type: IDEA
title: Gen 3 Mirage Island Radar & PID Match Calculator
status: PENDING
owner_persona: product_manager
created_at: '2026-09-19'
updated_at: '2026-09-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - dexhelper
  - gen3
  - mirage-island
  - calculator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Idea: Gen 3 Mirage Island Radar & PID Match Calculator

## Context
In Generation 3 (Ruby, Sapphire, Emerald), Mirage Island on Route 130 is one of the most famous and elusive locations in Pokémon franchise history. It is the only place to catch wild Wynaut and obtain the unique Liechi Berry. Every day at midnight via the Real-Time Clock (RTC), the game generates a 16-bit random number (`0x0814` offset in Section 1 of the save file). Mirage Island becomes visible if and only if the lower 16 bits (`PID % 65536`) of any Pokémon in the player's current active party match this daily random value. In-game, the player can only talk to an Old Man in Pacificlog Town who vaguely states whether he can see the island or not, providing no indication of which Pokémon or PID value is required.

## Proposed Solution
Introduce a dedicated "Mirage Island Radar & Match Calculator" in DexHelper. By programmatically parsing Gen 3 save files, DexHelper can extract the active 16-bit Mirage Island daily random seed and evaluate all Pokémon across the save file.

*   **Active Island Visibility Status:** Instantly inform the player whether Mirage Island is currently visible on Route 130 with their active party.
*   **Whole-Save PID Match Finder:** Scan all Pokémon across both the active party AND all PC storage boxes to check if any owned Pokémon possesses a matching lower 16-bit PID.
*   **Party Recommendation:** If a matching Pokémon is found in a PC box, display a high-priority alert instructing the player to move that specific Pokémon into their active party to activate Mirage Island.
*   **Target PID Display & Verification:** Surface the exact target 16-bit hex/dec value generated for the day, empowering players and RNG collectors to verify candidate Pokémon.

## Strategic Value
Mirage Island has a 1-in-65,536 daily chance per Pokémon, making manual checking frustrating and opaque. Players often have matching Pokémon sitting unused in their PC boxes without ever knowing it. Surfacing this hidden state transforms an almost impossible random event into an actionable gameplay opportunity, demonstrating DexHelper's value as an advanced companion app.

## Acceptance Criteria
- [ ] prd-526-001-gen3-mirage-island-calculator
