---
id: epic-034-045-shiny-breeding-ui-integration
type: EPIC
title: Gen 2 Shiny Carrier UI Integration
status: ACTIVE
owner_persona: story_owner
created_at: '2026-05-22'
updated_at: '2026-07-02'
depends_on:
  - epic-034-044-shiny-gene-detection-engine
jules_session_id: '4382029221412533683'
pr_number: null
parent: prd-063-034-shiny-breeding-assistant
tags:
  - feature
  - breeding
  - gen2
  - frontend
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Shiny Carrier UI Integration

## Objective
Integrate the Shiny Gene detection data into the UI, clearly tagging Shiny Carriers and displaying optimal breeding pair suggestions.

## Scope
- Introduce a distinct UI badge/indicator for "Shiny Carrier" Pokémon in PC boxes and detailed views, ensuring it is visually distinct from the actual "Shiny" indicator.
- Create a dedicated "Breeding" view or section in the UI that displays the optimal breeding pairs suggested by the backend engine.

## Dependencies
- `epic-034-044-shiny-gene-detection-engine`

## Acceptance Criteria
- [ ] story-045-253-shiny-carrier-ui-badge
- [ ] story-045-254-shiny-carrier-breeding-view

## Next Steps
- [x] Story Owner: Break down into frontend UI Stories.
