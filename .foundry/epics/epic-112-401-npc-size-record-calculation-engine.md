---
id: epic-112-401-npc-size-record-calculation-engine
type: EPIC
title: "NPC Size Record: Calculation Engine"
status: PENDING
owner_persona: epic_planner
created_at: "2026-07-12"
updated_at: "2026-08-05"
depends_on:
  - epic-112-400-npc-size-record-data-extraction
jules_session_id: null
pr_number: null
parent: prd-110-112-npc-size-record-assistant
tags:
  - dexhelper
  - generation-2
  - generation-3
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---
# NPC Size Record: Calculation Engine

## Overview
This epic implements the mathematical calculation engine to convert the extracted DVs (Gen 2) and IVs/PV (Gen 3) into the localized size strings (inches/meters) that exactly match the in-game display.

## Acceptance Criteria
- [ ] Implement Gen 2 Size Calculation formula based on DVs.
- [ ] Implement Gen 3 Size Calculation formula based on IVs and PV.
- [ ] story-112-401-integration-e2e