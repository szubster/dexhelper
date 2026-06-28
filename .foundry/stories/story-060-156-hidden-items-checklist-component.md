---
id: story-060-156-hidden-items-checklist-component
type: STORY
title: Build Hidden Items Checklist Component
status: READY
owner_persona: tech_lead
created_at: '2026-06-28'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-037-060-hidden-items-ui
tags:
  - feature
  - tool
  - quality-of-life
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Build Hidden Items Checklist Component

## 1. Context & Background
As part of the Missing Hidden Items Finder feature, we need to create a dedicated view within DexHelper to display a checklist of valuable hidden items. The view should visually reflect items the player has acquired.

## 2. Product Requirements
- Build a UI component displaying a categorized checklist of valuable hidden items (grouped by route, town, or region).
- The component must adhere to the 'tactical hardware/snooping' aesthetic (ADR 008) using sharp edges, dashed borders, and monospaced telemetry fonts.
- Integrate the component to dynamically check off items based on the hydrated save data.

## 3. Acceptance Criteria
- [ ] Checklist UI is built and styled correctly.
- [ ] Checklist is logically grouped and filterable.
- [ ] Component is connected to save file state for dynamic checking of acquired items.
