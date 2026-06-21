---
id: story-070-108-orchestrator-hierarchical-completion-logic
type: STORY
title: Implement Hierarchical Completion Logic and Markdown Link Extraction
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-10'
updated_at: '2026-06-21'
depends_on: []
jules_session_id: '16270194261313014339'
pr_number: null
parent: epic-045-070-orchestrator-strict-completion
tags:
  - orchestrator
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Hierarchical Completion Logic and Markdown Link Extraction

## Objective
Update `.github/scripts/foundry-orchestrator.ts` to block `VERIFYING` and `COMPLETED` transitions for any node that has children not in the `COMPLETED` state, and ensure children are identified via both the `parent` frontmatter field and markdown body references.

## Requirements
1. **Child Identification via Markdown**:
   - Parse the markdown body of nodes using a regex to extract references to generated `.md` nodes in `.foundry/(ideas|prds|epics|stories|tasks|research)/`.
   - Update `parentToChildren` to include these referenced nodes as children of the node that references them.
   - Introduce a `childToParents` mapping to allow BFS/DFS traversal upwards (since nodes can now have multiple logical parents via markdown references).

2. **Hierarchical Completion Checks**:
   - Update `isDescendant` to use a BFS over the new `childToParents` map instead of just checking `frontmatter.parent`.
   - Update the `Check parent inheritance` block in Phase 4 to use a BFS over `childToParents`.
   - Ensure that `isHierarchicallyIncomplete` correctly considers the extended `parentToChildren` map.

## Acceptance Criteria
- [ ] `foundry-orchestrator.ts` correctly extracts markdown body links and treats them as child relationships.
- [ ] `childToParents` and `parentToChildren` maps are correctly populated.
- [ ] `isDescendant` accurately traverses multiple parents using `childToParents`.
- [ ] Hierarchical completion strictly blocks transition when either explicit or markdown-referenced children are incomplete.

- [ ] .foundry/tasks/task-108-189-hierarchical-completion-impl.md
- [ ] .foundry/tasks/task-108-190-hierarchical-completion-qa.md
