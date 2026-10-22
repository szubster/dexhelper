---
id: epic-047-585-gen3-tv-swarm-dashboard-ui
type: EPIC
title: Gen 3 TV Broadcast and Swarm Dashboard UI (Replacement)
status: PENDING
owner_persona: story_owner
created_at: "2026-10-16T18:00:00.000Z"
updated_at: "2026-10-16"
depends_on:
  - epic-047-584-gen3-tv-swarm-data-extraction
jules_session_id: null
pr_number: null
parent: prd-075-047-gen3-tv-swarm-tracker
tags:
  - feature
  - gen3
  - daily-events
  - ui
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
locks: []
---

# Epic: Gen 3 TV Broadcast and Swarm Dashboard UI (Replacement)

## 1. Overview
This epic replaces the cancelled `epic-047-082-gen3-tv-swarm-dashboard-ui`. It covers the frontend implementation of a tactical UI dashboard for displaying parsed Gen 3 TV broadcasts and swarm tracking data. It visualizes time-gated mechanics, allowing players to view active outbreaks, upcoming TV schedules, and mix record insights.

## 2. Requirements

### 2.1. TV & Swarm Dashboard Component
- Create a dedicated React component to serve as the main dashboard for TV and swarm data.
- Integrate the parsed backend data (from `epic-047-584-gen3-tv-swarm-data-extraction`).

### 2.2. Radar and Schedules
- **Active Swarm Radar:** Highlight currently active mass outbreaks on the world map. Show the specific Pokémon species and route.
- **Broadcast Schedule View:** Provide a forecasted timeline for upcoming TV events based on save file event timers (e.g., "Skitty Swarm next Tuesday").
- **Mix Record Sync Insights:** Display information indicating if events were synced from other players.

### 2.3. Tactical Aesthetic
- **Strict UI Constraint (ADR 008):** The dashboard MUST adhere strictly to the 'tactical hardware/snooping' aesthetic.
- Use sharp edges (`rounded-none`).
- Use dashed borders (`border-dashed`).
- Use monospaced telemetry fonts (`font-mono`).
- Strictly avoid generic visual patterns like soft shadows or rounded corners.

## 3. Acceptance Criteria
- [ ] Story Owner: Break down into Stories.
- [ ] Story Owner: Ensure a final story is created for E2E Integration and Verification.
