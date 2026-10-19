---
id: task-528-677-safari-zone-bounty-board-ui
type: TASK
title: Safari Zone Bounty Board UI Components
status: READY
owner_persona: coder
created_at: '2024-05-24'
updated_at: '2026-10-19'
depends_on:
  - task-528-676-safari-zone-bounty-board-data
jules_session_id: null
pr_number: null
parent: story-325-528-safari-zone-bounty-board
tags:
  - frontend
  - ui
  - safari-zone
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Safari Zone Bounty Board UI Components

## Overview
Implement the UI components for the "bounty board" side panel that displays uncaught rare encounters in the Safari Zone, ensuring adherence to the tactical UI aesthetics defined in ADR 024.

## Acceptance Criteria
- [ ] Implement the `SafariBountyBoard` component
- [ ] Strictly use tactical UI CSS utilities and avoid long strings of inline classes by leveraging `@utility` classes where appropriate
- [ ] Integrate with the data hook built in the previous task to display uncaught rare encounters
- [ ] Include proper unit tests to ensure components render correctly
