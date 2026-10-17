---
id: story-398-649-gen3-roamer-iv-glitch-types-and-tests
type: STORY
title: Types and Tests for Roamer IV Glitch Detection
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-10-12'
updated_at: '2026-10-14'
depends_on:
  - epic-044-397-gen3-roamer-core-extraction-v5
jules_session_id: '9429084630202296489'
pr_number: null
parent: epic-044-398-gen3-roamer-iv-glitch-v5
tags:
  - gen3
  - roamer
  - iv-glitch
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Types and Tests for Roamer IV Glitch Detection

## Objective
Define the types and write unit tests for the Gen 3 Roamer IV Glitch detection logic.

## Description
The Roamer IV Glitch affects Gen 3 roamers by discarding the top bits of the 32-bit IV field, resulting in very low maximum IVs for certain stats. This story is responsible for setting up the boolean flag or enum type to represent the glitch state, and writing failing unit tests that verify the signature of glitched and non-glitched IV spreads.

## Acceptance Criteria
- [ ] Define the type or enum for the Roamer IV glitch state.
- [ ] Write unit tests verifying the glitch detection logic with both glitched and non-glitched IV spreads.
- [x] Tech Lead: Break down this Story into executable Tasks.
- [ ] task-649-687-define-roamer-iv-glitch-types
- [ ] task-649-688-write-roamer-iv-glitch-tests
- [ ] task-649-689-qa-roamer-iv-glitch-types-and-tests
