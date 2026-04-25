---
id: task-015-028-implement-link-checker
type: TASK
title: "Implement Link Checker Pre-commit Hook Script"
status: READY
owner_persona: coder
created_at: "2026-04-25"
updated_at: "2026-04-25"
depends_on: []
jules_session_id: null
parent: .foundry/stories/story-006-015-implement-link-checker.md
tags: ["infras", "verification"]
rejection_count: 0
notes: ""
---

# Task: Implement Link Checker Pre-commit Hook Script

## Objective
Implement an automated git pre-commit hook script that validates all local markdown file references (both in YAML frontmatter and inline markdown links) to ensure they point to existing files on disk.

## Requirements
- Create a script (e.g., Node.js or bash) that parses markdown files staged for commit.
- The script must read the YAML frontmatter of `.foundry/**/*.md` files and validate that any repo-relative paths specified in the `depends_on` and `parent` fields exist on the filesystem.
- The script must parse the markdown body and extract inline markdown links (e.g., `[text](./relative/path.md)`) and ensure the resolved file paths exist.
- Integrate this script into the `lefthook.yml` configuration under the `pre-commit` hook.
- The hook should prevent the commit if any invalid links are found and log an appropriate error message indicating which file contains the broken link.

## Context
This task addresses the requirements outlined in `.foundry/stories/story-006-015-implement-link-checker.md`. Ensure that the implementation respects the project's strict TS and linting rules if writing a Node.js script.

## Acceptance Criteria
- [ ] A script is written to perform the required link validation.
- [ ] `lefthook.yml` is updated to run the script during `pre-commit`.
- [ ] Staged markdown files are properly parsed for frontmatter fields `depends_on` and `parent` and their existence validated.
- [ ] Staged markdown files are parsed for inline links, and the targets are validated.
- [ ] Commits are rejected if a broken link is detected.
