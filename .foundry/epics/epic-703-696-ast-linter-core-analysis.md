---
id: epic-703-696-ast-linter-core-analysis
type: EPIC
title: AST Linter Core Context Analysis
status: ACTIVE
owner_persona: story_owner
created_at: '2026-10-23'
updated_at: '2026-10-31'
depends_on: []
jules_session_id: '8474987953631413842'
pr_number: null
parent: prd-538-703-ast-linter-context-wiring
tags:
  - react
  - linter
  - context
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 80
---

# EPIC: AST Linter Core Context Analysis

## Objective
Implement the foundational AST parsing capabilities to identify and extract custom React Context definitions and their corresponding Context Provider exports within the `src/` directory.

## Requirements
1. Develop an AST parsing utility capable of scanning TypeScript/TSX files in the `src/` directory.
2. Accurately identify the creation of custom React Contexts (e.g., `createContext`).
3. Accurately identify exported Context Provider components associated with the discovered contexts.

## Acceptance Criteria
- [x] Break down into Story.
- [ ] story-696-734-ast-analyzer-react-context-detection
- [ ] story-696-735-ast-analyzer-provider-export-detection
- [ ] story-696-736-ast-analyzer-context-e2e-verification
