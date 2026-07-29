---
id: story-324-334-extract-mixed-record-trainer-data
type: STORY
title: Extract Gen 3 Mixed Record Trainer Data (v2)
status: PENDING
owner_persona: tech_lead
created_at: '2026-07-18'
updated_at: '2026-07-29'
depends_on:
  - story-324-333-parse-secret-base-locations
jules_session_id: null
pr_number: null
parent: epic-045-324-gen3-secret-base-parsing-v2
tags:
  - feature
  - gen3
  - secret-base
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Extract Gen 3 Mixed Record Trainer Data (v2)

## Context
When players mix records in Gen 3, they exchange Secret Bases and trainer data. We need to extract the NPC trainer details associated with these Secret Bases.

## Objectives
- Extract trainer names from the mixed record data.
- Extract the team composition (Pokémon, levels, moves) for each NPC trainer.
- Calculate or extract the EV yields associated with defeating these trainers.

## Acceptance Criteria
- [x] Tech Lead: Break this Story down into actionable Tasks.
- [ ] task-334-351-parse-secret-base-trainer-info-impl
- [ ] task-334-352-parse-secret-base-trainer-party-impl
- [ ] task-334-353-gen3-mixed-record-trainer-qa
