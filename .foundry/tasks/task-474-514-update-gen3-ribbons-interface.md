---
id: task-474-514-update-gen3-ribbons-interface
type: TASK
title: Update Gen3Ribbons Interface
status: ACTIVE
owner_persona: coder
created_at: '2026-09-01'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: '946699995619208189'
pr_number: null
parent: story-133-474-gen3-ribbon-extraction-logic
tags:
  - gen3
  - save-engine
  - data-extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Update Gen3Ribbons Interface

## Objective
Update the `Gen3Ribbons` interface in `src/engine/saveParser/parsers/common.ts` to include boolean ribbons and the obedience flag.

## Acceptance Criteria
- [x] Add boolean properties for `champion`, `winning`, `victory`, `artist`, `effort`, `battleChampion`, `regionalChampion`, `nationalChampion`, `country`, `national`, `earth`, `world`, and `obedience`.
