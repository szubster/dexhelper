---
id: task-335-386-track-daily-rematch-status-impl
type: TASK
title: Integrate Gen 3 Secret Base Daily Rematch Status UI
status: ACTIVE
owner_persona: coder
created_at: '2026-08-02'
updated_at: '2026-08-02'
depends_on: []
jules_session_id: '6416454005956742836'
pr_number: null
parent: story-324-335-track-daily-rematch-status
tags:
  - feature
  - gen3
  - secret-base
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Integrate Gen 3 Secret Base Daily Rematch Status UI

## Context
Players can battle the NPC trainers in Secret Bases once per day. The core data extraction engine already successfully extracts the `battledOwnerToday` flag from Gen 3 save files (see `src/engine/gen3/secretBase/parser.ts`). We need to integrate this extracted status into the frontend UI so that players can clearly see which Secret Base trainers are available for a battle today.

## Objective
Integrate the `battledOwnerToday` status into the extracted Secret Base trainer data UI representation so the UI can display availability.

## Requirements
1.  **Strictly adhere to ADR 008** for UI component aesthetics (tactical hardware/snooping, sharp edges `rounded-none`, dashed borders `border-dashed`, monospaced telemetry fonts `font-mono`).
2.  Update the relevant UI components that display Gen 3 Secret Bases to show the rematch status (e.g., "Battle Available" or "Already Battled").
3.  Ensure the new UI elements use the data correctly from the parsed `gen3SecretBases` array.
4.  Write or update relevant tests to ensure the UI correctly conditionally renders the battle status based on the `battledOwnerToday` boolean flag.

## Acceptance Criteria
- [x] Implement UI integration for the `battledOwnerToday` status in Gen 3 Secret Base views.
- [x] Strictly adhere to ADR 008 styling guidelines.
- [x] Add/update relevant unit or component tests.
