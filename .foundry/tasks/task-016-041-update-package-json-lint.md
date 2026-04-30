---
id: "task-016-041-update-package-json-lint"
type: "TASK"
title: "Update package.json lint scripts with expensive oxlint flags"
status: "READY"
owner_persona: "coder"
created_at: "2026-04-26"
updated_at: "2026-04-30"
depends_on: []
jules_session_id: null
pr_number: null
parent: ".foundry/stories/story-010-016-enable-expensive-oxlint-checks.md"
tags: []
rejection_count: 5
rejection_reason: ""
notes: ""
---

# Update package.json lint scripts with expensive oxlint flags

## Context
As part of enabling expensive and strict oxlint checks, we need to update the `package.json` lint scripts to include the flags for type-aware checks and import/promise plugins.

## Instructions
1. Update `package.json` lint script to include `--type-aware`, `--type-check`, `--import-plugin`, and `--promise-plugin` for `oxlint`.
2. Ensure CI passes.

## Acceptance Criteria
- [ ] `package.json` lint commands run these expensive checks.
