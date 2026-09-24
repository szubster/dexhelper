---
id: task-608-617-multi-box-text-search-engine-impl
type: TASK
title: Multi-Box Text Search Engine Implementation
status: READY
owner_persona: coder
created_at: '2026-09-22'
updated_at: '2026-09-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-574-608-multi-box-text-search-engine
tags:
  - dexhelper
  - feature
  - search
  - pc-box
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Multi-Box Text Search Engine Implementation

## Context
We need to implement the core search functionality for the Multi-Box Search Engine, allowing users to search for specific Pokémon across all boxes using text-based queries against Nickname, Species Name, and OT Name.

## Objectives
- Use the existing global search state (`searchTerm` in `src/store.ts`).
- Update the `BoxAnalyzerView` component to display the filtered list of Pokémon in `saveData.pcDetails`.
- Implement filtering logic against `pokemon.nameLower`, `pokemon.nicknameLower` (if it exists or mapped), and `pokemon.otNameLower` (if it exists or mapped).

## Acceptance Criteria
- [ ] Implement text search filtering for PC Box Pokémon.
- [ ] Filter PC Box Pokémon by Nickname, Species Name, and OT Name.
- [ ] Render the search results efficiently in `BoxAnalyzerView` or a newly created child component.
- [ ] Ensure that string comparisons are case-insensitive.
- [ ] Add unit tests verifying the search logic and component rendering.
