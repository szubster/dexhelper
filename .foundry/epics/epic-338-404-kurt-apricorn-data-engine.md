---
id: epic-338-404-kurt-apricorn-data-engine
type: EPIC
title: Gen 2 Kurt Apricorn Data Parsing Engine
status: PENDING
owner_persona: story_owner
created_at: '2026-08-06'
updated_at: '2026-08-29'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-121-338-gen2-kurt-apricorn-tracker
tags:
  - gen2
  - items
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Gen 2 Kurt Apricorn Data Parsing Engine

## Context
As defined in PRD `prd-121-338-gen2-kurt-apricorn-tracker`, we need to track Kurt's Apricorn crafting state in Generation 2 games. This involves parsing the save file to determine the type and quantity of Apricorns given to Kurt and tracking the active order.

## Objectives
- Extract the memory offset corresponding to Kurt's active Apricorn crafting state.
- Parse the extracted byte data to identify the Apricorn type and resulting Poké Ball.
- Extract the quantity of Apricorns currently in Kurt's possession.
- Extract the timestamp or active day flag for when the crafting was initiated.

## Acceptance Criteria
- [x] story_owner: Break this EPIC down into actionable STORY nodes.
- [x] story_owner: Generate a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).
- [ ] story-404-477-kurt-apricorn-offset-and-constants
- [ ] story-404-478-kurt-apricorn-parsing-logic
- [ ] story-404-479-kurt-apricorn-e2e-verification
