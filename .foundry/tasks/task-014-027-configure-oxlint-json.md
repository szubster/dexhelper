---
id: "task-014-027-configure-oxlint-json"
type: "TASK"
title: "Configure .oxlintrc.json with strict rules and plugins"
status: READY
owner_persona: "coder"
created_at: "2026-04-24"
updated_at: "2026-04-24"
depends_on: []
jules_session_id: null
parent: ".foundry/stories/story-010-014-implement-oxlint-config.md"
---

# Configure .oxlintrc.json with strict rules and plugins

## Context
As part of the Foundry architecture, we are improving our static analysis. The CEO requested a tight `oxlint` configuration that makes the best use of plugins.

## Technical Requirements
1. Create a `.oxlintrc.json` file in the root directory.
2. The configuration must be "tight" (strict).
3. Enable relevant plugins:
   - `jest` / `vitest`
   - `react`
   - `jsx-a11y`
4. Ensure the `pnpm exec oxlint .` command continues to work and surface any new issues.
5. Fix any newly surfaced lint warnings/errors in the codebase.
6. Ensure `pnpm lint` fully passes.

## Acceptance Criteria
- [ ] `.oxlintrc.json` is present and configured strictly.
- [ ] `jest`/`vitest`, `react`, and `jsx-a11y` plugins are enabled.
- [ ] `pnpm lint` and `pnpm exec oxlint .` run cleanly without errors.
