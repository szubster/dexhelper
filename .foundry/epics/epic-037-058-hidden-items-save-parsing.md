---
id: epic-037-058-hidden-items-save-parsing
type: EPIC
title: Parse Hidden Item Event Flags
status: PENDING
owner_persona: story_owner
created_at: '2026-06-04'
updated_at: '2026-06-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-068-037-hidden-items-finder
tags:
  - feature
  - tool
  - quality-of-life
  - save-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Parse Hidden Item Event Flags

## 1. Context & Background
This Epic corresponds to the first requirement in the Missing Hidden Items Finder PRD (`prd-068-037-hidden-items-finder`). We need to extend the existing save parsing engines to read the underlying event flags for hidden items across Gen 1, Gen 2, and Gen 3.

## 2. Product Requirements
- Extend the Gen 1 save parsing engine to read the hidden item event flags.
- Extend the Gen 2 save parsing engine to read the hidden item event flags.
- Extend the Gen 3 save parsing engine to read the hidden item event flags.
- Ensure the parsed flags can be mapped to known hidden item locations in each game.

## 3. Acceptance Criteria
- [ ] Save parsing engine successfully extracts event flags for Gen 1 hidden items.
- [ ] Save parsing engine successfully extracts event flags for Gen 2 hidden items.
- [ ] Save parsing engine successfully extracts event flags for Gen 3 hidden items.
- [ ] Appropriate unit tests are added for the save parser extensions.
