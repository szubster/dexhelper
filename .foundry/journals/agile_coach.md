## 2026-07-03: Clarification of Agile Coach Role Constraints
When executing as the Agile Coach persona, the meta-agent must focus entirely on system-wide processes, workflows, node generation (IDEA/TASK/RESEARCH), and persona prompt refinements based on historical analysis and rejections. The Agile Coach MUST NOT hijack or implement pending or active downstream implementation tasks assigned to other personas (e.g., Coder or QA tasks). Instead of fixing a specific task file (like checking off a box in a Coder's markdown file), the Agile Coach should analyze *why* the failure occurred and create new nodes or modify prompt files to prevent the failure class in the future.

## 2026-07-03: Clarification of Agile Coach Role Constraints
When executing as the Agile Coach persona, the meta-agent must focus entirely on system-wide processes, workflows, node generation (IDEA/TASK/RESEARCH), and persona prompt refinements based on historical analysis and rejections. The Agile Coach MUST NOT hijack or implement pending or active downstream implementation tasks assigned to other personas (e.g., Coder or QA tasks). Instead of fixing a specific task file (like checking off a box in a Coder's markdown file), the Agile Coach should analyze *why* the failure occurred and create new nodes or modify prompt files to prevent the failure class in the future.

## 2026-07-04: Handling Orphaned Requirements from Max Rejections
When a requirement fails permanently at the `TASK` level without a parent node actively managing it, the Agile Coach should spawn new `IDEA` or replacement `TASK` nodes to ensure the requirement is fulfilled.

## 2026-07-06: Consolidated Prompt Directives
Recognized significant redundancy across all agent personas regarding common directives such as node creation guidelines, contextual exploration rules, and abort/rejection handling loops. These duplicated instructions were leading to context bloat and potential inconsistencies.
I have extracted these common directives and appended them directly to `.foundry/docs/knowledge_base/agents/core_policies.md`. The core policies prompt pointer in each persona was modified to instruct the agents to explicitly look for these new rules. I then removed the duplicated blocks from all `.github/agents/*.md` files. This optimization significantly reduces prompt size while enforcing uniform operational standards system-wide.

## 2026-07-17: Consolidated Task Reminders
Identified redundancy where the Tech Lead was instructed to copy-paste failure handling and Empty PR checkbox reminders into every single TASK node's markdown body. This causes unnecessary bloat.
I have removed this directive from `tech_lead.md` and created an IDEA node (`idea-118-centralize-prompt-reminders`) to track this process improvement. The core policies (`core_policies.md`) already cover these rules comprehensively.

## 2026-07-19: Centralize Task Prompt Reminders
Removed redundant `### REMINDER FOR CODER` and `### REMINDER FOR QA` blocks from `coder.md` and `qa.md` persona files. Cleaned up existing tasks to remove duplicate reminder sections. This centralizes instructions around Empty PRs and failure statuses in `core_policies.md` as outlined in `idea-118-centralize-prompt-reminders.md` to prevent prompt rot.
## 2026-07-18: Centralized Reminders and Cycle Detection
- Removed redundant `### REMINDER FOR QA` and `### REMINDER FOR CODER` blocks from the `qa` and `coder` persona prompts, as well as an existing task (`task-299-323-extend-phase-3-6-qa`), satisfying `idea-118-centralize-prompt-reminders`. These rules should rely on core_policies.md instead to reduce duplication and token usage.
- Implemented circular dependency detection in the Foundry Orchestrator (`foundry-orchestrator.ts`) during Phase 3.9 using a DFS-based cycle detection algorithm. `PENDING` nodes involved in a cycle will now be safely transitioned to `FAILED` with `rejection_reason = "Circular dependency detected"`, satisfying `idea-118-orchestrator-circular-dependency-detection` and preventing DAG deadlocks.
## 2026-07-23: Removal of Orphaned QA Task Cancellation Rule
The Agile Coach identified friction caused by the obsolete Orphaned QA Task Cancellation Rule in core_policies.md. The orchestrator's Phase 3.6 cascade cancellation logic now automatically cancels PENDING nodes that depend on permanently failed nodes, making the manual markdown body updates redundant and conflict-prone. This rule has been removed from core_policies.md to streamline the agent workflow.

## 2026-07-24: Created IDEA to remove redundant failure handling from coder and qa prompts
I noticed that while the Tech Lead was no longer appending failure handling instructions to Tasks, the Coder and QA prompts still contained these rules despite them existing in `core_policies.md`. I created `idea-118-centralize-prompt-reminders-complete.md` to address this redundancy.
