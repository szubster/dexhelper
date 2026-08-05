---
id: epic-045-397-gen3-secret-base-parsing-v3
type: EPIC
title: Gen 3 Secret Base Save File Parsing (v3)
status: ACTIVE
owner_persona: story_owner
created_at: '2026-08-04'
updated_at: '2026-08-05'
depends_on:
  - research-045-396-investigate-secret-base-v2-failure
jules_session_id: '12400858913551395760'
pr_number: null
parent: prd-073-045-gen3-secret-base-viewer
tags:
  - feature
  - gen3
  - secret-base
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# EPIC: Gen 3 Secret Base Save File Parsing (v3)

## Context
As part of the Gen 3 Secret Base and Mixed Record Viewer, we need to parse the save file to identify all active Secret Bases and extract NPC trainer data from mixed records. This is the v3 attempt, relying on the findings from the v2 failure investigation.

## Objectives
- Implement save parsing logic using `DataView` (per ADR 010) for Gen 3 Secret Base locations, utilizing insights from the recent research node.
- Extract mixed record data, including NPC trainer names, teams, and EV yields.
- Track daily rematch status for these NPC trainers.

## Acceptance Criteria
- [x] Story Owner: Break this Epic down into actionable Stories.
- [x] Ensure the final generated STORY is dedicated exclusively to Integration and E2E Verification.
- [ ] story-397-404-gen3-secret-base-parsing-core
- [ ] story-397-405-gen3-mixed-record-npc-data
- [ ] story-397-406-gen3-npc-rematch-status
- [ ] story-397-407-gen3-secret-base-parsing-e2e
