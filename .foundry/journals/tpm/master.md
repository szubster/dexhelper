# TPM Journal

No critical learnings logged yet.

---

---

## Process Change: Late-Binding Hierarchy
A new process change regarding late-binding hierarchical dependencies has been documented.
In the orchestrator, a `PENDING` parent node will not block its children from starting *if* the parent node already has children. This exception to the normal hierarchical completion rule avoids circular dependency deadlocks where a parent waits for children that are waiting for the parent to become active.

---

## 2026-06-23
**Architectural Constraint (Archive File Path Linkage):**
When archiving completed nodes to `.foundry/archive/`, you must update all active files that reference them in inline markdown links to use the new archived path. However, the `depends_on` and `parent` arrays/fields in the YAML frontmatter MUST strictly remain as Node IDs to prevent DAG orchestrator deadlocks.

- Consolidated all the session-unique `.md` journal files across `.foundry/journals/` and `.jules/` into aggregated `master.md` files per persona.

---

# TPM Session Journal
Date: 2026-08-16 00:45:00

---

## Architectural Findings and Rules
- Always identify terminal trees before archiving. A tree is only terminal if all nodes (the parent chain and all children) are in `COMPLETED` or `CANCELLED` states.
- The `depends_on` and `parent` fields in YAML frontmatter must strictly contain node IDs, not file paths.
- It is crucial to preserve the integrity of inline markdown links when files are moved to the archive directory.
- Node types correspond to subdirectories (e.g., RESEARCH goes to `.foundry/research/` and `.foundry/archive/research/`).

---

## Archiving Constraints
- Nodes cannot be archived individually unless their entire hierarchy satisfies terminal conditions. We must archive the entire tree.
- A test node (such as QA or E2E) should be identified and archived if its tree is terminal.
- Node paths in memory often lack file extensions, requiring correct mapping during directory creation and file movement.

---

# TPM Session 2026-08-18-00-46-22
During this session, I resolved several minor DAG orchestrator deadlocks where node paths (e.g. `.foundry/epics/epic-336-349-multi-save-infrastructure.md`) were incorrectly used in the `depends_on` array instead of their pure node IDs (`epic-336-349-multi-save-infrastructure`). This violation of the DAG ID strictness rule prevents the orchestrator from properly resolving dependencies. I updated multiple files in the `.foundry/archive/tasks/`, `.foundry/epics/`, and `.foundry/prds/` directories to use strict node IDs. Future nodes should enforce strict Node IDs without file paths or extensions.

---

# Session YYYY-MM-DD-HH-MM-SS

---

## Execution

<!-- Merged from 2026-08-25-10-00-00.md -->

---

# TPM Session Journal
Date: 2026-09-28 06:50:00

## Architectural Findings and Lessons Learned

### Terminal Tree Verification and Archival Scope
- **Tree Completeness Rule**: Archiving must strictly operate at the whole DAG tree level. A completed node cannot be archived if any descendant or parent in its hierarchy is in an active or incomplete state (e.g., PENDING, READY, ACTIVE, VERIFYING).
- **In-Memory Tree Traversal**: When evaluating terminal state trees, non-archived node files across all subdirectories (`ideas`, `prds`, `epics`, `stories`, `tasks`, `research`) must be traversed from root down to leaf nodes to guarantee 100% terminal state (COMPLETED or CANCELLED) before performing file relocations.
- **Node Linkage Preservation**: Moving node files to `.foundry/archive/` preserves historical reference while keeping active directory context windows slim. Internal `depends_on` and `parent` YAML frontmatter fields strictly remain node IDs without paths to avoid DAG orchestrator circular dependency resolution failures.

---

# TPM Session Journal
Date: 2026-09-30 03:20:00

## Architectural Findings and Lessons Learned

### Terminal Tree Verification and Archival Scope
- **Tree Completeness Rule**: Archiving must strictly operate at the whole DAG tree level. A completed node cannot be archived if any descendant or parent in its hierarchy is in an active or incomplete state (e.g., PENDING, READY, ACTIVE, VERIFYING, BLOCKED, DRAFT).

---

# TPM Session Journal
Date: 2026-10-02 00:00:00

## Architectural Findings and Lessons Learned

### Deadlock Resolution
- Resolved a minor DAG orchestrator deadlock in `.foundry/prds/prd-122-339-pokemon-themed-foundry-personas.md` where `parent` was specified as `.foundry/ideas/idea-122-pokemon-themed-foundry-personas.md` instead of the pure Node ID `idea-122-pokemon-themed-foundry-personas`.

