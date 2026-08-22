---
id: task-431-460-conflict-resolution-modal-ui-impl
type: TASK
title: Implement R2 Conflict Resolution Modal UI Component
status: READY
owner_persona: coder
created_at: '2026-08-22'
updated_at: '2026-08-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-412-431-r2-conflict-resolution-prompt-components
tags:
  - ui
  - ux
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement R2 Conflict Resolution Modal UI Component

## Context
When an R2 Cloud Save sync detects a conflict (e.g. cloud is newer than local, or vice versa, based on timestamps), we need to display a UI prompt allowing the user to choose which save file to keep.

## Description
Create the React UI component for the Conflict Resolution Modal (e.g. `src/components/ConflictResolutionModal.tsx`).
- It must follow the Tactical UI Aesthetic (`rounded-none`, `border-dashed`, monospaced fonts).
- It should display two primary choices: "Keep Local" and "Pull Remote".
- It should display relevant metadata (such as last modified timestamp and potentially game time if available) for both the local and remote save files to help the user make an informed decision.
- It must accept `onKeepLocal` and `onPullRemote` callback functions.

## Acceptance Criteria
- [ ] Create `ConflictResolutionModal` component following the tactical UI aesthetic.
- [ ] Component accepts and correctly displays local and remote save metadata.
- [ ] Component invokes `onKeepLocal` and `onPullRemote` callbacks upon user selection.
