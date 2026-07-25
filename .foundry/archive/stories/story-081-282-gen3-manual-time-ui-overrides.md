---
id: story-081-282-gen3-manual-time-ui-overrides
type: STORY
title: Implement Gen 3 Manual Time UI Overrides
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-06'
updated_at: '2026-07-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-047-081-gen3-tv-swarm-data-extraction
tags:
  - feature
  - gen3
  - rtc
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Story: Implement Gen 3 Manual Time UI Overrides

## Description
Based on ADR 025 and the findings from `research-081-144-gen3-rtc-strategy`, this story covers the implementation of Manual UI Overrides for Gen 3. We will provide UI controls to allow users to manually set or override the time state (e.g., simulating day/night or specific days for time-gated events).

## Acceptance Criteria
- [x] Implement Manual UI Overrides to allow users to force a specific time state.
- [x] Adhere strictly to ADR 008 tactical hardware/snooping aesthetic: use sharp edges (rounded-none), avoid rounded corners, and use dashed borders (border-dashed) with monospaced telemetry fonts (font-mono).
- [x] task-282-304-gen3-manual-time-ui-overrides-impl
- [x] task-282-305-gen3-manual-time-ui-overrides-qa
