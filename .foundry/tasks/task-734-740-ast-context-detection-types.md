---
id: task-734-740-ast-context-detection-types
type: TASK
title: AST Context Detection Types
status: ACTIVE
owner_persona: coder
created_at: '2026-11-02'
updated_at: '2026-11-08'
depends_on: []
jules_session_id: '9523418151196545874'
pr_number: null
parent: story-696-734-ast-analyzer-react-context-detection
tags:
  - react
  - linter
  - context
  - architecture
  - types
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# TASK: AST Context Detection Types

## Objective
Define the TypeScript types, interfaces, and constants required for the AST parsing utilities that detect custom React Context definitions.

## Requirements
1. Create a set of types/interfaces representing the output of the context detection analysis (e.g., `ContextDefinition`, `ContextProviderExport`).
2. Ensure the types align with the requirements of identifying `createContext` calls and their associated exports.

## Acceptance Criteria
- [ ] Define types and interfaces for context detection results.
