---
id: research-043-263-roamer-tracking-remediation
type: RESEARCH
title: Roamer Tracking Remediation
status: COMPLETED
owner_persona: researcher
created_at: '2026-07-06'
updated_at: '2026-07-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-070-043-roamer-tracking-dashboard
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Roamer Tracking Remediation

## Objective
Investigate the root cause of the failure in Gen 3 roamer extraction (epic-043-067-roamer-data-extraction) and determine feasibility of Gen 2 tracking only, satisfying the Impossible Loop rule.

## Acceptance Criteria
- [x] Determine how to proceed with roamer tracking given Gen 3 location is not saved in save data.
- [x] Document findings and next steps.

## Findings
- **Root Cause of Gen 3 Failure**: According to ADR 108-027, the map group and map ID for roaming Pokémon in Generation 3 (sRoamerLocation and sLocationHistory) are maintained in dynamically allocated EWRAM during gameplay and are **never serialized into the save file**. Therefore, extracting static Gen 3 roamer locations to populate map radar widgets is mathematically impossible.
- **Feasibility of Gen 2 Tracking**: Gen 2 games do serialize the exact `mapGroup` and `mapId` for Raikou, Entei, and Suicune in the save file. Thus, Gen 2 map-based tracking and the corresponding epics (`epic-043-139`, `epic-043-140`, `epic-043-142`, `epic-043-143`) are perfectly feasible and can proceed as planned.
- **Gen 3 Pivot**: The Gen 3 roamer tracking implementation has already successfully pivoted towards stat-based extraction and IV Glitch detection via separate tracking (e.g., `epic-044-149`, `epic-044-150`, `epic-044-151`).

## Next Steps
- The PM or Epic Planner should **CANCEL** the Gen 3 location-dependent epics (`epic-043-152`, `epic-043-153`, `epic-043-154`, `epic-043-155`) under `prd-070-043-roamer-tracking-dashboard`, as their objectives are impossible to fulfill.
- The Gen 2 roamer tracking epics (`epic-043-139`, `epic-043-140`, `epic-043-142`, `epic-043-143`) can proceed without being blocked by Gen 3 limitations.
