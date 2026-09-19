---
id: task-563-587-qa-migration-script
type: TASK
title: QA Migration Script for Task Reminders
status: PENDING
owner_persona: qa
created_at: '2026-09-16T23:51:03Z'
updated_at: '2026-09-16T23:51:03Z'
depends_on:
  - task-563-586-develop-migration-script
jules_session_id: null
pr_number: null
parent: story-335-563-develop-migration-script
tags:
  - foundry
  - script
  - migration
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: QA Migration Script for Task Reminders

## 1. Context & Objectives
Verify the migration script implemented in `task-563-586-develop-migration-script`. The script is intended to remove `### REMINDER FOR CODER` and `### REMINDER FOR QA` sections from all active, pending, or ready task nodes in `.foundry/tasks/` while leaving all other sections and YAML frontmatter intact.

## 2. Requirements
1.  **Code Review:** Review the script (e.g., `scripts/migrate-task-reminders.cjs` or `.ts`) to ensure it uses robust file parsing and only filters `.md` files in `.foundry/tasks/`.
2.  **State Filtering Verification:** Ensure the script correctly targets only nodes with `ACTIVE`, `PENDING`, or `READY` statuses in their YAML frontmatter, explicitly ignoring `COMPLETED`, `FAILED`, and `CANCELLED` nodes.
3.  **Content Removal Verification:** Verify the script accurately removes the exact sections `### REMINDER FOR CODER` and `### REMINDER FOR QA` (including their contents up to the next Markdown heading or EOF) without accidentally deleting adjacent content.
4.  **Data Integrity Verification:** Run a local test with sample Markdown files to confirm that YAML frontmatter parsing and serialization are flawless, and that the `## Acceptance Criteria` section and checkboxes remain perfectly intact and properly formatted.
5.  **Execution Check:** Ensure the script successfully runs without crashing and performs the migration as expected. Check for any side-effects, such as unintended line breaks or loss of newlines between sections.

## 3. Acceptance Criteria
- [ ] Code has been reviewed for robustness, correct file filtering, and safety.
- [ ] Verified that the script correctly processes only `ACTIVE`, `PENDING`, or `READY` tasks.
- [ ] Verified that the script correctly targets and removes ONLY the specified reminder sections and their contents.
- [ ] Verified that the script preserves the YAML frontmatter and all other Markdown content, including checkboxes, unharmed.
- [ ] The migration script works correctly without introducing file corruption or unexpected data loss.
