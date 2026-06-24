---
id: epic-071-100-tailwind-designer-persona-retry
type: EPIC
title: Implement Tailwind Designer Persona Ownership Retry
status: PENDING
owner_persona: story_owner
created_at: '2026-06-24'
updated_at: '2026-06-24'
depends_on:
  - task-071-150-tailwind-v4-adr
  - research-071-217-investigate-session-id-failure
jules_session_id: null
pr_number: null
parent: prd-071-040-tailwind-v4-utilities-migration
tags:
  - styling
  - agents
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Implement Tailwind Designer Persona Ownership Retry

## Objective
Enhance the existing scheduled `palette` persona to maintain `src/index.css`, enforce the tactical hardware aesthetic, and manage custom `@utility` primitives, fulfilling the intent of ADR 024.

## Scope
1. **Persona Prompt/Role Definition**: Update the relevant agent prompts or system configurations to explicitly define the `palette` persona's responsibility for maintaining `src/index.css`, enforcing the tactical hardware aesthetic, and managing custom `@utility` primitives.
2. **Documentation**: Update `.foundry/docs/schema.md` or `.foundry/docs/knowledge_base/agents/core_policies.md` to formally document this new domain ownership within the multi-agent pipeline.

## Acceptance Criteria
- [ ] Agent prompts/configurations are updated to assign styling ownership to the `palette` persona.
- [ ] Relevant documentation is updated to reflect this new responsibility.