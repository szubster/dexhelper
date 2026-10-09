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

### Summary of Archived DAG Tree
- Successfully archived the completed terminal tree rooted at `idea-118-centralize-prompt-reminders-complete` (9 nodes total):
  - `idea-118-centralize-prompt-reminders-complete`
  - `prd-118-517-centralize-prompt-reminders-cleanup`
  - `epic-517-521-centralize-prompt-reminders-cleanup`
  - `story-521-520-prompt-cleanup-tasks`
  - `task-520-549-coder-prompt-cleanup-coder`
  - `task-520-550-qa-prompt-cleanup-qa`
  - `story-521-521-integration-e2e`
  - `task-521-578-integration-e2e-coder`
  - `task-521-579-integration-e2e-qa`

---

# TPM Session Journal
Date: 2026-09-30 03:20:00

## Architectural Findings and Lessons Learned

### Terminal Tree Verification and Archival Scope
- **Tree Completeness Rule**: Archiving must strictly operate at the whole DAG tree level. A completed node cannot be archived if any descendant or parent in its hierarchy is in an active or incomplete state (e.g., PENDING, READY, ACTIVE, VERIFYING, BLOCKED, DRAFT).

### Summary of Archived DAG Tree
- Successfully archived the completed terminal tree rooted at `idea-120-conflictless-agent-journals` (14 nodes total):
  - `idea-120-conflictless-agent-journals`
  - `prd-120-335-conflictless-agent-journals`
  - `epic-335-401-implement-conflictless-journals-retry`
  - `story-401-408-persona-specific-journal-directories`
  - `task-408-430-implement-persona-specific-journals-impl`
  - `task-408-431-implement-persona-specific-journals-qa`
  - `story-401-409-tpm-journal-aggregation`
  - `task-409-493-tpm-journal-aggregation-script-impl`
  - `task-409-494-tpm-journal-aggregation-script-tests`
  - `task-409-495-tpm-journal-aggregation-qa`
  - `story-401-410-update-downstream-journal-scripts`
  - `task-410-493-update-journal-paths-impl`
  - `task-410-494-update-journal-paths-qa`
  - `story-401-411-conflictless-journals-e2e-verification`


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

### Summary of Archived DAG Tree
- Successfully archived the completed 100% terminal tree rooted at `idea-096-macro-node-boundary-enforcement` (9 nodes total):
  - `idea-096-macro-node-boundary-enforcement`
  - `prd-096-057-macro-node-boundary-enforcement`
  - `epic-057-129-schema-documentation-updates`
  - `story-129-420-update-schema-e2e-rule`
  - `story-129-421-verify-schema-documentation-e2e`
  - `task-420-422-schema-e2e-rule`
  - `task-421-496-verify-schema-documentation-script-coder`
  - `task-421-497-verify-schema-documentation-ci-coder`
  - `task-421-498-verify-schema-documentation-qa`

---

# TPM Session Journal
Date: 2026-10-04 03:30:00

## Architectural Findings and Lessons Learned

### Terminal Tree Verification and Archival Scope
- **Tree Completeness Rule**: Archiving must strictly operate at the whole DAG tree level. A completed node cannot be archived if any descendant or parent in its hierarchy is in an active or incomplete state.
- **Node Linkage Preservation**: Moving node files to `.foundry/archive/` preserves historical reference while keeping active directory context windows slim.

### Summary of Archived DAG Tree
- Successfully archived the completed 100% terminal tree rooted at `idea-085-lift-rejection-count-state` (10 nodes total):
  - `idea-085-lift-rejection-count-state`
  - `prd-085-107-lift-rejection-count-state`
  - `epic-107-344-update-dashboard-rejection-count`
  - `story-344-494-dashboard-rejection-count`
  - `story-344-495-dashboard-rejection-count-e2e`
  - `task-494-512-refactor-dashboard-ui`
  - `task-494-513-refactor-dashboard-tests`
  - `task-494-514-qa-verify-dashboard`
  - `task-495-528-dashboard-rejection-count-e2e`
  - `task-495-529-qa-dashboard-rejection-count-e2e`


---

# TPM Session Journal
Date: 2026-10-09 03:46:36

## Architectural Findings and Lessons Learned

### Terminal Tree Verification and Archival Scope
- **Tree Completeness Rule**: Archiving must strictly operate at the whole DAG tree level as defined in `.foundry/docs/knowledge_base/agents/core_policies.md`. A completed node cannot be archived if any descendant or parent in its hierarchy is in an active or incomplete state.
- **Node Linkage Preservation**: Moving node files to `.foundry/archive/` preserves historical reference while keeping active directory context windows slim. Internal `depends_on` and `parent` YAML frontmatter fields strictly remain node IDs without paths to avoid DAG orchestrator circular dependency resolution failures.

### Summary of Archived DAG Tree
- Successfully archived the completed 100% terminal tree rooted at `idea-097-schema-verifying-state-fix` (11 nodes total):
  - `idea-097-schema-verifying-state-fix`
  - `prd-097-096-schema-verifying-state-fix`
  - `epic-097-130-schema-verifying-state-update`
  - `story-130-512-schema-verifying-state-update`
  - `story-130-513-schema-verifying-state-update-e2e`
  - `task-512-526-schema-verifying-state-update`
  - `task-512-527-schema-verifying-state-update-qa`
  - `task-513-549-schema-verifying-positive-checks-impl`
  - `task-513-550-schema-verifying-negative-checks-impl`
  - `task-513-551-schema-verifying-tests-impl`
  - `task-513-552-schema-verifying-e2e-qa`

---

