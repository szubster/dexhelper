---
id: story-103-246-create-relative-offsets-adr
type: STORY
title: Create ADR or Implement Offset Linter Rule
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-29'
updated_at: '2026-07-05'
depends_on:
  - story-103-245-investigate-offset-linter
jules_session_id: '415821698550692715'
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

# Create ADR or Implement Offset Linter Rule

## Objective
Establish a strict architectural ADR mandating relative offset mapping, or implement the linter rule if feasible.

## Context
Based on the investigation into linter feasibility for hardcoded offsets, we either need to write a custom rule to enforce this or formally establish an ADR to guide future parsers to use relative offsets dynamically.

## Acceptance Criteria
- [ ] Depending on the investigation, implement the linter rule or write an ADR in `.foundry/docs/adrs/`.
- [ ] Ensure all documentation specifies the requirements for dynamic save block extraction.
- [ ] task-246-262-create-relative-offsets-adr
