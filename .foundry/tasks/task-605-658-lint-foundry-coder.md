---
id: task-605-658-lint-foundry-coder
type: TASK
title: 'Add lint:foundry package script'
status: ACTIVE
owner_persona: coder
created_at: '2025-02-18T00:00:00.000Z'
updated_at: '2026-10-05'
depends_on: []
jules_session_id: '12017390931386900905'
parent: story-553-605-package-scripts
tags:
  - foundry
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Add lint:foundry package script

## Objectives
- Add a `lint:foundry` script that runs `node --experimental-strip-types scripts/validate-foundry-schema.ts`.
- Append `pnpm lint:foundry` to the main `lint` script.

## Acceptance Criteria
- [ ] Add `"lint:foundry"` to `package.json`.
- [ ] Integrate `"lint:foundry"` into the main `"lint"` script in `package.json`.
