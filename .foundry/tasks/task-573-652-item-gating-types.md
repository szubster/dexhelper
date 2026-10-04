---
id: task-573-652-item-gating-types
type: TASK
title: Item Gating Types Definition
status: ACTIVE
owner_persona: coder
created_at: '2026-09-16T05:45:31Z'
updated_at: '2026-10-04'
depends_on: []
jules_session_id: '6916905304384252412'
pr_number: null
parent: story-407-573-item-gating-data-mapping
tags:
  - gen3
  - types
  - map
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Item Gating Types Definition

## Context
We need to define a data structure for item gating requirements to support the Bike Requirement Filter on the Smart Route Radar. This includes types for items, HMs, bikes (Mach/Acro), and combinations required to access specific map items or locations.

## Proposal
Create a TypeScript definition file for the item gating types. This should define requirements like bikes, specific items (e.g., Storage Key), HMs (e.g., Dive), and their logical combinations (AND/OR).

## Acceptance Criteria
- [ ] coder: Define TypeScript types/interfaces for item gating requirements.
