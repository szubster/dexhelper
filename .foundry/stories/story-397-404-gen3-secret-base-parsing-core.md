---
id: story-397-404-gen3-secret-base-parsing-core
type: STORY
title: Core Gen 3 Secret Base Save Parsing
status: READY
owner_persona: tech_lead
created_at: '2026-08-04'
updated_at: '2026-08-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-045-397-gen3-secret-base-parsing-v3
tags:
  - story
  - gen3
  - secret-base
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Core Gen 3 Secret Base Save Parsing

## Context
As part of the Gen 3 Secret Base and Mixed Record Viewer Epic, we need to implement the core save file parsing logic to identify all active Secret Bases in the game. This builds on the research findings from the v2 failure investigation and must use `DataView` for relative offsets per ADR 010.

## Objectives
- Implement robust parsing logic for Gen 3 save files to extract Secret Base locations.
- Ensure strict adherence to Section 13 of `.foundry/docs/schema.md` (Save File Parsing & Extraction Guidelines).
- Expose this functionality via a clear, typed API.

## Acceptance Criteria
- [ ] Tech Lead: Break down into actionable TASK nodes (Coder/QA as needed).
