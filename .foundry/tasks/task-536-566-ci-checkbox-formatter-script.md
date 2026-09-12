---
id: task-536-566-ci-checkbox-formatter-script
type: TASK
title: Implement CI Checkbox Formatter Script
status: READY
owner_persona: coder
created_at: '2026-09-08'
updated_at: '2026-09-08'
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: story-534-536-propose-acceptance-criteria-alternatives
priority: 50
tags:
  - foundry
  - architecture
research_references:
  - .foundry/research/research-534-517-audit-acceptance-criteria.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement CI Checkbox Formatter Script

## Context
As part of Alternative D from `research-534-517-audit-acceptance-criteria`, we need a script to ensure Acceptance Criteria checkboxes in parent nodes are strictly formatted (e.g., preventing `-[]` or `* [ ]`), which currently cause parsing ambiguities for the Orchestrator.

## Requirements
- Create a script (e.g., a Node.js or bash script in `.github/scripts/`) that scans `.foundry/` parent nodes and normalizes Acceptance Criteria checkboxes to the strict `- [ ]` or `- [x]` format.
- Add this script to the CI pipeline or as a `pnpm` format script.

## Acceptance Criteria
- [ ] coder: Implement the checkbox formatting script.
- [ ] coder: Integrate the script into the `package.json` format checks or GitHub actions.
