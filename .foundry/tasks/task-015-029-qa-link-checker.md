---
id: task-015-029-qa-link-checker
type: TASK
title: "QA Validation: Link Checker Pre-commit Hook Script"
status: READY
owner_persona: qa
created_at: "2026-04-25"
updated_at: "2026-04-25"
depends_on:
  - .foundry/tasks/task-015-028-implement-link-checker.md
jules_session_id: null
parent: .foundry/stories/story-006-015-implement-link-checker.md
tags: ["infras", "verification"]
rejection_count: 0
notes: ""
---

# QA Task: Validate Link Checker Pre-commit Hook

## Objective
Verify that the automated git pre-commit hook script implemented by the `coder` correctly validates all local markdown file references (both YAML frontmatter and inline markdown links) and correctly rejects commits containing dead links.

## Verification Steps
- Simulate an invalid reference in the `depends_on` array of a `.foundry/**/*.md` file, attempt to commit, and verify that the commit is aborted by `lefthook` with a clear error message.
- Simulate an invalid reference in the `parent` field of a `.foundry/**/*.md` file, attempt to commit, and verify the commit is similarly rejected.
- Introduce an invalid inline markdown link (e.g., `[Test](./invalid-path.md)`) into a staged markdown file, attempt to commit, and verify it is rejected.
- Introduce only valid links in `depends_on`, `parent`, and inline markdown, attempt to commit, and verify the commit succeeds.
- Confirm the hook only runs on modified/staged markdown files to avoid performance overhead on irrelevant files.

## Context
This QA task ensures the requirements outlined in `.foundry/stories/story-006-015-implement-link-checker.md` and implemented in `.foundry/tasks/task-015-028-implement-link-checker.md` are met.

## Acceptance Criteria
- [ ] Validated that broken `depends_on` links prevent commits.
- [ ] Validated that broken `parent` links prevent commits.
- [ ] Validated that broken inline markdown links prevent commits.
- [ ] Validated that perfectly valid files can be committed successfully.
- [ ] Verified that the hook runs correctly via `lefthook`.
