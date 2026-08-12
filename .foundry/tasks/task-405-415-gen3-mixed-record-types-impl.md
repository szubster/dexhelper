---
id: task-405-415-gen3-mixed-record-types-impl
type: TASK
title: Define Gen 3 Mixed Record Types and Offsets
status: ACTIVE
owner_persona: coder
created_at: '2026-08-10'
updated_at: '2026-08-12'
depends_on: []
jules_session_id: '18193670929889448405'
pr_number: null
parent: story-397-405-gen3-mixed-record-npc-data
tags:
  - task
  - gen3
  - mixed-records
  - types
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Define Gen 3 Mixed Record Types and Offsets

## Context
As part of extracting Gen 3 Mixed Record NPC Data, we need to first define the necessary TypeScript types, Zod schemas, and memory offsets. This aligns with Section 13 of `.foundry/docs/schema.md` (Save File Parsing & Extraction Guidelines).

## Acceptance Criteria
- [x] Define TypeScript interfaces for Gen 3 Mixed Record NPC data (trainer names, teams, EV yields).
- [x] Define Zod schemas for validation.
- [x] Define module-level constants for all relevant memory offsets and lengths.
- [x] Write unit tests to verify the schemas.
