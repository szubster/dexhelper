---
id: story-522-520-gen2-constants-extraction
type: STORY
title: Extract Gen 2 Parser Constants
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-03'
updated_at: '2026-09-06'
depends_on: []
jules_session_id: '8291374722208975202'
pr_number: null
parent: epic-517-522-gen2-parser-refactor-adr-028
tags:
  - architecture
  - save-parsing
  - offset-mapping
  - gen2
locks: []
rejection_reason: ''
---

# STORY: Extract Gen 2 Parser Constants

## Context
Per ADR 028, inline magic numbers for memory offsets, lengths, and bit locations must be replaced with explicitly defined module-level constants. The Gen 2 parser currently contains many of these at the top of the file.

## Acceptance Criteria
- [ ] Decompose this Story into actionable Tasks to extract inline constants into a reusable module-level file.
