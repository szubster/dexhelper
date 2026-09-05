---
id: story-125-519-refactor-complex-dashboard
type: STORY
title: Refactor Complex Dashboard Components
status: READY
owner_persona: tech_lead
created_at: '2026-09-03T13:29:59.884Z'
updated_at: '2026-09-03T13:29:59.884Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-071-125-migrate-complex-app-components-v2
tags:
  - styling
  - refactor
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Story: Refactor Complex Dashboard Components

## Context
As part of the Tailwind v4 migration, we need to apply the new \`@utility\` classes (\`tactical-panel\`, \`tactical-button\`, \`tactical-text\`, etc.) to higher-level, complex components within the \`src/components/dashboard/\` directory, as well as complex tracker UIs (e.g. Berry tracker, Pokérus tracker) in \`src/components/\`.

## Objectives
- **Dashboard Layouts:** Audit and refactor components in \`src/components/dashboard/\`. Replace inline tactical styling classes with semantic \`@utility\` classes.
- **Trackers & Radars:** Apply the same \`@utility\` class replacements to specialized components (like \`PokerusBadge.tsx\`, and data visualization/radars) ensuring the tactical hardware aesthetic is maintained.
- **Maintain Aesthetics:** Ensure no visual regressions occur in z-indexing, layout stacking, or responsive behaviors.

## Implementation Details
1. **Target Components:**
   - \`src/components/dashboard/*\`
   - \`src/components/PokerusBadge.tsx\` and other related specialized UI files.
2. **Refactoring Process:**
   - Replace redundant inline classes (e.g., \`border border-dashed rounded-none bg-zinc-900/50 text-zinc-100 font-mono\`) with \`tactical-panel\`.
   - Update text styling using \`tactical-text\`.
   - Ensure exceptions are respected (e.g., if a combination of utilities is unique, it can remain inline).

## Acceptance Criteria
- [ ] Complex dashboard and specialized tracker components are updated to use semantic \`@utility\` classes.
- [ ] No visual regressions in tactical hardware aesthetic.
- [x] Generate a final STORY dedicated exclusively to Integration and E2E Verification
- [ ] task-519-546-dashboard-layouts-coder
- [ ] task-519-547-trackers-radars-coder
- [ ] task-519-548-dashboard-refactoring-qa
- [ ] story-519-549-dashboard-refactoring-e2e