### Terminal Tree Verification and Archival Scope
- Successfully archived the 100% terminal tree rooted at `idea-517-gen2-radio-password-tracker` (3 nodes total):
  - `idea-517-gen2-radio-password-tracker`
  - `prd-517-564-gen2-radio-password-tracker`
  - `research-564-565-buena-password-offsets`
---

# TPM Session Journal
Date: 2026-10-03 03:00:00

## Architectural Findings and Lessons Learned

### Terminal Tree Verification and Archival Scope
- **Tree Completeness Rule**: Archiving must strictly operate at the whole DAG tree level. A completed node cannot be archived if any descendant or parent in its hierarchy is in an active or incomplete state.
- **Node Linkage Preservation**: Moving node files to `.foundry/archive/` preserves historical reference while keeping active directory context windows slim. Inline markdown links targeting relocated files are updated to point to `.foundry/archive/`, while internal `depends_on` and `parent` YAML frontmatter fields strictly remain node IDs without paths to avoid DAG orchestrator circular dependency resolution failures.

---

# TPM Session Journal
Date: 2026-10-04 03:30:00

## Architectural Findings and Lessons Learned

### Terminal Tree Verification and Archival Scope
- **Tree Completeness Rule**: Archiving must strictly operate at the whole DAG tree level. A completed node cannot be archived if any descendant or parent in its hierarchy is in an active or incomplete state.
- **Node Linkage Preservation**: Moving node files to `.foundry/archive/` preserves historical reference while keeping active directory context windows slim.

---

# TPM Session Journal
Date: 2026-10-09 03:46:36

## Architectural Findings and Lessons Learned

### Terminal Tree Verification and Archival Scope
- **Tree Completeness Rule**: Archiving must strictly operate at the whole DAG tree level as defined in `.foundry/docs/knowledge_base/agents/core_policies.md`. A completed node cannot be archived if any descendant or parent in its hierarchy is in an active or incomplete state.
- **Node Linkage Preservation**: Moving node files to `.foundry/archive/` preserves historical reference while keeping active directory context windows slim. Internal `depends_on` and `parent` YAML frontmatter fields strictly remain node IDs without paths to avoid DAG orchestrator circular dependency resolution failures.

---

# TPM Session Journal
Date: 2026-10-09 14:23:19

## Architectural Findings and Lessons Learned

### Terminal Tree Verification and Archival Scope
- **Tree Completeness Rule**: Archiving must strictly operate at the whole DAG tree level as defined in `.foundry/docs/knowledge_base/agents/core_policies.md`. A completed node cannot be archived if any descendant or parent in its hierarchy is in an active or incomplete state.
- **Node Linkage Preservation**: Moving node files to `.foundry/archive/` preserves historical reference while keeping active directory context windows slim. Internal `depends_on` and `parent` YAML frontmatter fields strictly remain node IDs without paths to avoid DAG orchestrator circular dependency resolution failures.

---

# TPM Session Journal
Date: 2026-10-09 16:31:33

## Architectural Findings and Lessons Learned

### Terminal Tree Verification and Archival Scope
- **Tree Completeness Rule**: Archiving must strictly operate at the whole DAG tree level as defined in `.foundry/docs/knowledge_base/agents/core_policies.md`. A completed node cannot be archived if any descendant or parent in its hierarchy is in an active or incomplete state.
- **Node Linkage Preservation**: Moving node files to `.foundry/archive/` preserves historical reference while keeping active directory context windows slim. Internal `depends_on` and `parent` YAML frontmatter fields strictly remain node IDs without paths to avoid DAG orchestrator circular dependency resolution failures.

---

# TPM Session Journal
Date: 2026-10-09 20:45:35

## Architectural Findings and Lessons Learned

### Terminal Tree Verification and Archival Scope
- **Tree Completeness Rule**: Archiving must strictly operate at the whole DAG tree level as defined in `.foundry/docs/knowledge_base/agents/core_policies.md`. A completed node cannot be archived if any descendant or parent in its hierarchy is in an active or incomplete state.
- **Node Linkage Preservation**: Moving node files to `.foundry/archive/` preserves historical reference while keeping active directory context windows slim. Internal `depends_on` and `parent` YAML frontmatter fields strictly remain node IDs without paths to avoid DAG orchestrator circular dependency resolution failures.

---

# TPM Session Journal
Date: 2026-10-09 22:51:00

## Architectural Findings and Lessons Learned

