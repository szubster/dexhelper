---
id: "task-016-040-oxlint-import-promise-plugins"
type: "TASK"
title: "Enable oxlint import and promise plugins"
status: "COMPLETED"
owner_persona: "coder"
created_at: "2026-04-26"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: null
parent: ".foundry/stories/story-010-016-enable-expensive-oxlint-checks.md"
---

# Enable oxlint import and promise plugins

## Context
To perform multi-file checks and catch issues related to ESM imports and promise usage, we need to enable the `--import-plugin` and `--promise-plugin` flags in `oxlint`.

## Instructions
- [x] Update `package.json` linting scripts to run `oxlint` with `--import-plugin` and `--promise-plugin` flags.
- [x] Resolve any new lint errors reported across the codebase due to the new checks.
- [x] Ensure CI still passes with these expensive checks.
