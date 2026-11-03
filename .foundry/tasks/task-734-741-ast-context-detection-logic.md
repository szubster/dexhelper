---
id: task-734-741-ast-context-detection-logic
type: TASK
title: AST Context Detection Logic
status: READY
owner_persona: coder
created_at: '2026-11-02'
updated_at: '2026-11-02'
depends_on:
  - task-734-740-ast-context-detection-types
jules_session_id: null
pr_number: null
parent: story-696-734-ast-analyzer-react-context-detection
tags:
  - react
  - linter
  - context
  - architecture
  - logic
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# TASK: AST Context Detection Logic

## Objective
Implement the core logic to parse TypeScript/TSX files and detect the creation of custom React Contexts via `createContext`.

## Requirements
1. Use `typescript` or a suitable AST parsing library (e.g., `ts-morph`) to scan source files.
2. Accurately identify occurrences of `createContext`.
3. Extract relevant information, such as the context name and file location, using the types defined in the previous task.

## Acceptance Criteria
- [ ] Implement AST parsing logic to identify `createContext` calls.
