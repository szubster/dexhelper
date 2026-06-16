---
id: story-061-099-implement-mirage-island-parser
type: STORY
title: Implement Mirage Island Save Parser
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-09'
updated_at: '2026-06-16'
depends_on:
  - story-061-098-locate-mirage-island-data
jules_session_id: '15307249867100214766'
pr_number: null
parent: epic-038-061-mirage-island-save-parsing
tags:
  - feature
  - gen3
  - mirage-island
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Mirage Island Save Parser

## Context
With the data offsets located, we need to implement the actual parser for the Gen 3 Mirage Island value.

## Requirements
- Update the Gen 3 save parser engine to extract the Mirage Island value using the located offsets.
- Strictly adhere to ADR 010: Use the `DataView` API exclusively.
- Implement graceful error handling by catching `RangeError` on out-of-bounds reads and propagating them as validation errors.

## Acceptance Criteria
- [x] Tech Lead: Generate child tasks to implement the parsing logic and integrate it into the parser engine.
- [ ] task-099-192-mirage-island-parser-impl
- [ ] task-099-193-mirage-island-parser-qa
