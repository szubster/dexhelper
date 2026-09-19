---
id: story-569-581-gen3-secret-base-array-extraction
type: STORY
title: Gen 3 Secret Base Array Extraction
status: READY
owner_persona: tech_lead
created_at: '2026-09-16'
updated_at: '2026-09-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-565-569-gen3-secret-base-parsing
tags:
  - dexhelper
  - gen3
  - secret-base
  - map
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 30
---

# STORY: Gen 3 Secret Base Array Extraction

## Context
As part of the Gen 3 Secret Base Epic, we need to safely extract the `SecretBase` array from SaveBlock1. This must use the `DataView` API and handle relative offsets to support A/B bank flash memory architecture according to ADR 010.

## Requirements
- Safely extract the `SecretBase` array from SaveBlock1.
- Use `DataView` API.
- Use relative offsets based on section offset (e.g. `section1Offset` or `section2Offset`).
- Define explicit module-level constants for all lengths and offsets; no magic numbers.

## Acceptance Criteria
- [ ] Break down into Tasks
