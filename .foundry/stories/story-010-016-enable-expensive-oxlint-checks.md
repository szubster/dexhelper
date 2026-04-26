---
id: "story-010-016-enable-expensive-oxlint-checks"
type: "STORY"
title: "Enable expensive and strict oxlint checks"
status: "PENDING"
owner_persona: "tech_lead"
created_at: "2026-04-26"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: null
parent: ".foundry/epics/epic-010-oxlint-config.md"
---

# Enable expensive and strict oxlint checks

## Context
Oxlint has additional options for multi-file checks and rules that require types. These checks might be expensive but are beneficial for ensuring code quality and safety. We need to enable them.

## Requirements
- Identify the CLI options for type-aware checks (e.g. `--type-aware`, `--type-check`).
- Identify the CLI options for multi-file checks (e.g. `--import-plugin`, `--promise-plugin`).
- Update `package.json` lint scripts to include these flags.

## Acceptance Criteria
- [x] Tasks are created for enabling type-aware checks.
- [x] Tasks are created for enabling import/promise plugins.
- [ ] `package.json` lint commands run these expensive checks.

## Generated Tasks
- [.foundry/tasks/task-016-039-oxlint-type-aware.md](../tasks/task-016-039-oxlint-type-aware.md)
- [.foundry/tasks/task-016-040-oxlint-import-promise-plugins.md](../tasks/task-016-040-oxlint-import-promise-plugins.md)
