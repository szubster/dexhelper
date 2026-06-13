---
id: story-086-129-move-generation-discrepancies
type: STORY
title: "Handle Move Generation Discrepancies"
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on:
  - story-086-128-move-data-extraction
jules_session_id: null
pr_number: null
parent: epic-049-086-dynamic-move-pp-parsing
tags:
  - refactor
  - build
  - db
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Handle Move Generation Discrepancies

## Background
Moves can have different stats (like PP, Power, Accuracy) across different generations. The initial extraction gets the base data, but we must account for historical generation differences, especially Gen 1-3.

## Goals
1. Process the extracted move data to apply generation-specific overrides where necessary.
2. Ensure base PP values are accurately stored, leaving max PP calculations to the client runtime as per ADR 025.

## Acceptance Criteria
- [ ] Identify generation discrepancies for moves relevant to Gen 1-3.
- [ ] Apply necessary overrides to the extracted move data.
- [ ] Verify that base PP is stored correctly according to the target generation.
