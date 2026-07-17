---
id: epic-054-113-gen3-ash-save-parsing
type: EPIC
title: Gen 3 Volcanic Ash Save Parsing Engine
status: PENDING
owner_persona: story_owner
created_at: '2026-07-17'
updated_at: '2026-07-17'
depends_on:
  - research-054-243-gen3-ash-gathering-offsets
jules_session_id: null
pr_number: null
parent: prd-089-054-gen3-ash-gathering-tracker
tags:
  - engine
  - save-parsing
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Volcanic Ash Save Parsing Engine

## Context
This Epic implements the core save parsing logic to extract the Volcanic Ash step counter from Gen 3 save files (Ruby, Sapphire, Emerald) utilizing the `DataView` API as mandated by ADR 010.

## Acceptance Criteria
- [ ] Parse Volcanic Ash count from Gen 3 save files.
- [ ] Add `volcanicAsh` property to Gen 3 save parsing outputs.
