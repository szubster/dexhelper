---
id: adr-679-726-acceptance-criteria-structure
type: ADR
title: ADR 034 - Acceptance Criteria Structure
status: ACTIVE
owner_persona: architect
created_at: '2026-10-25'
updated_at: '2026-10-31'
depends_on: []
jules_session_id: '18122965331286005741'
pr_number: null
parent: story-535-679-adr-acceptance-criteria
tags:
  - foundry
  - architecture
  - adr
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# ADR 034: Acceptance Criteria Structure

## Context
Following the research on Acceptance Criteria usage (`research-534-517-audit-acceptance-criteria`), we need to formalize the decision to adopt Alternative B and Alternative D to reduce friction and false-positive Empty PR merges.

## Decision
1. **Alternative B (Differentiate Parent vs. Leaf Nodes)**:
   - Relax the requirement for pure leaf nodes (TASK, RESEARCH, ADR, QA) that don't spawn children. Their PR merge is binary completion, thus they do not require Acceptance Criteria checklists.
   - Parent nodes (IDEA, PRD, EPIC, STORY) strictly require Acceptance Criteria checklists (`- [ ]`) to track generated children.
2. **Alternative D (Strict Formatting Enforcement)**:
   - Checkboxes must strictly use the format `- [ ] ` (unchecked) and `- [x] ` (checked).
   - Schema location: `.foundry/docs/schema.md` will be updated to reflect these rules.
   - Child node listing conventions: Child nodes must be listed using the exact format `- [ ] <node_id>` without file extensions or directory paths.
   - Orchestrator parsing rules: The orchestrator must parse these exact formats and transition parent nodes only when all listed children are COMPLETED.
   - Enforce usage of existing tools (like `replace_with_git_merge_diff` or `sed`) via core system memory and `agents.md` prompts.
   - Introduce pre-commit hook or CI check automation to validate formatting.

## Acceptance Criteria
- [ ] task-726-727-orchestrator-parsing
- [ ] task-726-728-ci-check
