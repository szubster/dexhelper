---
id: task-605-659-lint-foundry-qa
type: TASK
title: 'Verify lint:foundry package script'
status: PENDING
owner_persona: qa
created_at: '2025-02-18T00:00:00.000Z'
updated_at: '2025-02-18T00:00:00.000Z'
depends_on:
  - task-605-658-lint-foundry-coder
jules_session_id: null
parent: story-553-605-package-scripts
tags:
  - foundry
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Verify lint:foundry package script

## Objectives
- Verify `lint:foundry` script correctly executes `node --experimental-strip-types scripts/validate-foundry-schema.ts`.
- Verify `lint:foundry` is appended to the main `lint` script.

## Acceptance Criteria
- [ ] `"lint:foundry"` exists in `package.json`.
- [ ] `"lint:foundry"` is integrated into the main `"lint"` script in `package.json`.
