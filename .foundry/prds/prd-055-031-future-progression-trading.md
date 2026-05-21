---
id: prd-055-031-future-progression-trading
type: PRD
title: Future Progression Features and Trading (Phase 2)
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-05-20'
updated_at: '2026-05-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-055-cloudflare-sync-and-future-features
tags:
  - backend
  - sync
  - progression
  - trading
  - phase2
research_references: []
rejection_reason: ''
notes: Derived from Idea 055
---

# PRD: Future Progression Features and Trading (Phase 2)

## Context
Following the implementation of Phase 1 (basic authentication and save syncing), we need to expand the backend's capability to track multiple concurrent states and allow cross-save interactions. This PRD details Phase 2 features.

## Requirements

### 1. Progression Tracking & Multiple Saves
- Support storing and tracking multiple save files per playthrough, enabling progression tracking over time.
- Support managing states across different games concurrently (e.g., Pokémon Red, Diamond, Emerald).

### 2. Pokémon Trading (Inter-Save)
- Implement a mechanism to transfer Pokémon between a user's different playthroughs.
- Enforce game and generation transfer rules during the trading process (e.g., similar to PKHeX validations).

## Constraints
- Must build upon the Cloudflare architecture established in Phase 1.
- Offline-first mandate remains; features must degrade gracefully when disconnected.

## Acceptance Criteria
- [x] Epic Planner: Break this PRD down into Epics.

## References
- Parent Idea: `.foundry/ideas/idea-055-cloudflare-sync-and-future-features.md`

## Generated Epics
- `.foundry/epics/epic-031-036-progression-tracking.md`
- `.foundry/epics/epic-031-037-inter-save-trading.md`
