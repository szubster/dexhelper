---
id: epic-044-150-gen3-roamer-iv-glitch-v4
type: EPIC
title: Gen 3 Roamer IV Glitch Detection v4
status: CANCELLED
owner_persona: story_owner
created_at: '2026-07-08'
updated_at: '2026-07-27'
depends_on:
  - epic-044-149-gen3-roamer-core-extraction-v4
jules_session_id: null
pr_number: null
parent: prd-071-044-gen3-roamer-tracker
tags:
  - gen3
  - roamer
  - iv-glitch
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  epic-044-149-gen3-roamer-core-extraction-v4
notes: ''
---

# Gen 3 Roamer IV Glitch Detection v4

## Objective
Implement detection logic for the infamous "Roamer IV Glitch" affecting Gen 3 games.

## Description
Analyze the extracted IV bitfield from the `Roamer` struct. The glitch causes the top bits to be lost, resulting in very low maximum IVs for certain stats. The logic should determine if the parsed IVs match the signature of a glitched roamer and provide a boolean flag or warning message.

## Acceptance Criteria
- [ ] Implement a function to analyze the 32-bit IV field and detect the Roamer IV Glitch signature.
- [ ] Return a clear boolean or enum state indicating if the glitch is present.
- [ ] Write unit tests verifying the glitch detection logic with both glitched and non-glitched IV spreads.
- [ ] story-150-293-gen3-roamer-iv-glitch-detection-logic
- [ ] Story Owner: Break down this Epic into executable Stories.
