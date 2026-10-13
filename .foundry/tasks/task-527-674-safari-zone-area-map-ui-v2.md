---
id: task-527-674-safari-zone-area-map-ui-v2
type: TASK
title: Safari Zone Area Map UI Component V2
status: READY
owner_persona: coder
created_at: '2026-10-09'
updated_at: '2026-10-09'
depends_on:
  - research-527-673-investigate-safari-zone-area-map-failure
jules_session_id: null
pr_number: null
parent: story-325-527-safari-zone-area-highlighting
tags:
  - frontend
  - ui
  - react
  - safari-zone
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Safari Zone Area Map UI Component V2

## Overview
Implement the visual area map that highlights specific zones based on target selection, utilizing findings from the failure investigation.

## Requirements
- Create `src/components/safari-zone/SafariAreaMap.tsx`.
- Integrate `SafariTargetSelection` and `SafariAreaMap` into the main `SafariZonePage` layout.
- Render a list or map visual of Safari Zone areas based on the active game version.
- Highlight the areas where the selected Pokémon can be found, utilizing the output of the `useSafariZoneSelection` hook.
- Adhere to the ADR 008 Tactical Hardware aesthetic.
- Use Vitest and `vitest-browser-react` to unit test the component.
- Apply any architectural or logic fixes identified by the prerequisite RESEARCH node.

## Acceptance Criteria
- [ ] Component renders areas based on game version.
- [ ] Appropriate areas highlight based on selected Pokemon.
- [ ] Adheres to the Tactical Hardware aesthetic.
- [ ] Unit tests pass.
