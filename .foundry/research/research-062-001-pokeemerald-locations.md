---
id: research-062-001-pokeemerald-locations
type: RESEARCH
title: Investigate pret/pokeemerald Locations Data Structure
status: PENDING
owner_persona: researcher
created_at: '2026-05-19'
updated_at: '2026-05-19'
depends_on: []
jules_session_id: null
parent: story-032-062-gen3-data-generation-scripts
tags:
  - gen3
  - data
  - msgpack
  - research
notes: ''
---

# Investigate pret/pokeemerald Locations Data Structure

## Description
Investigate the `pret/pokeemerald` repository to determine how map locations and internal location IDs are structured. This is required to fix the Gen 3 locations generation script, which previously failed because it was missing this logic. Identify the correct files to parse in order to build the Gen 3 map graph data.

## Acceptance Criteria
- [ ] Determine the files in `pret/pokeemerald` that contain map location mappings.
- [ ] Document the data structure and how to parse it.
- [ ] Provide clear recommendations for `task-062-120-gen3-locations-script-retry-impl`.
