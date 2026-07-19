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
