---
id: epic-047-082-gen3-tv-swarm-dashboard-ui
type: EPIC
title: Gen 3 TV Broadcast and Swarm Dashboard UI
status: PENDING
owner_persona: story_owner
created_at: '2026-06-12'
updated_at: '2026-06-12'
depends_on:
  - epic-047-081-gen3-tv-swarm-data-extraction
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
rejection_reason: ''
notes: ''
---

# Epic: Gen 3 TV Broadcast and Swarm Dashboard UI

## 1. Overview
This epic covers the frontend implementation of a tactical UI dashboard for displaying parsed Gen 3 TV broadcasts and swarm tracking data. It visualizes time-gated mechanics, allowing players to view active outbreaks, upcoming TV schedules, and mix record insights.

## 2. Requirements

### 2.1. TV & Swarm Dashboard Component
- Create a dedicated React component to serve as the main dashboard for TV and swarm data.
- Integrate the parsed backend data (from `epic-047-081-gen3-tv-swarm-data-extraction`).

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
