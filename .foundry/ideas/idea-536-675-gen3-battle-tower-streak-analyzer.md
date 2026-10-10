---
id: idea-536-675-gen3-battle-tower-streak-analyzer
type: IDEA
title: Gen 3 Battle Tower Win Streak & Opponent AI Predictor
status: PENDING
owner_persona: product_manager
created_at: '2026-10-10'
updated_at: '2026-10-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
confidence_score: 90
tags:
  - battle-frontier
  - gen3
  - save-parser
  - analytics
---

# Idea: Gen 3 Battle Tower Win Streak & Opponent AI Predictor

## Problem
In Generation 3 (Ruby, Sapphire, Emerald, FireRed, LeafGreen), the Battle Tower is a major post-game challenge where players aim for 50+ or 100+ win streaks to earn Silver/Gold Ability Symbols and rare ribbons (e.g., Winning Ribbon, Victory Ribbon). However:
1. **Opaque Streak State**: Save files contain detailed current and record win streaks across Level 50 and Open Level modes (for Single, Double, Multi, and Link battles), but players cannot inspect their streak history or see how close they are to milestone bosses (e.g., Salon Maiden Anabel).
2. **Hidden Opponent Roster Mechanics**: Opponent trainer teams in the Battle Tower are drawn from set trainer pools with randomized sets based on current streak tiers (e.g., Tier 1-7+ difficulty levels). Players often lose long streaks to unexpected quick claw / OHKO move combinations or specific speed tier threats.
3. **Team Preparation Friction**: Players struggle to optimize party compositions against the Battle Tower AI decision engine without manual spreadsheet lookups.

## Proposed Solution
Introduce a dedicated **Battle Tower Streak & Tactical Companion** in DexHelper (`src/engine/saveParser/` and UI dashboard):
1. **Save File Extraction**:
   - Extract current and max win streak counters, record holders, and active round progress for Level 50 and Open Level categories across Gen 3 games.
   - Extract active streak party structure if saved mid-challenge.
2. **Streak Progress & Milestone Tracker**:
   - Display visual progress bars toward Anabel Silver Symbol (35 wins) and Gold Symbol (70 wins) or Emerald Frontier Gold Symbols.
   - Provide streak history summaries and battle record statistics.
3. **Opponent Roster & Threat Matrix**:
   - Given the current win streak tier, display potential opponent trainer classes, possible Pokémon sets, EV spreads, move pools, and held items.
   - Highlight high-risk threats (e.g., OHKO users, Quick Claw, BrightPowder, Status inflictors) based on the current active party's typing and stats.

## Value
Provides Gen 3 competitive collectors, Ribbon Masters, and Battle Frontier players with actionable insights and prep tools to safely climb the Battle Tower, preserving high win streaks and optimizing party selection.

## Acceptance Criteria
- [ ] Draft PRD for Gen 3 Battle Tower streak analyzer and AI threat predictor
