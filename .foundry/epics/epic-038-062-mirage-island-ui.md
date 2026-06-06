---
id: epic-038-062-mirage-island-ui
type: EPIC
title: Mirage Island UI Updates
status: PENDING
owner_persona: story_owner
created_at: '2026-06-06'
updated_at: '2026-06-06'
depends_on:
  - epic-038-061-mirage-island-engine
jules_session_id: null
pr_number: null
parent: prd-069-038-mirage-island-predictor
tags:
  - gen3
  - mirage-island
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Mirage Island UI Updates

## 1. Context & Background
This Epic corresponds to the UI / Notification Updates from the Gen 3 Mirage Island Predictor PRD (`prd-069-038-mirage-island-predictor`). It aims to surface the Mirage Island match status in the user interface.

## 2. Product Requirements
- Surface the Mirage Island status in the user interface.
- Add a dedicated tracker view or notification indicating whether the player currently possesses a matching Pokémon for the current day.
- If a match is found, highlight exactly which Pokémon it is and which PC Box it resides in.
- Adhere strictly to the "tactical hardware/snooping" aesthetic (`rounded-none`, dashed borders, monospace fonts) as defined in ADR 008.

## 3. Acceptance Criteria
- [ ] UI tracker/notification implemented displaying match status.
- [ ] UI correctly highlights matching Pokémon and their location.
- [ ] E2E tests verify the new view correctly renders based on an initialized save state.
