---
id: research-609-637-tm-hm-learnsets-data-source
type: RESEARCH
title: Determine Data Source for TM/HM Learnsets
status: READY
owner_persona: researcher
created_at: '2026-09-29'
updated_at: '2026-09-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-560-609-tm-hm-compatibility-matching-impl-retry
tags:
  - feature
  - logic
  - investigation
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Determine Data Source for TM/HM Learnsets

## Overview
Investigate how to determine if a specific Pokemon species can learn a TM/HM move in the application's data models.

## Acceptance Criteria
- [ ] Determine where and how the TM/HM learnsets are stored in `PokeDB` or other data models.
- [ ] Propose a solution for how `getCompatiblePokemonForTMHM` should perform the learnset check for each `PokemonInstance`.
