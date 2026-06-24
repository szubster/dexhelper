---
id: task-108-162-hierarchical-completion-qa
type: TASK
title: QA Hierarchical Completion and Markdown Link Extraction in Orchestrator
status: COMPLETED
owner_persona: qa
created_at: '2026-06-11'
updated_at: '2026-06-15'
depends_on: []jules_session_id: null
pr_number: null
parent: story-070-108-orchestrator-hierarchical-completion-logic
tags:
  - orchestrator
  - architecture
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Hierarchical Completion and Markdown Link Extraction in Orchestrator

## Objective
Verify that the `foundry-orchestrator.ts` correctly blocks node transitions when explicit or markdown-referenced children are incomplete.

## Requirements
1. **Verify Child Identification**:
   - Verify that `childToParents` and `parentToChildren` maps are correctly populated.
   - Verify that markdown links matching `/\.foundry\/(?:ideas|prds|epics|stories|tasks|research)\/[^\s"'`\)]+\.md/g` are correctly identified as child relationships.
2. **Verify Multi-Parent Traversal**:
   - Verify that `isDescendant` handles multi-parent traversal correctly via BFS over `childToParents`.
   - Verify that the Phase 4 inheritance check uses BFS over `childToParents`.
3. **Run Tests**:
   - Run unit tests to verify the behavior works as expected. Check `.github/scripts/foundry-orchestrator.test.ts` or add a specific test if none exists for this new markdown parsing.
4. **Reminders to QA**:
   - Do NOT modify the YAML frontmatter of the task node, except for `status: FAILED` or `status: CANCELLED` and `rejection_reason` if you need to abort.
   - If you submit an empty PR for this completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] `foundry-orchestrator.ts` parses markdown links and adds them to `parentToChildren` and `childToParents`.
- [x] Multiple parents are correctly traversed.
- [x] Tests pass verifying hierarchical completion blocks `VERIFYING` or `COMPLETED` when any explicit or markdown child is not `COMPLETED`.
