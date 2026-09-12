---
id: story-140-562-gen2-roamer-map-lookup-table
type: STORY
title: Gen 2 Roamer Map Lookup Table
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-10'
updated_at: '2026-09-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-043-140-gen2-roamer-map-translation
tags:
  - gen2
  - roamer
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Gen 2 Roamer Map Lookup Table

## Objective
Create a lookup table or leverage existing `gen2Graph.ts` mapping structures to map Gen 2 `mapGroup` and `mapId` coordinates to human-readable Route or location names.

## Description
- The map group and map ID combination uniquely identifies maps in Gen 2.
- Define a comprehensive mapping structure or utility that provides the route name given these two bytes.
- Ensure the definitions accurately reflect Johto and Kanto maps traversed by roamers.

## Acceptance Criteria
- [ ] A mapping structure exists for translating Gen 2 map group and map ID pairs.
- [ ] The mappings align with standard human-readable route names.
- [ ] Tech Lead: Break down into executable Tasks.
