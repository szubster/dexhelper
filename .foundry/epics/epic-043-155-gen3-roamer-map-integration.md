---
id: epic-043-155-gen3-roamer-map-integration
type: EPIC
title: Gen 3 Roamer Map Integration
status: CANCELLED
owner_persona: story_owner
created_at: '2026-07-10'
updated_at: '2026-07-10'
depends_on:
  - epic-043-153-gen3-roamer-map-translation
jules_session_id: null
pr_number: null
parent: prd-070-043-roamer-tracking-dashboard
tags: []
research_references: []
rejection_count: 1
rejection_reason: 'Permanently CANCELLED as Gen 3 roamer map coordinates are stored in EWRAM and are not serialized to the save file, making static extraction impossible as per research-043-263-roamer-tracking-remediation and ADR 108-027.'
notes: ''
---

# Gen 3 Roamer Map Integration

## Objective
Highlight the active Gen 3 roamer's current route on the interactive map.

## Description
- **Map Integration**: Highlight the active roamer's current route on the interactive `.foundry/docs/adrs/010-gen3-map-graph-design.md` style map.
- Ensure the UI component integrates properly with the broader DexHelper application flow.

## Acceptance Criteria
- [ ] The roamer's current route is highlighted on the Gen 3 map.
- [ ] Story Owner: Break down this Epic into executable Stories.

### Task Cancellation
This Epic is permanently CANCELLED as Gen 3 roamer map coordinates are stored in EWRAM and are not serialized to the save file, making static extraction impossible as per `research-043-263-roamer-tracking-remediation` and ADR 108-027.
