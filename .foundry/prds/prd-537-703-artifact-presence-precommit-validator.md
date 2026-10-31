---
id: prd-537-703-artifact-presence-precommit-validator
type: PRD
title: Automated Pre-Commit Deliverable Artifact Presence Validator
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-10-18'
updated_at: '2026-10-24'
depends_on: []
jules_session_id: '3500086733412656414'
pr_number: null
parent: idea-537-artifact-presence-precommit-validator
tags:
  - testing
  - linter
  - validation
  - workflow
priority: 80
rejection_reason: ''
---

# PRD: Automated Pre-Commit Deliverable Artifact Presence Validator

## Problem
In several task sessions, Coder agents have prematurely marked implementation tasks as COMPLETED without saving or staging the required source code or integration test deliverable files on disk. This results in empty pull requests, triggering downstream QA rejections for missing artifacts, slowing down the overall autonomous pipeline.

## Proposed Solution
Develop an automated pre-commit or linter validation tool (e.g. integrated into `.github/scripts/` or a Lefthook pre-commit step).

### Requirements
1. **Parser:** The tool must parse the active Foundry TASK node's markdown (specifically its acceptance criteria and any explicit deliverable lists) to extract the expected file paths for source code, tests, and configurations.
2. **Presence Verification:** The tool must verify via the file system and Git that the specified files exist on disk, are non-empty, and are staged for commit.
3. **Enforcement:** If a deliverable file is omitted or left unstaged, the tool must fail the pre-commit hook (exit with a non-zero status), effectively blocking the agent from submitting the empty PR and forcing them to actually write the missing files.

## Acceptance Criteria
- [x] EPIC breakdown generated.
- [ ] epic-703-696-artifact-presence-parser-engine
- [ ] epic-703-697-artifact-presence-verification-logic
- [ ] epic-703-698-artifact-presence-lefthook-integration
- [ ] epic-703-699-artifact-presence-e2e
