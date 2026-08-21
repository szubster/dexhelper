---
id: story-133-274-living-dex-evolution-material
type: STORY
title: Living Dex Evolution Material Detection
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-06'
updated_at: '2026-08-21'
depends_on:
  - story-133-273-living-dex-pc-mapping
jules_session_id: null
pr_number: null
parent: epic-103-133-living-dex-data-engine
tags:
  - feature
  - living-dex
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Living Dex Evolution Material Detection

## Context
This story implements the logic to detect raw materials for evolution to fill missing slots. For example, recognizing that the player has a duplicate Bulbasaur that can be evolved to fill a missing Ivysaur slot.

## Acceptance Criteria
- [x] Implement logic to detect raw materials for evolution to fill missing slots.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
- [x] task-274-439-living-dex-evolution-duplicate-logic-impl
- [x] task-274-440-living-dex-evolution-material-mapping-impl
- [x] task-274-441-living-dex-evolution-material-qa
