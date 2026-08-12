---
id: task-363-415-trade-extraction-e2e-impl
type: TASK
title: NPC Trade Extraction Integration & E2E Implementation
status: READY
owner_persona: coder
created_at: '2026-08-11'
updated_at: '2026-08-12'
depends_on:
  - task-361-407-gen2-trade-extraction-impl
  - task-362-407-gen3-trade-extraction-impl
  - research-363-416-gen3-save-fixture
jules_session_id: null
pr_number: null
parent: story-349-363-trade-extraction-e2e
tags:
  - feature
  - backend
  - save-parsing
  - e2e
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Task: NPC Trade Extraction Integration & E2E Implementation

## Objective
Implement end-to-end (E2E) tests for the NPC trade flag extraction logic across Gen 2 and Gen 3 save files.

## Acceptance Criteria
- [ ] Write E2E test files for Gen 2 NPC trade flag extraction.
- [ ] Write E2E test files for Gen 3 NPC trade flag extraction.
- [ ] Ensure tests verify end-to-end extraction (from save file parsing to resulting flags in `SaveData`).

- [ ] research-363-416-gen3-save-fixture
