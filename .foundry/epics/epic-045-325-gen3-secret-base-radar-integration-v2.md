---
id: epic-045-325-gen3-secret-base-radar-integration-v2
type: EPIC
title: Gen 3 Secret Base Smart Route Radar Integration (v2)
status: CANCELLED
owner_persona: story_owner
created_at: '2026-07-14'
updated_at: '2026-08-04'
depends_on:
  - epic-045-324-gen3-secret-base-parsing-v2
jules_session_id: null
pr_number: null
parent: prd-073-045-gen3-secret-base-viewer
tags:
  - feature
  - gen3
  - secret-base
  - map-radar
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  epic-045-324-gen3-secret-base-parsing-v2
notes: ''
---

# EPIC: Gen 3 Secret Base Smart Route Radar Integration (v2)

## Context
Once Secret Base data is parsed from the save file, we need to map their exact locations on the Smart Route Radar. This allows players to visually locate where their friends' Secret Bases have spawned.

## Objectives
- Map the parsed Secret Base locations to the UnifiedLocation map graph.
- Update the Smart Route Radar to display Secret Base markers.
- Ensure integration respects the Smart Route Radar Architecture (ADR 018).

## Acceptance Criteria
- [ ] Story Owner: Break this Epic down into actionable Stories.
