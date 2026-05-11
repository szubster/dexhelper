---
id: task-042-070-qa-hall-of-fame-roamers
type: TASK
title: 'QA Verification: Hall of Fame & Roamers Extraction'
status: ACTIVE
owner_persona: qa
created_at: '2026-05-07'
updated_at: '2026-05-11'
depends_on:
  - .foundry/tasks/task-042-069-extract-roamers.md
jules_session_id: '8751254147487370257'
pr_number: null
parent: .foundry/stories/story-026-042-hall-of-fame-roamers.md
tags:
  - gen2
  - save-parser
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Verification: Hall of Fame & Roamers Extraction

## Objective
Verify that the Hall of Fame counts and Roamer map locations are correctly extracted from Gen 2 save files.

## Details
- Review the extraction logic in `src/engine/saveParser/parsers/gen2.ts`.
- Ensure tests adequately cover the extraction for `gold.sav` and `crystal.sav` fixtures.
- Verify that relevant types/interfaces correctly expose the data.

## Acceptance Criteria
- [ ] Hall of Fame extraction is verified.
- [ ] Roamer map locations extraction is verified.
