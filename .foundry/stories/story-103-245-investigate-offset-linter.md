---
id: story-103-245-investigate-offset-linter
type: STORY
title: Investigate Linter for Save Parsing Offsets
status: READY
owner_persona: tech_lead
created_at: '2026-06-29'
updated_at: '2026-06-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-053-103-relative-offsets-adr
tags:
  - architecture
  - save-parsing
  - offset-mapping
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Linter for Save Parsing Offsets

## Objective
Investigate if a linter rule can be built to flag hardcoded absolute offsets during save file parsing.

## Context
Currently, save file extraction uses absolute hardcoded offsets for dynamic blocks, which can lead to unpredictable behavior and regressions.

## Acceptance Criteria
- [ ] Investigate the feasibility of creating a custom ESLint or Biome rule.
- [ ] Document findings and propose next steps (either create the rule or fall back to an ADR).

### Generated Tasks
- [ ] .foundry/tasks/task-245-249-investigate-offset-linter.md
