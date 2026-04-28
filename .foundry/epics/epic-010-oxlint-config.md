---
id: "epic-010-oxlint-config"
type: "EPIC"
title: "Tighten oxlint configuration and enable plugins"
status: PENDING
owner_persona: "story_owner"
created_at: "2026-04-23"
updated_at: "2026-04-27"
parent: ""
depends_on: []
jules_session_id: null
---

## Summary
In response to CEO feedback (PR comment 4303644512), we need to schedule work in the Foundry system to "provide a tight oxlint config, enable plugins, and in general make the best use of oxlint."

## Prerequisites
- `oxlint` is installed in the repository (completed in `jules-infras-oxlint`).

## Acceptance Criteria
- [x] A `.oxlintrc.json` configuration file is added.
- [x] Relevant `oxlint` plugins (e.g. jest/vitest, react, jsx-a11y) are enabled and configured to be "tight".
- [x] A story is generated to execute this epic.
- [x] New strict/expensive checks (multi-file, type-aware) are enabled.

## Generated Stories
- [.foundry/stories/story-010-014-implement-oxlint-config.md](../stories/story-010-014-implement-oxlint-config.md)
- [.foundry/stories/story-010-016-enable-expensive-oxlint-checks.md](../stories/story-010-016-enable-expensive-oxlint-checks.md)
- [.foundry/stories/story-010-017-fix-jest-rules.md](../stories/story-010-017-fix-jest-rules.md)
- [.foundry/stories/story-010-028-verify-jest-tests.md](../stories/story-010-028-verify-jest-tests.md)
