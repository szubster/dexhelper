---
id: research-534-517-audit-acceptance-criteria
type: RESEARCH
title: "Audit Acceptance Criteria Usage"
status: READY
owner_persona: "researcher"
created_at: "2026-09-04"
updated_at: "2026-09-04"
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: epic-520-534-acceptance-criteria-research
tags:
  - foundry
  - architecture
  - research
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Research: Audit Acceptance Criteria Usage

## Context & Problem Statement
Currently, Acceptance Criteria in Foundry are implemented as freeform Markdown task checkboxes. This leads to friction, premature verification, and false-positive empty PR merges.

## Research Requirements
- Audit the current usage of Acceptance Criteria across all Foundry node types.
- Analyze failure modes (e.g., premature verification, false-positive empty PR merges, parsing ambiguities).
- Evaluate alternatives for structuring acceptance criteria, such as YAML frontmatter, dedicated markdown sections, or omitting them for certain nodes.

## Acceptance Criteria Audit & Alternatives Report

### 1. Audit of Current Usage
Acceptance Criteria (AC) are deeply embedded across the entire Foundry DAG. Out of approximately 3,181 total nodes (active and archived), ~2,941 contain an `## Acceptance Criteria` section, meaning their usage is nearly ubiquitous across all node types (IDEA, PRD, EPIC, STORY, TASK, RESEARCH, ADR).

However, at any given time, a large portion of these nodes (~1,160) have unchecked boxes (`- [ ]`). While some are validly pending in late-binding parent nodes, many are leaf nodes that were abandoned or failed.

### 2. Analysis of Failure Modes
A direct search reveals over 50 failed tasks in the archive containing the `rejection_reason` string related to "Acceptance Criteria".

**Key Failure Modes:**
*   **The Forgetful Agent (Empty PRs):** As per ADR 009, agents submit Empty PRs when code artifacts already exist. However, agents frequently forget to manually check off the `- [ ]` markdown checkboxes before submitting. The Orchestrator correctly intercepts these and fails them, creating friction and Resurrection Loops.
*   **PR-less Completions:** As per ADR 011, when an agent simply finishes its session without a PR, the Heartbeat script validates the AC. Unchecked boxes in leaf tasks cause the Heartbeat to transition the task to `FAILED`, leading to Resurrection Loops.
*   **Premature Verification:** For parent nodes, unchecked boxes signify waiting for children. If an agent eagerly checks them off before children complete, it breaks the DAG sequencing.
*   **Parsing Ambiguities:** Agents sometimes use non-standard checkbox formats (e.g., `-[]`, `* [ ]`, `- [  ]`), causing the regex `/^\s*-\s*\[\s\]/m` in the orchestrator/heartbeat to either miss them or incorrectly parse them.

### 3. Evaluation of Alternatives

**Alternative A: Move Acceptance Criteria to YAML Frontmatter**
*   **Concept:** Store AC as a YAML string array: `acceptance_criteria: ["Write tests", "Deploy"]`.
*   **Pros:** Extremely easy to parse and validate programmatically. Eliminates regex ambiguity entirely.
*   **Cons:** Loses Markdown's rich text capabilities (links to other nodes, inline code snippets, bolding). Modifying frontmatter is heavily restricted for most agents, increasing the risk of YAML corruption.

**Alternative B: Differentiate Parent vs. Leaf Nodes Architecturally**
*   **Concept:** Leaf nodes (TASK, RESEARCH) do not strictly require AC checklists since their completion is binary (either the PR merges or the research report is written). Parent nodes (IDEA, PRD, EPIC, STORY) strictly require them to track generated children.
*   **Pros:** Vastly reduces friction for leaf tasks.
*   **Cons:** Violates the strict contract introduced in ADR 007 and ADR 009, which intentionally hardened the system to force agents to assert completeness.

**Alternative C: Automate Checkbox Checking on Merge**
*   **Concept:** Modify `foundry-heartbeat.ts` to automatically replace `- [ ]` with `- [x]` when an Empty PR is merged or a PR-less session completes.
*   **Pros:** Eliminates the Resurrection Loop failure mode entirely.
*   **Cons:** Fundamentally breaks the concept of "the agent asserting it did the work." It turns AC into a meaningless hurdle rather than a verification tool.

**Alternative D: Dedicated Section Validation with Strict Markdown Automation**
*   **Concept:** Keep the AC in Markdown, but standardize the section. Enhance the `run_in_bash_session` or agent tools with a specific `check_acceptance_criteria` function, ensuring they don't have to manually format string replacements via `replace_with_git_merge_diff`.
*   **Pros:** Retains rich text. Maintains the strict assertions of ADR 007. Reduces agent formatting errors.
*   **Cons:** Requires updating agent tooling and context prompts.

### Conclusion & Recommendation
The failures stem primarily from agent friction in manually updating text files to change `- [ ]` to `- [x]`, rather than a conceptual flaw in using checkboxes. I recommend **Alternative D**: retaining the current Markdown approach but improving the tooling for agents to check off criteria easily, while perhaps relaxing the requirement for purely exploratory RESEARCH nodes if they do not spawn children.

## Acceptance Criteria
- [x] researcher: Complete the audit of the current usage of Acceptance Criteria across all Foundry node types.
- [x] researcher: Complete the analysis of failure modes.
- [x] researcher: Complete the evaluation of alternatives for structuring acceptance criteria.