### Terminal Tree Verification and Archival Scope
- **Tree Completeness Rule**: Archiving strictly operates at the whole DAG tree level as defined in `.foundry/docs/knowledge_base/agents/core_policies.md`.
- **Summary of Archived DAG Tree**: Archived the completed 100% terminal tree rooted at `idea-123-improved-savedata-typing` (14 nodes total):
  - `idea-123-improved-savedata-typing` (ideas)
  - `prd-123-122-improved-savedata-typing` (prds)
  - `epic-122-404-refactor-savedata-typing` (epics)
  - `story-404-362-refactor-savedata-type` (stories)
  - `story-404-363-update-parsers` (stories)
  - `story-404-364-savedata-e2e-verification` (stories)
  - `task-362-415-refactor-savedata-type-impl` (tasks)
  - `task-362-416-refactor-savedata-type-qa` (tasks)
  - `task-363-440-update-parsers-impl` (tasks)
  - `task-363-441-update-parsers-qa` (tasks)
  - `task-364-493-savedata-e2e-gen1` (tasks)
  - `task-364-494-savedata-e2e-gen2` (tasks)
  - `task-364-495-savedata-e2e-gen3` (tasks)
  - `task-364-496-savedata-e2e-qa` (tasks)

---

# TPM Session Journal
Date: 2026-10-10 01:50:40

## Architectural Findings and Lessons Learned

### Terminal Tree Verification and Archival Scope
- **Tree Completeness Rule**: Archiving strictly operates at the whole DAG tree level as defined in `.foundry/docs/knowledge_base/agents/core_policies.md`.
- **Summary of Archived DAG Tree**: Archived the completed 100% terminal tree rooted at `idea-145-component-variants-theming-consolidation` (3 nodes total):
  - `idea-145-component-variants-theming-consolidation` (ideas)
  - `research-145-001-component-variant-libraries` (research)
  - `research-145-002-component-theming-mechanisms` (research)

---

# TPM Session Journal
Date: 2026-10-10 03:38:21

## Architectural Findings and Lessons Learned

### Terminal Tree Verification and Archival Scope
- **Tree Completeness Rule**: Archiving strictly operates at the whole DAG tree level as defined in `.foundry/docs/knowledge_base/agents/core_policies.md`. A completed node cannot be archived if any descendant or parent in its hierarchy is in an active or incomplete state (e.g. READY, PENDING, ACTIVE, VERIFYING, BLOCKED, DRAFT).
- **Node Linkage Preservation**: Moving node files to `.foundry/archive/` preserves historical reference while keeping active directory context windows slim. Internal `depends_on` and `parent` YAML frontmatter fields strictly remain node IDs without paths or extensions to avoid DAG orchestrator circular dependency resolution failures.

### Summary of Archived DAG Tree
- Successfully archived the completed 100% terminal tree rooted at `idea-101-pc-box-organization-assistant` (10 nodes total):
  - `idea-101-pc-box-organization-assistant` (ideas)
  - `prd-101-106-pc-box-organization-assistant` (prds)
  - `epic-106-136-pc-box-sorting-algorithms` (epics)
  - `story-136-361-sorting-algorithms-e2e` (stories)
  - `task-361-407-sorting-algorithms-e2e-impl` (tasks)
  - `task-361-408-sorting-algorithms-e2e-qa` (tasks)
  - `task-361-495-sorting-algorithms-e2e-impl-retry` (tasks)
  - `task-361-496-sorting-algorithms-e2e-qa-retry` (tasks)
  - `research-407-468-sorting-ui-implementation` (research)
  - `research-361-494-sorting-algorithms-e2e-root-cause` (research)

---

# TPM Session Journal
Date: 2026-10-11 03:45:00

## Architectural Findings and Lessons Learned

### Terminal Tree Verification and Archival Scope
- **Tree Completeness Rule**: Archiving strictly operates at the whole DAG tree level as defined in `.foundry/docs/knowledge_base/agents/core_policies.md`.
- **Summary of Archived DAG Tree**: Archived the completed 100% terminal tree rooted at `epic-031-036-progression-tracking` (10 nodes total):
  - `epic-031-036-progression-tracking` (epics)
  - `story-036-257-concurrent-game-management` (stories)
  - `task-257-379-progression-timeline-ui-retry-qa` (tasks)
  - `task-257-378-progression-timeline-ui-retry-impl` (tasks)
  - `task-257-374-progression-timeline-ui-qa` (tasks)
  - `research-257-377-investigate-progression-timeline-failure` (research)
  - `story-036-490-progression-e2e-verification` (stories)
  - `task-490-525-progression-switcher-e2e-impl` (tasks)
  - `task-490-524-progression-sync-e2e-impl` (tasks)
  - `task-490-526-progression-e2e-qa` (tasks)
