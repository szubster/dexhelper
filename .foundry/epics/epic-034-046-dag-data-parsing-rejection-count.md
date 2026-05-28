---
id: epic-034-046-dag-data-parsing-rejection-count
type: EPIC
title: Extract and Broadcast Rejection Count in DAG Data Parsing
status: READY
owner_persona: story_owner
created_at: '2026-05-22'
updated_at: '2026-05-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-063-034-permanent-failure-dashboard
tags:
  - foundry
  - ui
  - dashboard
research_references: []
rejection_count: 2
rejection_reason: 'Session terminated with state: NOT_FOUND'
notes: ''
---

# Extract and Broadcast Rejection Count in DAG Data Parsing

## Context
As per ADR 017 and PRD `prd-063-034-permanent-failure-dashboard`, we need a "Permanent Failures" view in the DAG Dashboard. To enable this without introducing new persistent state stores, we must update the DAG data parsing layer to extract the `rejection_count` field from the markdown frontmatter of `.foundry` files.

## High-Level Requirements
1. **Parser Update**: Modify the existing DAG data parser to read and extract the `rejection_count` property from the YAML frontmatter of each parsed node.
2. **Data Model Update**: Update any associated TypeScript interfaces/types representing a Foundry DAG node to include `rejection_count: number`.
3. **Context Broadcasting**: Ensure the extracted `rejection_count` is broadcasted via the shared React Context to all connected dashboard views.

## Acceptance Criteria
- [x] Story Owner: Create a Story to implement the parser updates and context broadcasting for `rejection_count`.
- [x] Story Owner: Verify the newly created Story follows the correct dependency chain and schema.

## Child Nodes
- .foundry/stories/story-046-085-extract-broadcast-rejection-count.md
