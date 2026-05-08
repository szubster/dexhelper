---
id: idea-019-orchestrator-test-factories
type: IDEA
title: Standardized Orchestrator Test Factories
status: READY
owner_persona: product_manager
created_at: '2026-05-07'
updated_at: '2026-05-08'
depends_on: []
jules_session_id: null
pr_number: null
---

# Standardized Orchestrator Test Factories

## Context
When implementing strict validation rules in the DAG Orchestrator (such as Phase 4.8 Mapping Validation), existing test fixtures in `.github/scripts/foundry-orchestrator.test.ts` frequently break because they were written with invalid or nonsensical frontmatter (e.g., an `IDEA` node owned by a `coder`). This causes cascading CI failures and repetitive PR rejections for tasks that are otherwise implemented correctly.

## Proposal
Implement a standardized test node factory utility (e.g., `createValidNode(overrides)`) in the test suite. This utility should automatically populate valid frontmatter defaults (like the correct `owner_persona` based on `type`) so tests remain robust and focus only on the specific behavior being tested, rather than failing due to unrelated strict schema evolutions.


## Child Nodes
- .foundry/prds/prd-019-019-orchestrator-test-factories.md

## Child Nodes
- [PRD] .foundry/prds/prd-019-019-orchestrator-test-factories.md

## Child Nodes
- [PRD] .foundry/prds/prd-019-019-orchestrator-test-factories.md
