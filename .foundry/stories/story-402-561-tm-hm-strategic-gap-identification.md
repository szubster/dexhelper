---
id: story-402-561-tm-hm-strategic-gap-identification
type: STORY
title: Strategic Gap Identification
status: ACTIVE
owner_persona: tech_lead
created_at: '2025-02-14'
updated_at: '2026-09-12'
depends_on: []
jules_session_id: '15057454909006344623'
locks: []
pr_number: null
parent: epic-110-402-tm-hm-compatibility-logic-v2
priority: 50
tags:
  - feature
  - logic
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Strategic Gap Identification

## Overview
This STORY builds upon the compatibility logic to analyze a Pokémon's current moveset and identify strategic coverage gaps that a TM/HM could fill.

## Requirements
- For a Pokémon that is compatible with a TM/HM move, analyze its current active moveset.
- Determine if the Pokémon already knows a move of the same type as the TM/HM move.
- Flag Pokémon that lack a move of that type, highlighting them as strategic targets for learning the TM/HM.

## Acceptance Criteria
- [ ] Break down into TASK nodes for implementing the strategic gap analysis logic and unit testing it.
