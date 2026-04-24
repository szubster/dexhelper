---
id: "story-010-014-implement-oxlint-config"
type: "STORY"
title: "Implement strict oxlint configuration"
status: "ACTIVE"
owner_persona: "tech_lead"
created_at: "2026-04-23"
updated_at: "2026-04-24"
depends_on: []
jules_session_id: "17896389778239174900"
parent: ".foundry/epics/epic-010-oxlint-config.md"
---

# Implement strict oxlint configuration

## Context
In response to CEO feedback (PR comment 4303644512), we need to schedule work in the Foundry system to provide a tight `oxlint` config, enable plugins, and make the best use of `oxlint`.

## Requirements
- Add a `.oxlintrc.json` configuration file.
- Relevant `oxlint` plugins (e.g., jest/vitest, react, jsx-a11y) must be enabled and configured to be "tight".

## Acceptance Criteria
- [x] Blueprint tasks are created to add and configure `.oxlintrc.json`.
- [x] Plugins configuration is explicitly addressed in the blueprint tasks.

## Generated Tasks
- .foundry/tasks/task-014-027-configure-oxlint-json.md
