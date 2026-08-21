---
id: story-311-322-gen2-room-decoration-parsing
type: STORY
title: Gen 2 Room Decoration & Bank Parsing
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-15'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-112-311-gen2-decoration-savings-extraction
tags:
  - gen2
  - engine
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Gen 2 Room Decoration & Bank Parsing

## Overview
Implement the parser extraction for Gen 2 room decorations (bed, carpet, plant, poster, console, plushies) and Mom's bank account savings.

## Requirements
- Define the correct memory offsets and data structures to read the flags for unlocked room decorations.
- Define the memory offsets to parse the money currently saved in Mom's bank account.
- Expose the extracted data seamlessly through the DexHelper Gen 2 core API.

## Acceptance Criteria
- [x] Break down into Tasks
- [x] task-322-331-gen2-decoration-savings-parsing-impl
- [x] task-322-332-gen2-decoration-savings-parsing-qa
