---
id: idea-073-refactor-dag-dashboard-context
type: IDEA
title: "Refactor DagDashboard to use React Context (ADR 013/017)"
status: PENDING
owner_persona: product_manager
created_at: "2026-06-10"
updated_at: "2026-06-10"
depends_on: []
jules_session_id: null
tags: ["architecture", "ui", "dashboard"]
---

# Refactor DagDashboard to use React Context (ADR 013/017)

## Context
Recent implementation attempts (e.g., `task-085-142`) permanently failed because the state was left tightly coupled within `DagDashboard.tsx`. ADR 013 (Kanban Board State Management) and ADR 017 (Permanent Failure Dashboard) require the core DAG data state to be lifted out of the isolated component and into a shared React Context (or global store) so that multiple views (Graph View, Board View, Permanent Failures) can consume the same single source of truth.

## Proposal
Create a dedicated Epic to properly architect and implement the `DagContext` layer before any further UI dashboard features are added. This foundational work will resolve the friction coders are experiencing and allow the Permanent Failure Dashboard to be completed successfully.
