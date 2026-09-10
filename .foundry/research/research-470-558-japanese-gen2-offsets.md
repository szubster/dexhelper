---
id: research-470-558-japanese-gen2-offsets
type: RESEARCH
title: Investigate Japanese Gen 2 Save Offsets
status: READY
owner_persona: researcher
created_at: '2026-09-07'
updated_at: '2026-09-07'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-428-470-identify-public-saves
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# Investigate Japanese Gen 2 Save Offsets

## Context
A Gen 2 save file QA task failed due to the engine not supporting Japanese Crystal offsets (e.g. party data at 0x281a instead of 0x2865).

## Requirements
1. Document the necessary offset shifts and detection fallbacks for Japanese Gen 2 saves.

## Acceptance Criteria
- [x] Offsets and fallback logic are documented.
