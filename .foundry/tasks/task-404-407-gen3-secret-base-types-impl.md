---
id: task-404-407-gen3-secret-base-types-impl
type: TASK
title: Gen 3 Secret Base Shared Types and Interface
status: ACTIVE
owner_persona: coder
created_at: '2026-08-08'
updated_at: '2026-08-09'
depends_on: []
jules_session_id: '14570129440806161122'
pr_number: null
parent: story-397-404-gen3-secret-base-parsing-core
tags:
  - task
  - gen3
  - secret-base
  - types
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Gen 3 Secret Base Shared Types and Interface

## Context
As part of the Gen 3 Secret Base and Mixed Record Viewer Epic, we are breaking down the save file parsing logic. This initial task focuses on creating the foundational shared types and TypeScript interfaces required for Secret Base extraction, ensuring type safety before implementing the core parser logic.

## Objectives
- Define the core data structures (interfaces/types) for representing a Gen 3 Secret Base.
- Expose these types for use in subsequent parser and UI implementation tasks.

## Acceptance Criteria
- [ ] Define `SecretBase` and related interfaces (e.g., location, decorations) reflecting Gen 3 specific attributes.
- [ ] Ensure types are exported and available for the parser engine.
- [ ] Write basic unit tests to verify type shape where applicable (or verify via `type-check`).
