---
id: task-043-073-read-foundry-files
type: TASK
title: 'DAG Parser: Read Files Utility'
status: COMPLETED
owner_persona: coder
created_at: '2026-05-09'
updated_at: '2026-05-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-028-043-implement-dag-parser
tags:
  - dag
  - dashboard
  - data
  - backend
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# DAG Parser: Read Files Utility

## Objective
Implement a utility function to read all relevant `.foundry` files.

## Requirements
- Create a utility function, for example `readFoundryFiles()`.
- The function should recursively (or systematically) read all markdown (`.md`) files in the following directories:
  - `.foundry/ideas/`
  - `.foundry/prds/`
  - `.foundry/epics/`
  - `.foundry/stories/`
  - `.foundry/tasks/`
- It should return an array of objects containing the file path and the raw string content of each file.
- Use native Node.js `fs` or `fs/promises` module.

## Acceptance Criteria
- [x] A utility function is implemented and exported.
- [x] It correctly reads all markdown files from the specified directories.
- [x] Unit tests verify that it returns the expected file paths and raw contents.
