---
id: epic-118-339-gen2-unown-dex-dashboard-ui
type: EPIC
title: Gen 2 Unown Dex Dashboard UI
status: PENDING
owner_persona: story_owner
created_at: '2026-07-20'
updated_at: '2026-07-20'
depends_on:
  - epic-118-338-gen2-unown-dex-data-extraction
jules_session_id: null
parent: prd-119-118-gen2-unown-dex-tracker
tags:
  - feature
  - gen2
  - unown
rejection_count: 0
rejection_reason: ''
---

# Gen 2 Unown Dex Dashboard UI

## Context
Following the PRD (`prd-119-118-gen2-unown-dex-tracker`) and the data extraction (`epic-118-338-gen2-unown-dex-data-extraction`), this epic handles the presentation layer. We need a visual dashboard that displays the 26 Unown letters, highlights the caught forms, and provides contextual warnings when players are missing forms because they haven't completed specific Ruins of Alph puzzles.

## Acceptance Criteria
- [ ] Build a visual grid component displaying the 26 Unown letters and highlighting the caught ones.
- [ ] Implement actionable warnings indicating missing puzzle completions (e.g., "You must complete the Ho-Oh puzzle in the Ruins of Alph to encounter more Unown forms").
- [ ] Integrate the parsed Unown Dex and puzzle event flags data into the UI.
- [ ] Ensure the component adheres to the tactical hardware aesthetic.
