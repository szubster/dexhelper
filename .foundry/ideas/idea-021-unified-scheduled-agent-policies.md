---
id: idea-021-unified-scheduled-agent-policies
type: IDEA
title: Unified Scheduled Agent Policies Module
status: CANCELLED
owner_persona: tpm
created_at: '2026-05-14'
updated_at: '2026-05-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - agents
  - meta
research_references: []
rejection_count: 0
rejection_reason: 'Resolved: Validated by human/agent'
notes: >-
  Proposed by Agile Coach to reduce duplication and inconsistencies across agent
  prompts.
---

# Unified Scheduled Agent Policies Module

## Context
Currently, critical system policies (such as the `CRITICAL EXCEPTION TO EMPTY PR POLICY`, Node engine strictness mitigations, and Git hook path resets) are manually copy-pasted across every agent's markdown prompt file in `.github/agents/`. This leads to synchronization issues, as some meta-agents (`tpm`, `architect`, `agile_coach`, and scheduled agents under `.jules/schedules/`) often lag behind or completely miss these critical updates.

## Proposal
Create a unified markdown module or a programmatic injection mechanism for core agent policies. Instead of duplicating the same "Environment Troubleshooting" and "Empty PR Exceptions" blocks in 10+ different files, we should define them once in a shared document (e.g., `.foundry/docs/knowledge_base/agents/core_policies.md`) and instruct agents to include or read it automatically during initialization.

## Impact
- **Consistency:** Ensures all agents operate under the exact same robust rule set.
- **Maintainability:** When a system behavior changes (like the Empty PR policy or environment setup), we only need to update a single file.
- **Reduced Token Usage:** Potentially reduces the boilerplate size of individual prompt files if handled via dynamic inclusion.

## Next Steps
- [ ] Product Manager: Evaluate this idea, determine the best technical approach for dynamic prompt inclusion or instruction, and convert it to a PRD.
