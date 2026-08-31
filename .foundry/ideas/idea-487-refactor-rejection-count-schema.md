---
id: idea-487-refactor-rejection-count-schema
type: IDEA
title: Refactor IDEA Node Schema to Disallow Rejection Count and Reason
status: PENDING
owner_persona: product_manager
created_at: '2026-08-31'
updated_at: '2026-08-31'
depends_on: []
jules_session_id: '1270286429906620454'
pr_number: null
parent: null
tags: []
research_references: []
---

# Idea: Refactor IDEA Node Schema to Disallow Rejection Count and Reason

## Context
Currently, the `core_policies.md` explicitly instructs agents generating IDEA nodes to NOT include `rejection_count` or `rejection_reason` in the YAML frontmatter. Also `bolt.md` specifically had rules around this before being refactored. The overarching schema parser doesn't actively reject IDEA nodes with these fields, leading to prompt complexity when agents must explicitly be told not to include them.

## Proposal
Update the central `schema.ts` for Foundry orchestrator to use Zod to explicitly forbid (`.strict()` or custom refinements) `rejection_count` and `rejection_reason` in the YAML frontmatter for nodes where `type === 'IDEA'`.
Remove the explicit prohibition instructions from agent prompts or core policies to reduce prompt bloat once the schema itself enforces it.

## Value Proposition
- Reduces prompt bloat for all generative personas (Product Manager, Bolt, Visionary) by centralizing the constraint in code rather than prompts.
- Ensures absolute compliance via the automated orchestrator validation.
- Cleans up YAML frontmatter across the repository.

## Next Steps
- [ ] prd-487-refactor-rejection-count-schema
