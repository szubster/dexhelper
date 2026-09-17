---
id: idea-524-multi-box-search-filtering
type: IDEA
title: Multi-Box Advanced Search and Filtering System
status: ACTIVE
owner_persona: product_manager
created_at: '2026-09-14'
updated_at: '2026-09-16'
depends_on: []
jules_session_id: '1602137279398163470'
pr_number: null
parent: null
tags:
  - dexhelper
  - ux
  - search
  - pc-box
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Idea: Multi-Box Advanced Search and Filtering System

## Context
As users progress deeply into their Pokémon games, their PC Box storage becomes filled with hundreds of Pokémon across up to 14 boxes (in Gen 3). Finding a specific Pokémon (e.g., a Modest natured Pokémon with Synchronize, or a specific HM slave) becomes a manual, tedious hunt clicking through every single box.

## Proposed Solution
Implement a global, multi-box advanced search and filtering system for DexHelper's Box Viewer. Instead of just viewing one box at a time, users can enter queries or use toggle filters to search across all boxes simultaneously.

Features should include:
- **Global Text Search:** Find by Nickname, Species name, or Original Trainer (OT).
- **Attribute Filters:** Filter by Nature, Ability (especially useful in Gen 3 for tracing/synchronizing), Gender, or Held Item.
- **Stat Filters:** (Stretch Goal) Highlight Pokémon that have a specific perfect IV (e.g., finding breeding stock) or specific EVs.
- **Visual Highlighting:** When a search is active, dim non-matching Pokémon in the box grid, instantly drawing the eye to the matches without breaking the spatial organization of the boxes.

## Strategic Value
This directly addresses a massive pain point for hardcore players and collectors (the primary demographic for DexHelper). It elevates DexHelper from a simple "save viewer" into a powerful "save manager/analyzer," maintaining the 50/50 balance of prioritizing high-impact product features.

## Acceptance Criteria
- [ ] Product Manager: Draft a PRD detailing the search query syntax, filter toggles, and UX for the multi-box search highlighting.
