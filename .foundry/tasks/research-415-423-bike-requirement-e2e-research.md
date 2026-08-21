---
id: research-415-423-bike-requirement-e2e-research
type: RESEARCH
title: Research Fixture Data for Bike Requirement E2E
status: READY
owner_persona: researcher
parent: story-406-415-bike-requirement-e2e
depends_on: []
created_at: '2026-08-20'
rejection_count: 0
rejection_reason: ''
jules_session_id: null
updated_at: '2026-08-20'
---

# Research Fixture Data for Bike Requirement E2E

## Context
When attempting to implement E2E testing for the Bike Requirements in `hoenn-safari-zone-nwmach-bike-area` and `hoenn-safari-zone-neacro-bike-area` using `emerald.sav`, we encountered issues where `emerald.sav` does not trigger missing encounters for these areas in the `assistant` page, nor does it pass the `isGen3Save` heuristic directly. We need a proper fixture or mock state methodology to verify the Route Radar correctly surfaces these Gen 3 Safari Zone locations.

## Proposal
Investigate the save file fixtures and how Gen 3 missing encounters are seeded into IndexedDB. Propose a solution for testing these specific area nodes.

## Acceptance Criteria
- [ ] Determine if a new `ruby.sav` / `sapphire.sav` fixture is needed or if `emerald.sav` can be manipulated within Playwright to surface these areas.
- [ ] Document findings and create replacement TASK nodes for implementation.
