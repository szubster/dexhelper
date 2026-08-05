---
id: epic-044-398-gen3-roamer-iv-glitch-v5
type: EPIC
title: Gen 3 Roamer IV Glitch Detection v5
status: PENDING
owner_persona: story_owner
created_at: '2026-08-04'
updated_at: '2026-08-04'
depends_on:
  - epic-044-397-gen3-roamer-core-extraction-v5
  - research-044-396-gen3-roamer-tracker-failure
jules_session_id: null
pr_number: null
parent: prd-071-044-gen3-roamer-tracker
tags:
  - gen3
  - roamer
  - iv-glitch
research_references: []
rejection_count: 1
rejection_reason: ''
notes: Replacement for epic-044-150
---

# Gen 3 Roamer IV Glitch Detection v5

## Objective
Implement detection logic for the infamous "Roamer IV Glitch" affecting Gen 3 games.

## Description
Analyze the extracted IV bitfield from the `Roamer` struct. The glitch causes the top bits to be lost, resulting in very low maximum IVs for certain stats. The logic should determine if the parsed IVs match the signature of a glitched roamer and provide a boolean flag or warning message.

## Acceptance Criteria
- [ ] Implement a function to analyze the 32-bit IV field and detect the Roamer IV Glitch signature.
- [ ] Return a clear boolean or enum state indicating if the glitch is present.
- [ ] Write unit tests verifying the glitch detection logic with both glitched and non-glitched IV spreads.
- [ ] Generate a final STORY dedicated exclusively to Integration and E2E Verification to ensure proper system-wide rendering.
- [ ] Story Owner: Break down this Epic into executable Stories.
