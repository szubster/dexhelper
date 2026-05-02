---
id: story-006-015-implement-link-checker
type: STORY
title: "Implement Link Checker Pre-commit Hook"
status: "COMPLETED"
owner_persona: tech_lead
created_at: "2026-04-24"
updated_at: "2026-04-25"
depends_on: []
jules_session_id: null
parent: .foundry/archive/prds/prd-007-006-automated-link-checker.md
tags: ["infras", "verification"]
rejection_count: 1
notes: ""
---

# Story: Implement Automated Link Checker Pre-commit Hook

## Objective
Implement an automated git pre-commit hook that validates all local markdown file references (both in YAML frontmatter and inline markdown links) to ensure they point to existing files on disk, preventing DAG orchestrator deadlocks.

## Acceptance Criteria
- [ ] A pre-commit script is created to parse markdown files and validate all relative file paths.
- [ ] The script checks `depends_on` and `parent` fields in the YAML frontmatter.
- [ ] The script checks inline markdown links within the files.
- [ ] The pre-commit hook is integrated and successfully rejects commits containing dead links.

## Generated Tasks
- .foundry/tasks/task-015-028-implement-link-checker.md
- .foundry/tasks/task-015-029-qa-link-checker.md
