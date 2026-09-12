---
id: story-565-566-virtualize-pokedex-grid
type: STORY
title: Integrate React Virtual into PokedexGrid
status: READY
owner_persona: tech_lead
created_at: '2026-09-11'
updated_at: '2026-09-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-564-565-lazy-load-pokedex-pokemon-list
tags:
  - pokedex
  - performance
  - react-virtual
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Story: Integrate React Virtual into PokedexGrid

## Description
To improve rendering performance and Time to Interactive (TTI), we will integrate \`@tanstack/react-virtual\` into the \`PokedexGrid\` component. By virtualizing the grid, only the \`PokedexCard\` items visible within the viewport (with a small overscan) will be rendered to the DOM, drastically decreasing the initial load overhead.

## Acceptance Criteria
- [ ] Implement \`useVirtualizer\` from \`@tanstack/react-virtual\` in \`PokedexGrid.tsx\`.
- [ ] Configure a responsive grid layout using CSS grid or window measurements within the virtualizer constraints to ensure multiple cards span across columns correctly.
- [ ] Ensure that filtering and search continue to function (the virtualizer must dynamically adjust based on the filtered list).
- [ ] The Pokedex grid scrolls smoothly without jumpiness.
