---
id: task-295-407-gen3-static-encounters-ui-impl-retry
type: TASK
title: Gen 3 Static Encounters UI Integration Retry
status: ACTIVE
owner_persona: coder
created_at: '2026-08-08'
updated_at: '2026-08-10'
depends_on: []
jules_session_id: '5687811837647216779'
pr_number: null
parent: story-138-295-gen3-static-encounters-ui
tags:
  - gen3
  - feature
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Static Encounters UI Integration Retry

Integrate the `Gen3StaticEncountersDashboard` into the main Gen 3 dashboard view.

## Context
The previous task (`task-295-338-gen3-static-encounters-ui-impl`) correctly created and tested the `Gen3StaticEncountersDashboard` component adhering to ADR 008 constraints. However, it was rejected by QA because it was not integrated into `src/routes/dashboard.tsx` (the central Gen 3 dashboard), rendering it inaccessible.

## Acceptance Criteria
- [x] Integrate `<Gen3StaticEncountersDashboard />` into `src/routes/dashboard.tsx`.
- [x] Pass the appropriate Gen 3 `saveData` to the component.
- [x] Ensure the integration does not break the layout of existing components.