# TPM Session Journal
Date: 2026-10-09 14:23:19

## Architectural Findings and Lessons Learned

### Terminal Tree Verification and Archival Scope
- **Tree Completeness Rule**: Archiving must strictly operate at the whole DAG tree level as defined in `.foundry/docs/knowledge_base/agents/core_policies.md`. A completed node cannot be archived if any descendant or parent in its hierarchy is in an active or incomplete state.
- **Node Linkage Preservation**: Moving node files to `.foundry/archive/` preserves historical reference while keeping active directory context windows slim. Internal `depends_on` and `parent` YAML frontmatter fields strictly remain node IDs without paths to avoid DAG orchestrator circular dependency resolution failures.

### Summary of Archived DAG Tree
- Successfully archived the completed 100% terminal tree rooted at `epic-117-335-integrate-zod-orchestrator` (11 nodes total):
  - `epic-117-335-integrate-zod-orchestrator`
  - `story-335-412-integrate-zod-schema`
  - `story-335-413-zod-validation-error-handling`
  - `story-335-414-zod-orchestrator-e2e`
  - `task-412-418-refactor-orchestrator-zod-impl`
  - `task-412-419-refactor-orchestrator-zod-qa`
  - `task-413-440-zod-error-orchestrator-impl`
  - `task-413-441-zod-error-orchestrator-qa`
  - `task-414-493-zod-orchestrator-fixtures`
  - `task-414-494-zod-orchestrator-e2e-impl`
  - `task-414-495-zod-orchestrator-e2e-qa`

---

# TPM Session Journal
Date: 2026-10-09 16:31:33

## Architectural Findings and Lessons Learned

### Terminal Tree Verification and Archival Scope
- **Tree Completeness Rule**: Archiving must strictly operate at the whole DAG tree level as defined in `.foundry/docs/knowledge_base/agents/core_policies.md`. A completed node cannot be archived if any descendant or parent in its hierarchy is in an active or incomplete state.
- **Node Linkage Preservation**: Moving node files to `.foundry/archive/` preserves historical reference while keeping active directory context windows slim. Internal `depends_on` and `parent` YAML frontmatter fields strictly remain node IDs without paths to avoid DAG orchestrator circular dependency resolution failures.

### Summary of Archived DAG Tree
- Successfully archived the completed 100% terminal tree rooted at `idea-124-librarian-persona-context-optimizer` (23 nodes total):
  - `idea-124-librarian-persona-context-optimizer`
  - `prd-124-339-librarian-persona-context-optimizer`
  - `epic-339-409-librarian-schema-updates`
  - `epic-339-410-librarian-github-scripts-implementation`
  - `story-409-412-add-librarian-persona-schema`
  - `story-409-413-librarian-schema-e2e`
  - `story-410-512-librarian-ingestion-synthesis-script`
  - `story-410-513-librarian-doc-update-script`
  - `story-410-514-librarian-garbage-collection-script`
  - `story-410-515-librarian-scripts-integration-e2e`
  - `task-412-422-implement-librarian-persona-schema`
  - `task-412-423-qa-librarian-persona-schema`
  - `task-413-440-verify-librarian-schema-e2e`
  - `task-512-517-librarian-ingestion-script`
  - `task-512-518-librarian-synthesis-script`
  - `task-512-519-librarian-scripts-qa`
  - `task-513-521-implement-librarian-doc-update-script`
  - `task-513-522-qa-librarian-doc-update-script`
  - `task-514-521-librarian-gc-script-impl`
  - `task-514-522-librarian-gc-script-tests`
  - `task-514-523-librarian-gc-script-qa`
  - `task-515-568-librarian-e2e-tests`
  - `task-515-569-librarian-e2e-qa`

---

# TPM Session Journal
Date: 2026-10-09 20:45:35

## Architectural Findings and Lessons Learned

### Terminal Tree Verification and Archival Scope
- **Tree Completeness Rule**: Archiving must strictly operate at the whole DAG tree level as defined in `.foundry/docs/knowledge_base/agents/core_policies.md`. A completed node cannot be archived if any descendant or parent in its hierarchy is in an active or incomplete state.
- **Node Linkage Preservation**: Moving node files to `.foundry/archive/` preserves historical reference while keeping active directory context windows slim. Internal `depends_on` and `parent` YAML frontmatter fields strictly remain node IDs without paths to avoid DAG orchestrator circular dependency resolution failures.

### Summary of Archived DAG Tree
- Successfully archived the completed 100% terminal tree rooted at `idea-082-gen3-secret-id-shiny-rng` (17 active nodes total):
  - `idea-082-gen3-secret-id-shiny-rng`
  - `prd-082-099-gen3-trainer-data-extraction`
  - `prd-082-100-rng-calculator-integration`
  - `epic-099-346-gen3-trainer-data-extraction`
  - `epic-100-130-rng-tid-sid-display`
  - `epic-100-131-rng-explainer-section`
  - `story-346-357-gen3-trainer-data-e2e`
  - `story-130-349-rng-tid-sid-e2e`
  - `story-131-526-rng-explainer-ui-component`
  - `story-131-527-rng-explainer-e2e-verification`
  - `task-357-399-gen3-trainer-data-e2e-impl`
  - `task-357-400-gen3-trainer-data-e2e-qa`
  - `task-349-380-rng-tid-sid-e2e-impl`
  - `task-349-381-rng-tid-sid-e2e-qa`
  - `task-526-564-rng-explainer-ui-impl`
  - `task-527-578-rng-explainer-e2e-coder`
  - `task-527-579-rng-explainer-e2e-qa`