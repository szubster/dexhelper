---
id: idea-116-gen2-unown-dex-tracker
type: IDEA
title: "Gen 2 Unown Dex Tracker"
status: PENDING
owner_persona: product_manager
created_at: "2026-07-14"
updated_at: "2026-07-14"
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - dexhelper
  - gen2
  - collections
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Idea: Gen 2 Unown Dex Tracker

## Context
In Generation 2 (Gold, Silver, Crystal), the Unown Dex is a unique sub-mechanic unlocked in the Ruins of Alph. It tracks the specific forms of Unown the player has caught (A-Z). Because Unown forms in Gen 2 are determined by hidden Deterministic Values (DVs), catching all 26 forms is a major end-game challenge that relies entirely on a specific in-game UI.

## Proposed Solution
Extract the Unown Dex unlock flag and the caught Unown forms directly from the Generation 2 save file. By surfacing this specific sub-collection in DexHelper, we provide a dedicated "Unown Checklist" dashboard. This eliminates the need for players to repeatedly check their in-game Unown Dex, streamlining the collection process for completionists and aligning perfectly with DexHelper's vision as a premium companion app.
