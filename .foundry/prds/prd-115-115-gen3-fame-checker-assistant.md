---
id: prd-115-115-gen3-fame-checker-assistant
type: PRD
title: Gen 3 Fame Checker Progress & Assistant
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-07-14'
updated_at: '2026-07-17'
depends_on: []
jules_session_id: '16718105700076690052'
pr_number: null
parent: idea-115-gen3-fame-checker-assistant
tags:
  - gen3
  - firered
  - leafgreen
  - fame-checker
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Gen 3 Fame Checker Progress & Assistant

## 1. Problem Statement
The Fame Checker in Pokémon FireRed and LeafGreen tracks lore about prominent NPCs. Tracking missing entries is tedious because the in-game UI only shows acquired entries. Players have to guess missing entries and use external wikis.

## 2. Solution
Leverage DexHelper's save parsing to read hidden event flags for Fame Checker progress. Create a dashboard that explicitly shows players what entries they are missing and exactly where to find them in their specific save state.

## 3. Scope
- Parse event flags related to the Fame Checker in FireRed/LeafGreen.
- Create UI dashboard to display unlocked and missing Fame Checker entries for each NPC.
- Provide actionable location/action hints for missing entries.
