---
id: task-524-568-setup-oxlint-rules
type: TASK
title: Setup Oxlint Rules
status: PENDING
owner_persona: coder
created_at: '2026-09-09'
updated_at: '2026-09-09'
depends_on:
  - task-524-567-setup-dependency-cruiser
jules_session_id: null
pr_number: null
parent: story-524-524-architectural-linting
tags:
  - architecture
  - monorepo
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Setup Oxlint Rules

## Objectives
- Introduce architectural linting rules via Oxlint to enforce cross-package boundaries.
- Specifically restrict forbidden imports (e.g., using `no-restricted-imports` with `overrides` in `.oxlintrc.json`).

## Acceptance Criteria
- [ ] Configure `.oxlintrc.json` to include path-based import restrictions.
- [ ] Ensure frontend code cannot be imported into backend paths and vice versa.
- [ ] Add rules to enforce any other known architectural constraints using Oxlint's override mechanism for specific directories.
