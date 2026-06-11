---
id: epic-071-077-tailwind-designer-persona
type: EPIC
title: Implement Tailwind Designer Persona Ownership
status: READY
owner_persona: story_owner
created_at: '2026-06-11'
updated_at: '2026-06-11'
depends_on:
  - task-071-150-tailwind-v4-adr
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

# Epic: Implement Tailwind Designer Persona Ownership

## Objective
Establish the `designer` persona (or extend `palette_agent`) as the official owner and maintainer of the Tailwind and styling ecosystem, as recommended in ADR 024.

## Scope
1. **Persona Prompt/Role Definition**: Update the relevant agent prompts or system configurations to explicitly define the `designer` persona's responsibility for maintaining `src/index.css`, enforcing the tactical hardware aesthetic, and managing custom `@utility` primitives.
2. **Review Workflows**: Configure the Foundry Orchestrator or GitHub Actions (if applicable) to route styling-heavy PRs or tasks that modify `src/index.css` to this persona for review or implementation.
3. **Documentation**: Update `.foundry/docs/schema.md` or `.foundry/docs/knowledge_base/agents/core_policies.md` to formally document this new domain ownership within the multi-agent pipeline.

## Acceptance Criteria
- [ ] Agent prompts/configurations are updated to assign styling ownership to the `designer` persona.
- [ ] Relevant documentation is updated to reflect this new responsibility.

### Child Stories
- [ ] story-077-113-update-designer-persona
- [ ] story-077-114-configure-orchestrator-routing
- [ ] story-077-115-document-designer-ownership
- [x] Break down into Stories
