---
id: epic-071-126-tailwind-designer-persona-v2
type: EPIC
title: Implement Tailwind Designer Persona Ownership V2
status: READY
owner_persona: story_owner
created_at: '2026-07-03'
updated_at: '2026-10-18'
depends_on:
  - epic-071-125-migrate-complex-app-components-v2
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
locks: []
priority: 100
---

# Epic: Implement Tailwind Designer Persona Ownership V2

## Objective
Enhance the existing scheduled `palette` persona to maintain `src/index.css`, enforce the tactical hardware aesthetic, and manage custom `@utility` primitives, fulfilling the intent of ADR 024.

## Scope
1. **Persona Prompt/Role Definition**: Update the relevant agent prompts or system configurations to explicitly define the `palette` persona's responsibility for maintaining `src/index.css`, enforcing the tactical hardware aesthetic, and managing custom `@utility` primitives.
2. **Documentation**: Update `.foundry/docs/schema.md` or `.foundry/docs/knowledge_base/agents/core_policies.md` to formally document this new domain ownership within the multi-agent pipeline.

## Acceptance Criteria
- [ ] story-126-707-update-palette-persona-instructions
- [ ] story-126-708-update-palette-documentation
- [ ] story-126-709-palette-persona-e2e-verification
- [ ] Agent prompts/configurations are updated to assign styling ownership to the `palette` persona.
- [ ] Relevant documentation is updated to reflect this new responsibility.
