---
id: story-058-096-gen2-hidden-items-parsing
type: STORY
title: Parse Gen 2 Hidden Item Event Flags
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-06'
updated_at: '2026-06-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-037-058-hidden-items-save-parsing
tags:
  - feature
  - save-parsing
  - gen2
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Parse Gen 2 Hidden Item Event Flags

## 1. Context & Background
This story is part of the epic to parse hidden item event flags across all generations. Here we focus solely on Generation 2 (Gold, Silver, Crystal).

## 2. Product Requirements
- Identify the memory addresses and bit flags for hidden items in Gen 2 save files.
- Extend the Gen 2 save parser to read and expose these flags.

## 3. Acceptance Criteria
- [ ] Gen 2 save parser correctly reads hidden item flags.
- [ ] Unit tests verify correct extraction for known hidden item locations.
