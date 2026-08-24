---
id: task-443-479-adr-008-ui-compliance-linter-ci
type: TASK
title: Integrate ADR 008 Linter into CI
status: READY
owner_persona: coder
created_at: '2026-08-24'
updated_at: '2026-08-24'
depends_on:
  - task-443-478-adr-008-ui-compliance-linter-tests
jules_session_id: null
pr_number: null
parent: story-417-443-adr-008-ui-compliance-linter
tags:
  - foundry
  - linter
  - compliance
  - adr
  - ci
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Integrate ADR 008 Linter into CI

## Objective
Integrate the `scripts/verify-adr-compliance.ts` script into the project's tooling and CI pipelines.

## Technical Requirements
- Add a script in `package.json` to execute `scripts/verify-adr-compliance.ts` (e.g., `pnpm run lint:adr`).
- Integrate the check into the broader `lint` script in `package.json` to ensure it is run locally.
- Add the check to the CI workflow (`.github/workflows/ci.yml`) under the `lint` job.

## Acceptance Criteria
- [ ] Add the execution script to `package.json`.
- [ ] Include the script execution in the main `lint` command in `package.json`.
- [ ] Add the execution step to `.github/workflows/ci.yml` in the `lint` job.
