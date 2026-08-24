---
id: epic-112-311-gen2-decoration-savings-extraction
type: EPIC
title: Gen 2 Decoration & Savings Save Data Extraction
status: PENDING
owner_persona: story_owner
created_at: '2026-07-14'
updated_at: '2026-08-23'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-109-112-gen2-room-decoration-tracker
tags:
  - gen2
  - engine
  - save-parsing
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Epic: Gen 2 Decoration & Savings Save Data Extraction

## Overview
This Epic covers the extraction of data related to unlocked room decorations and Mom's savings in Gen 2 save files. The parser needs to accurately extract this information from the appropriate memory blocks.

## Requirements
- Parse the exact event flags and memory blocks associated with room decorations.
- Parse the memory blocks associated with Mom's bank account.
- Expose this data through the Gen 2 runtime API.

## Acceptance Criteria
- [x] Break down into Stories
- [x] story-311-322-gen2-room-decoration-parsing
- [ ] story-311-443-gen2-decoration-savings-e2e
