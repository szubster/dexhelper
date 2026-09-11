---
id: story-524-524-architectural-linting
type: STORY
title: Introduce Architectural Linting
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-03'
updated_at: '2026-09-03'
depends_on:
  - story-524-523-configure-global-packages
jules_session_id: null
pr_number: null
parent: epic-519-524-workspace-infrastructure
tags:
  - architecture
  - monorepo
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Introduce Architectural Linting

## Objectives
- Introduce architectural linting (e.g., Oxlint rules, `dependency-cruiser`) to enforce cross-package boundaries.
- Ensure linting rules restrict forbidden imports (e.g., frontend code in backend).

## Acceptance Criteria
- [ ] Break this story down into tasks for setting up dependency-cruiser and Oxlint rules.
