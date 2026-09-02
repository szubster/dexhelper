---
id: epic-037-514-gen3-berry-tracker-map-integration-retry
type: EPIC
title: Gen 3 Berry Tracker Map Integration (Retry)
status: PENDING
owner_persona: story_owner
created_at: '2026-09-01'
updated_at: '2026-09-02'
depends_on:
  - epic-037-513-gen3-berry-tracker-data-extraction-retry
jules_session_id: null
pr_number: null
parent: prd-067-037-gen3-berry-tracker
tags:
  - feature
  - gen3
  - berries
  - mapping
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Epic: Gen 3 Berry Tracker Map Integration (Retry)

## Overview
This Epic is a retry of the map integration and graph overlay functionality for the Gen 3 Berry Farming Tracker. It relies on the data extraction provided by `epic-037-513-gen3-berry-tracker-data-extraction-retry`.

The core objective is to plot the parsed berry patches on the unified Gen 3 map graph.

## Details
*   **Graph Mapping:** Utilize the unified `gen3Graph.ts` (as defined in ADR 010 `010-gen3-map-graph-design.md`) to map internal map IDs from berry patches to their corresponding logical nodes on the overworld map.
*   **UnifiedLocation Extension:** Extend or map the existing `UnifiedLocation` objects to support displaying berry patch states (e.g., attaching state properties like `hasBerryPatch`, `activeBerry`, `berryStage`).
*   **Distance Matrix Integration:** Ensure the berry patch locations can leverage the precomputed Floyd-Warshall distance lookup stored on `UnifiedLocation` objects for eventual route optimization.

## Acceptance Criteria
- [ ] Implement mapping between berry patch raw map IDs and `gen3Graph.ts` nodes.
- [ ] Extend `UnifiedLocation` structures or create adapter functions to attach berry patch states to locations.
- [ ] Ensure integration correctly relies on the extracted engine data and the existing distance matrix system.
- [ ] Generate a final STORY dedicated exclusively to Integration and E2E Verification.
