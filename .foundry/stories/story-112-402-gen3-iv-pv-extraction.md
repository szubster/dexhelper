---
id: story-112-402-gen3-iv-pv-extraction
type: STORY
title: Gen 3 IV/PV Extraction
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-05'
updated_at: '2026-08-09'
depends_on: []
jules_session_id: '7376601204389638371'
pr_number: null
parent: epic-112-400-npc-size-record-data-extraction
tags:
  - dexhelper
  - generation-3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 IV/PV Extraction

## Overview
Implement the Gen 3 IV/PV extraction, handling the 48-byte encrypted Data block and substructure order `PV % 24`. The implementation must adhere to the Save File Parsing & Extraction Guidelines.

## Acceptance Criteria
- [x] Implement Gen 3 IV/PV extraction, handling the 48-byte encrypted Data block and substructure order `PV % 24`.
- [x] task-402-407-gen3-iv-pv-types-impl
- [x] task-402-408-gen3-iv-pv-parser-impl
- [x] task-402-409-gen3-iv-pv-qa

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
