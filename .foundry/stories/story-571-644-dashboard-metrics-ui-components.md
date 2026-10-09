---
id: story-571-644-dashboard-metrics-ui-components
type: STORY
title: Update dashboard components for confidence metrics
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-10-01T15:08:20.012Z'
updated_at: '2026-10-07'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-565-571-agent-confidence-metrics-dashboard-ui
tags:
  - ui
  - dashboard
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 60
---

# Update dashboard components for confidence metrics

## Context
Based on epic-565-571, the UI dashboard needs to visualize the confidence scores reported by agents.

## Requirements
- Update the UI dashboard components.
- Expose the confidence scores visually.
- Implement color-coding logic for low-confidence nodes:
  - Red for `< 70`
  - Yellow for `70 - 89`
  - Green for `90+`

## Acceptance Criteria
- [x] task-644-649-parser-and-builder-confidence
- [x] task-644-650-qa-parser-and-builder-confidence
- [x] task-644-651-context-and-ui-confidence
- [x] task-644-652-qa-context-and-ui-confidence
- [x] Implement the UI components for agent confidence metrics.
