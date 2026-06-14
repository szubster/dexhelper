---
id: task-108-161-hierarchical-completion-impl
type: TASK
title: Implement Hierarchical Completion and Markdown Link Extraction in Orchestrator
status: ACTIVE
owner_persona: coder
created_at: '2026-06-11'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: '11836272577078114994'
pr_number: null
parent: story-070-108-orchestrator-hierarchical-completion-logic
tags:
  - orchestrator
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Hierarchical Completion and Markdown Link Extraction in Orchestrator

## Objective
Update `.github/scripts/foundry-orchestrator.ts` to block `VERIFYING` and `COMPLETED` transitions for any node that has children not in the `COMPLETED` state, and ensure children are identified via both the `parent` frontmatter field and markdown body references.

## Requirements
1. **Child Identification via Markdown**:
   - In `Phase 3: BUILD MAPS` of `.github/scripts/foundry-orchestrator.ts`, introduce a new `Map` called `childToParents`. `childToParents` maps `string` -> `Set<string>`.
   - While building `parentToChildren`, also populate `childToParents` using the explicitly defined `frontmatter.parent`. Add the referenced node to `childToParents.get(node.repoPath)`.
   - After explicitly processing `frontmatter.parent`, parse `node.body` of every node using the regex `/\.foundry\/(?:ideas|prds|epics|stories|tasks|research)\/[^\s"'`\)]+\.md/g`.
   - For every extracted path match from the body, add the *referencing node* (`node.repoPath`) as a parent of the *matched referenced child node* in `childToParents`, and add the matched referenced child node to the referencing node's `parentToChildren`. Be mindful of using Sets or deduplicating to avoid duplicate entries in `parentToChildren`.

2. **Hierarchical Completion Checks**:
   - Update `isDescendant(childPath, ancestorPath)` to use a Breadth-First Search (BFS) over the `childToParents` map, instead of a simple `while` loop that only checks `frontmatter.parent`.
   - Update the `Check parent inheritance` block in Phase 4. `currParent` logic currently walks up via `frontmatter.parent`. This must be updated to use a BFS queue over `childToParents` to verify if any recursive parent is blocking the node from dispatch.

3. **Incomplete check in `isHierarchicallyIncomplete`**:
   - `isHierarchicallyIncomplete` correctly leverages `parentToChildren` already, but make sure it handles any type changes (e.g. deduplicating arrays).

4. **Reminders to Coder**:
   - Do NOT modify the YAML frontmatter of the task node, except for `status: FAILED` or `status: CANCELLED` and `rejection_reason` if you need to abort.
   - If you submit an empty PR for this completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] `childToParents` map is populated correctly using both explicit `frontmatter.parent` and regex markdown links.
- [x] `parentToChildren` includes children discovered via regex markdown links.
- [x] `isDescendant` handles multi-parent traversal correctly via BFS.
- [x] Phase 4 inheritance check uses BFS over `childToParents` instead of single-parent traversal.
