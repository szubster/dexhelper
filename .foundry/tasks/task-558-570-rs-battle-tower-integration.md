---
id: task-558-570-rs-battle-tower-integration
type: TASK
title: Integrate RS Battle Tower Parsing with Engine
status: READY
owner_persona: coder
created_at: '2026-09-12'
updated_at: '2026-09-28'
depends_on:
  - task-558-568-rs-battle-tower-data-parsing-impl
jules_session_id: null
pr_number: null
parent: story-078-558-rs-battle-tower-data-parsing
tags:
  - feature
  - gen3
  - endgame
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Integrate RS Battle Tower Parsing with Engine

## Description
Integrate the newly implemented Ruby/Sapphire Battle Tower parsing logic into the wider Gen 3 engine data extraction flow.

## Acceptance Criteria
- [x] Connect the RS Battle Tower parser to the main Save Parser facade for Gen 3.
- [x] Ensure the UI and application state appropriately consume the RS specific data differently from Emerald if necessary.
- [x] Handle game version checks cleanly so Emerald parsing isn't invoked for RS saves, and vice-versa for RS parsing.
