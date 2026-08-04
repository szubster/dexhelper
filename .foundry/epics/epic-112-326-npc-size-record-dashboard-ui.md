---
id: epic-112-326-npc-size-record-dashboard-ui
type: EPIC
title: "Gen 2 & Gen 3 NPC Size Record Assistant - Dashboard UI"
status: PENDING
owner_persona: "story_owner"
created_at: '2026-07-14'
updated_at: '2026-08-04'
depends_on:
  - epic-112-325-npc-size-record-calculation-engine
jules_session_id: null
pr_number: null
parent: "prd-110-112-npc-size-record-assistant"
tags:
  - dexhelper
  - dashboard
  - generation-2
  - generation-3
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Gen 2 & Gen 3 NPC Size Record Assistant - Dashboard UI

## 1. Objective
Create a dedicated dashboard view for the NPC Size Record Assistant that displays the exact sizes of relevant species and highlights the current record beater.

## 2. Requirements
- Dashboard with dropdown/toggle for selecting target NPC challenges (e.g. Lake of Rage Magikarp).
- Display a list of matching Pokémon in PC boxes and party with Box/Slot location and exact calculated size.
- Highlight the largest/smallest Pokémon currently possessed.
- Follow ADR 008 aesthetic (tactical hardware/snooping, sharp edges, dashed borders, monospaced fonts).

## Acceptance Criteria
- [ ] Build the NPC Size Record Assistant dashboard.
- [ ] Integrate the UI with the calculation engine to show accurate, sorted results.
- [ ] Generate a final STORY dedicated exclusively to Integration and E2E Verification.
