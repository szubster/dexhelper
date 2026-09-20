---
id: task-563-586-develop-migration-script
type: TASK
title: Develop Migration Script for Task Reminders
status: READY
owner_persona: coder
created_at: '2026-09-16T23:51:03Z'
updated_at: '2026-09-16T23:51:03Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-335-563-develop-migration-script
tags:
  - foundry
  - script
  - migration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Develop Migration Script for Task Reminders

## 1. Context & Objectives
This task involves creating a script to migrate existing task nodes by removing any `### REMINDER FOR CODER` and `### REMINDER FOR QA` sections from active, pending, or ready tasks. The script will maintain the file's overall integrity, including frontmatter and other sections.

## 2. Requirements
1.  **Script Creation:** Create a new script, preferably `.cjs` in the `scripts/` or a relevant utility folder (e.g., `scripts/migrate-task-reminders.cjs`).
2.  **File Discovery:** The script must locate all Markdown (`.md`) files within the `.foundry/tasks/` directory.
3.  **State Filtering:** For each file found, parse the YAML frontmatter. Only process the file if its `status` is one of: `ACTIVE`, `PENDING`, or `READY`.
4.  **Content Modification:**
    *   Find the `### REMINDER FOR CODER` and `### REMINDER FOR QA` sections.
    *   Remove the section headers and all their content up to the next Markdown heading (e.g., `#`, `##`, `###`) or the end of the file.
5.  **Data Integrity:** Ensure that the original YAML frontmatter and all other markdown content (especially the `## Acceptance Criteria` section) remain exactly as they were, unmodified by this script.
6.  **Script Execution:** Ensure the script can be executed locally to test its functionality. Do not commit temporary or developer scratchpad scripts. If you write a temporary script for the implementation, ensure the final reusable script is properly integrated or documented in `.foundry/docs/knowledge_base/` if meant to be a utility, or executed and then deleted if it is a one-off task (though the requirement states "Develop Migration Script", so creating a persistent `.cjs` or `.ts` script file is expected). Wait, actually, since it's a migration script, it's typically a utility script or one-off script. A script file like `scripts/migrate-task-reminders.cjs` is appropriate.

## 3. Acceptance Criteria
- [x] A migration script (e.g., `scripts/migrate-task-reminders.cjs`) has been created.
- [x] The script finds and processes all `.md` files in `.foundry/tasks/`.
- [x] The script correctly filters tasks based on the `ACTIVE`, `PENDING`, or `READY` statuses in the YAML frontmatter.
- [x] The script successfully removes `### REMINDER FOR CODER` and `### REMINDER FOR QA` sections and their contents.
- [x] The script preserves the YAML frontmatter and all other markdown content unharmed.
- [x] The script has been executed to migrate current tasks (if applicable during testing), and code has been tested to work.
