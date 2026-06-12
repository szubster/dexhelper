---
id: epic-046-078-shared-dag-context-foundation
type: EPIC
title: Shared DagContext Foundation
status: ACTIVE
owner_persona: story_owner
created_at: '2026-06-11'
updated_at: '2026-06-12'
depends_on: []
jules_session_id: '1011835428429798760'
pr_number: null
parent: prd-074-046-dag-context-architecture
tags:
  - architecture
  - dashboard
  - state-management
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Shared DagContext Foundation

## Objective
Implement the core `DagContext` and refactor the data parsing layer to extract `rejection_count` (ADR 017) and provide the single source of truth for DAG data (ADR 013).

## Context
As required by PRD `prd-074-046-dag-context-architecture`, we need to extract the DAG parsing and state management out of individual visualization components. This epic focuses on the foundation: parsing the `.foundry` files correctly to include `rejection_count` and establishing the `DagContext` React Context to host this state globally.

## Acceptance Criteria
- [x] Break down into Stories
- [ ] .foundry/stories/story-078-116-parse-rejection-count.md
- [ ] .foundry/stories/story-078-117-create-dag-context-provider.md
