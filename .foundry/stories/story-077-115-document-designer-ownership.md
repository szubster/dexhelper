---
id: story-077-115-document-designer-ownership
type: STORY
title: Update documentation to reflect designer persona ownership
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-11'
updated_at: '2026-06-11'
depends_on:
  - story-077-114-configure-orchestrator-routing
jules_session_id: null
pr_number: null
parent: epic-071-077-tailwind-designer-persona
tags:
  - styling
  - agents
  - documentation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update documentation to reflect designer persona ownership

## Objective
Update `.foundry/docs/schema.md` or `.foundry/docs/knowledge_base/agents/core_policies.md` to formally document this new domain ownership within the multi-agent pipeline.

## Scope
1. Document the `designer` persona's responsibility over `src/index.css` and custom tactical `@utility` primitives in the relevant Foundry system definitions and policies.
2. Ensure it aligns with ADR 024.

## Acceptance Criteria
- [ ] `.foundry/docs/schema.md` or `.foundry/docs/knowledge_base/agents/core_policies.md` is updated.
- [ ] Documentation accurately reflects `designer` ownership of styling per ADR 024.
