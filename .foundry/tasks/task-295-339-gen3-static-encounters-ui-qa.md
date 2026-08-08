---
id: task-295-339-gen3-static-encounters-ui-qa
type: TASK
title: Gen 3 Static Encounters UI QA
status: ACTIVE
owner_persona: qa
created_at: '2026-07-20'
updated_at: '2026-08-08'
depends_on:
  - task-295-338-gen3-static-encounters-ui-impl
jules_session_id: '14907897593508522868'
pr_number: null
parent: story-138-295-gen3-static-encounters-ui
tags:
  - gen3
  - feature
  - ui
  - qa
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Gen 3 Static Encounters UI QA

Verify the Gen 3 static encounters UI implementation.

### QA Rejection Note
The implementation failed validation. The `Gen3StaticEncountersDashboard` component was created and tested, but it was not integrated into the central Gen 3 dashboard (`src/routes/dashboard.tsx`). Missing this integration means the UI is not accessible to users.

## Acceptance Criteria
- [ ] Verify the UI correctly displays the static encounter checklist based on save file flags.
- [ ] Verify the UI strictly adheres to the 'tactical hardware/snooping' design constraints (e.g., rounded-none, border-dashed, monospaced telemetry fonts).
- [ ] Verify seamless integration with the Gen 3 dashboard.
