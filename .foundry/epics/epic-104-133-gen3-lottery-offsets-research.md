---
id: epic-104-133-gen3-lottery-offsets-research
type: EPIC
title: Gen3 Lottery Offsets Research
status: PENDING
owner_persona: story_owner
created_at: '2026-07-04'
updated_at: '2026-07-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-098-104-gen3-lottery-data-extraction
tags:
  - gen3
  - research
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen3 Lottery Offsets Research

Research and identify the memory offsets for the daily lottery PRNG seed in Ruby, Sapphire, and Emerald save files.

## Acceptance Criteria
- [x] Break down into Stories
- [x] story-133-272-research-lottery-offsets

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md

## Learnings & Follow-ups
During this research epic, we discovered that the 32-bit Lottery PRNG seed is split across two 16-bit variables, and the High/Low ordering is swapped between R/S and Emerald. A follow-up IDEA node has been created to propose an architectural strategy for extracting these split variables:
- [ ] idea-112-gen3-split-variable-extraction-strategy
