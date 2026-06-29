---
id: story-101-243-gen3-roamer-state-schema
type: STORY
title: Gen 3 Roamer State Schema
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-29'
updated_at: '2026-06-29'
depends_on:
  - story-101-242-gen3-roamer-parser
jules_session_id: null
pr_number: null
parent: epic-044-101-gen3-roamer-core-extraction-v2
tags:
  - gen3
  - roamer
  - schema
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer State Schema

## Objective
Define the application schema `Gen3RoamerState` and integrate it with the parsed data to support the UI requirements (Dossier format).

## Description
Based on the parsed `Roamer` struct, define the exact Typescript interface `Gen3RoamerState` as specified in `.foundry/docs/knowledge_base/gen3_roamer_offsets.md`. Ensure that the parser populates this interface, specifically making the `isActive` property prominent.

## Acceptance Criteria
- [ ] Define the `Gen3RoamerState` Typescript interface.
- [ ] Map the parsed raw data from the `Roamer` struct to the `Gen3RoamerState` object.
- [ ] Tech Lead: Break down this Story into executable Tasks.
