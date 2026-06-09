---
id: task-071-150-tailwind-v4-adr
type: TASK
title: Draft ADR for Tailwind v4 Utilities
status: READY
owner_persona: architect
created_at: '2026-06-09'
updated_at: '2026-06-09'
depends_on:
  - research-071-137-tailwind-v4-utilities
jules_session_id: null
pr_number: null
parent: idea-071-tailwind-v4-utilities-migration
tags:
  - tech-debt
  - styling
  - adr
research_references:
  - .foundry/research/research-071-137-tailwind-v4-utilities.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Draft ADR for Tailwind v4 Utilities

## Context
Based on the research conducted on Tailwind v4's `@utility` API, we need an Architecture Decision Record (ADR) that formally outlines the consolidation strategy for replacing repetive utility combinations with custom primitives in `src/index.css`.

## Requirements
- Create a new ADR document in `.foundry/docs/adrs/`.
- The ADR must describe the exact naming conventions for the new utilities (e.g., `tactical-panel`, `tactical-focus`).
- The ADR must outline an incremental migration strategy to update components across `src/components/` without regressions.

## Acceptance Criteria
- [ ] Read the research findings.
- [ ] Create a new ADR document.
- [ ] The ADR details the chosen consolidation strategy and naming conventions.
- [ ] The ADR outlines the incremental migration approach.
