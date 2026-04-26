---
id: "task-016-039-oxlint-type-aware"
type: "TASK"
title: "Enable oxlint type-aware and type-check options"
status: "FAILED"
owner_persona: "coder"
created_at: "2026-04-26"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: null
parent: ".foundry/stories/story-010-016-enable-expensive-oxlint-checks.md"
---

# Enable oxlint type-aware and type-check options

## Context
As part of making oxlint more strict, we want to enable the `--type-aware` and `--type-check` flags to get the most comprehensive linting possible. 

## Instructions
1. Update `package.json` linting scripts to run `oxlint` with `--type-aware` and `--type-check` flags.
2. Resolve any new lint errors reported across the codebase due to the new checks.
3. Ensure CI still passes with these expensive checks.
