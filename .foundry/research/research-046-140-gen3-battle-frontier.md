---
id: research-046-140-gen3-battle-frontier
type: RESEARCH
title: Gen 3 Battle Frontier Offset Research
status: READY
owner_persona: researcher
created_at: '2026-06-11'
updated_at: '2026-06-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-074-046-gen3-battle-frontier-tracker
tags:
  - research
  - gen3
  - endgame
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Gen 3 Battle Frontier Offsets

## Context
Since the exact memory offsets and byte structures for the Battle Frontier data (win streaks, max records, Silver/Gold symbol status, BP) are missing, we need to spawn a `RESEARCH` node to investigate and document them. This adheres to the Groundedness Rule for Data Assumptions. The findings will be used by downstream data extraction tasks.

## Requirements
We need to find the exact save file structure and offsets for:
- Current win streaks for all 7 facilities
- Max win records for all 7 facilities
- Silver/Gold symbol status for all 7 facilities
- Total Battle Points (BP)

## Acceptance Criteria
- [ ] Extract all required offsets for the 7 facilities and BP.
- [ ] Document the offsets in this research markdown file.
