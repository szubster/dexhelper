---
id: story-397-405-gen3-mixed-record-npc-data
type: STORY
title: Extract Gen 3 Mixed Record NPC Data
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-04'
updated_at: '2026-08-24'
depends_on:
  - story-397-404-gen3-secret-base-parsing-core
jules_session_id: '11799575988080333040'
pr_number: null
parent: epic-045-397-gen3-secret-base-parsing-v3
tags:
  - story
  - gen3
  - secret-base
  - mixed-records
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Extract Gen 3 Mixed Record NPC Data

## Context
As part of the Gen 3 Secret Base and Mixed Record Viewer Epic, we need to extract NPC trainer data from mixed records stored in the save file.

## Objectives
- Extract mixed record data, specifically focusing on NPC trainer names, teams, and EV yields.
- Ensure strict adherence to Section 13 of `.foundry/docs/schema.md` (Save File Parsing & Extraction Guidelines).

## Acceptance Criteria
- [x] Tech Lead: Break down into actionable TASK nodes (Coder/QA as needed).
- [ ] task-405-415-gen3-mixed-record-types-impl
- [ ] task-405-416-gen3-mixed-record-parser-impl
- [ ] task-405-417-gen3-mixed-record-parser-qa
