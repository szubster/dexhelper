---
id: epic-054-269-gen3-ash-dashboard
type: EPIC
title: "Epic: Gen 3 Volcanic Ash Tracker Dashboard UI"
status: PENDING
owner_persona: story_owner
created_at: "2026-07-17"
updated_at: "2026-07-17"
depends_on:
  - "epic-054-268-gen3-ash-save-parsing"
jules_session_id: null
pr_number: null
parent: prd-089-054-gen3-ash-gathering-tracker
tags:
  - ui
  - gen3
  - ash
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Epic: Gen 3 Volcanic Ash Tracker Dashboard UI

## Objective
Create a dedicated UI view or panel within DexHelper that explicitly displays the player's current Volcanic Ash count extracted from the Gen 3 save file.

## Architectural Constraints
- **Tactical Hardware Aesthetic:** As defined in ADR 024, the dashboard component MUST utilize Tailwind v4 \`@utility\` classes (e.g., \`tactical-panel\`), sharp edges (\`rounded-none\`), dashed borders (\`border-dashed\`), and monospaced telemetry fonts (\`font-mono\`).

## Technical Requirements
- Integrate this view contextually (e.g., within the location details for Route 113 or the Glass Workshop).
- Ensure the new Ash Tracker components reuse existing layout patterns and state management (Zustand) for consistency.
- No PokeAPI dependency; rely entirely on internal logic and local save data.

## Acceptance Criteria
- [ ] Break down this Epic into corresponding STORY nodes.
