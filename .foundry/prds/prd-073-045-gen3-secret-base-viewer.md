---
id: prd-073-045-gen3-secret-base-viewer
type: PRD
title: Gen 3 Secret Base and Mixed Record Viewer
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-06-10'
updated_at: '2026-08-04'
depends_on: []
jules_session_id: '5406308992691137803'
pr_number: null
parent: idea-073-gen3-secret-base-viewer
tags:
  - feature
  - gen3
  - secret-base
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Gen 3 Secret Base and Mixed Record Viewer

## Context
In Generation 3 (Ruby/Sapphire/Emerald), players can create "Secret Bases" and share them with friends by mixing records. When records are mixed, the friend's Secret Base appears in the player's game, and the friend's character can be battled once a day as an NPC. A common pain point is forgetting exactly which route a friend's Secret Base spawned on, or not knowing their team composition (which is highly valuable for EV training).

## Proposal
Leverage DexHelper's programmatic save parsing to expose hidden Secret Base and Mixed Record data across Hoenn.
- **Secret Base Locator:** Parse the save file to identify all active Secret Bases and map their exact locations on the Smart Route Radar.
- **NPC Trainer Intel:** Extract the NPC trainer data from mixed records to display the friend's trainer name, team composition, and EV yields.
- **Daily Rematch Tracker:** Track whether the player has already battled the Secret Base trainer today.

## Next Steps
- [ ] Epic Planner: Break this down into Epics (e.g., Save File Parsing, UI/Dashboard updates).
  - [x] .foundry/epics/epic-045-070-gen3-secret-base-parsing.md
  - [x] .foundry/epics/epic-045-071-gen3-secret-base-radar-integration.md
  - [x] .foundry/epics/epic-045-072-gen3-secret-base-dashboard.md
  - [x] .foundry/archive/research/research-045-321-investigate-secret-base-failure.md
  - [x] .foundry/epics/epic-045-324-gen3-secret-base-parsing-v2.md
  - [x] .foundry/epics/epic-045-325-gen3-secret-base-radar-integration-v2.md
  - [x] .foundry/epics/epic-045-326-gen3-secret-base-dashboard-v2.md
  - [ ] research-045-396-investigate-secret-base-v2-failure
  - [ ] epic-045-397-gen3-secret-base-parsing-v3
  - [ ] epic-045-398-gen3-secret-base-radar-integration-v3
  - [ ] epic-045-399-gen3-secret-base-dashboard-v3
