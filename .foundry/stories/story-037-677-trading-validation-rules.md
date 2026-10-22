---
id: story-037-677-trading-validation-rules
type: STORY
title: Trading Validation Rules
status: READY
owner_persona: tech_lead
created_at: '2026-10-13'
updated_at: '2026-10-13'
depends_on:
  - story-037-676-trading-core-transfer-logic
jules_session_id: null
pr_number: null
parent: epic-031-037-inter-save-trading
tags:
  - backend
  - trading
  - validation
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Story: Trading Validation Rules

## Context
With the core transfer logic established, we need strict validation rules to enforce game-specific and generation-specific transfer limitations (similar to PKHeX legality checks).

## Requirements
- Implement transfer validation rules (e.g., blocking Gen 2 specific moves from entering Gen 1 saves).
- Handle forward compatibility where permissible (e.g. Gen 1 to Gen 2).
- Prevent invalid items from being traded.

## Acceptance Criteria
- [ ] Tech Lead: Break down into tasks.
