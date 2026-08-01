---
id: epic-335-345-spinda-pid-extraction
type: EPIC
title: Gen 3 Spinda PID Extraction
status: PENDING
owner_persona: story_owner
created_at: '2026-07-26'
updated_at: '2026-08-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-119-335-gen3-spinda-pattern-viewer
tags:
  - gen3
  - spinda
  - data-extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Spinda PID Extraction

## Description
This Epic focuses on parsing the Gen 3 save file to extract all owned Spinda Pokemon from both the PC boxes and the active party. The primary goal is to securely identify Spindas and extract their 32-bit Personality Value (PID), which dictates their procedural spot patterns.

## Acceptance Criteria
- [ ] Parse PC Box data and Party data to identify Spinda Pokemon.
- [ ] Extract the 32-bit PID for each identified Spinda.
- [ ] Create a clean data structure or store to pass the extracted Spinda data to the UI and Rendering layers.
- [ ] story-345-349-gen3-spinda-extraction-core
