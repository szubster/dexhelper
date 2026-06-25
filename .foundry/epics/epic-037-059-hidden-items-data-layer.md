---
id: epic-037-059-hidden-items-data-layer
type: EPIC
title: Hidden Items Data Structure & Aggregation
status: COMPLETED
owner_persona: story_owner
created_at: '2026-06-04'
updated_at: '2026-06-17'
depends_on:
  - epic-037-058-hidden-items-save-parsing
jules_session_id: null
pr_number: null
parent: prd-068-037-hidden-items-finder
tags:
  - feature
  - tool
  - quality-of-life
  - data
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Hidden Items Data Structure & Aggregation

## 1. Context & Background
This Epic corresponds to the second requirement in the Missing Hidden Items Finder PRD (`prd-068-037-hidden-items-finder`). We need to structure the parsed event flags mapping to locations and item types, and prepare it for UI consumption.

## 2. Product Requirements
- Define a structured data model to represent hidden item details: location, item type, and whether it has been acquired (based on the save state).
- Ensure the data can easily be mapped and filtered.

## 3. Acceptance Criteria
- [ ] Data model accurately maps hidden items to location and type.
- [ ] Data aggregation allows logical mapping and filtering of the parsed hidden item event flags.
- [ ] .foundry/archive/stories/story-059-125-hidden-items-data-model.md
- [ ] .foundry/stories/story-059-126-hidden-items-aggregation-logic.md
