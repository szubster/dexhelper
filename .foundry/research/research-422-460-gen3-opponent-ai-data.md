---
id: research-422-460-gen3-opponent-ai-data
type: RESEARCH
title: Determine Gen 3 AI Script and Opponent Team Data
status: ACTIVE
owner_persona: researcher
created_at: '2026-08-22'
updated_at: '2026-08-22'
depends_on: []
jules_session_id: '7024160321706164810'
pr_number: null
parent: story-411-422-extract-opponent-data
tags:
  - gen3
  - ai
  - save-engine
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Research: Determine Gen 3 AI Script and Opponent Team Data

## Context
As part of the Gen 3 AI data extraction (Epic 340-411), we need to extract the AI scripts and opponent's team data assigned to the nearest major trainer. However, we lack the required memory offsets, data structures, and context in our knowledge base to implement this extraction logic.

## Objective
Acquire exact offsets, structures, and mapping rules to identify the opponent's team structure, AI level, and assigned AI script for major trainers in Gen 3 games.

## Scope
- Investigate how opponent teams and AI scripts are stored in memory or ROM.
- Document how to map a resolved upcoming trainer to their specific AI script and team data.
- Detail any memory structures or constants required to parse this information.
- Update the knowledge base in `.foundry/docs/knowledge_base/` with the findings.

## Acceptance Criteria
- [ ] Research complete: Mechanism for identifying opponent's team and AI script is documented.
- [ ] Knowledge base is updated with the findings.
