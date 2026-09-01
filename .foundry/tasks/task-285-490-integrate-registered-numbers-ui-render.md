---
id: task-285-490-integrate-registered-numbers-ui-render
type: TASK
title: Render ActiveCallersDashboard in Gen 2 Dashboard
status: COMPLETED
owner_persona: coder
created_at: '2026-07-07'
updated_at: '2026-09-01'
depends_on:
  - task-285-489-integrate-registered-numbers-ui-data
jules_session_id: null
pr_number: null
parent: story-116-285-integrate-registered-numbers-ui
tags:
  - ui
  - gen2
  - react
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Render ActiveCallersDashboard in Gen 2 Dashboard

## Objective
Integrate the `ActiveCallersDashboard` component into the Gen 2 dashboard view, passing it the extracted registered numbers and a static initial timer state.

## Acceptance Criteria
- [x] Lazy load `ActiveCallersDashboard` from `../components/dashboard/pokegear/ActiveCallersDashboard` in `src/routes/dashboard.tsx`.
- [x] In `src/routes/dashboard.tsx`, when `saveData.generation === 2`, check if `saveData.gen2PokegearPhone?.highValueContacts` exists.
- [x] If it exists, render `<ActiveCallersDashboard contacts={saveData.gen2PokegearPhone.highValueContacts} timerState={{ delayMinsRemaining: 0, timeCyclesSinceLastCall: 0 }} />`.
