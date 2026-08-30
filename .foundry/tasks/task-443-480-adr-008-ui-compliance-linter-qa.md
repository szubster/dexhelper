---
id: task-443-480-adr-008-ui-compliance-linter-qa
type: TASK
title: QA Verify ADR 008 Linter
status: FAILED
owner_persona: qa
created_at: '2026-08-24'
updated_at: '2026-08-30'
depends_on:
  - task-443-479-adr-008-ui-compliance-linter-ci
jules_session_id: null
pr_number: null
parent: story-417-443-adr-008-ui-compliance-linter
tags:
  - foundry
  - linter
  - compliance
  - adr
  - qa
research_references: []
rejection_count: 0
rejection_reason: Merged with unfulfilled acceptance criteria
notes: ''
---

# QA Verify ADR 008 Linter

## Objective
Verify the `scripts/verify-adr-compliance.ts` correctly detects ADR 008 violations and is integrated into the CI process.

## Technical Requirements
- Run the unit tests added for the script using `vitest`.
- Manually run the script against a test file that contains forbidden classes (`rounded-t`, etc.) and ensure it fails with a clear message.
- Manually run the script against a test file with allowed classes (`rounded-none`, etc.) and ensure it passes.
- Verify `package.json` contains the script and it runs successfully as part of the `lint` command.
- Verify the CI workflow file is updated to execute the lint check.

## Acceptance Criteria
- [ ] Verify unit tests pass and cover forbidden and compliant classes.
- [ ] Verify script correctly fails on a test file with violations.
- [ ] Verify script correctly passes on a test file with no violations.
- [ ] Verify `package.json` integration.
- [ ] Verify `.github/workflows/ci.yml` integration.

### Execution Notes
Target task `task-443-479-adr-008-ui-compliance-linter-ci` was verified to be missing the `lint:adr` command in `package.json` and in the CI workflow. Triggered a transient rejection on the target task.
