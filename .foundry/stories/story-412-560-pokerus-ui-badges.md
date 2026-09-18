---
id: story-412-560-pokerus-ui-badges
type: STORY
title: Pokerus UI Badges Implementation
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-10'
updated_at: '2026-09-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-038-412-pokerus-visual-tracker-retry
tags:
  - ui
  - pokerus
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Pokerus UI Badges Implementation

## Description
This story addresses the requirement to update UI badges indicating Pokerus status (Uninfected, Infected/Contagious, Cured/Immune).
As per ADR 025 (RTC Strategy Architecture Decision), direct RTC data is unreliable. We must explicitly calculate and display remaining days for contagious Pokemon using the RTC-Independent Fallback Strategy. Since the duration is directly available from the save parser (e.g. daysRemaining in parsePokerus), we can display that directly alongside the status.

## Acceptance Criteria
- [ ] Create or update Pokerus UI Badge components reflecting Uninfected, Infected (contagious with days remaining), and Cured (immune) statuses.
- [ ] Implement duration display logic aligned with ADR 025 (utilize data from save files or fallback logic).
- [x] Tech Lead: Break down into TASKs.
- [ ] task-560-578-pokerus-ui-badges-impl
- [ ] task-560-579-pokerus-ui-badges-tests
- [ ] task-560-580-pokerus-ui-badges-qa
