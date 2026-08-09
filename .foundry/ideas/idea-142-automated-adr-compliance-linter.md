---
id: idea-142-automated-adr-compliance-linter
type: IDEA
title: Automated ADR Compliance Linter
status: PENDING
owner_persona: product_manager
created_at: '2026-08-09'
updated_at: '2026-08-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - orchestrator
  - compliance
  - adr
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Automated ADR Compliance Linter

## Problem
As the system scales and more Architectural Decision Records (ADRs) are introduced (e.g. ADR 008 UI Constraints, ADR 013 Component State), enforcing these guidelines relies heavily on expensive QA LLM tokens. It is inefficient and error-prone to burn context window space having LLMs verify static structural rules like 'use rounded-none' or 'ensure React context is used'.

## Proposed Solution
Create an automated static analysis linter script (e.g. `scripts/verify-adr-compliance.ts`) mapped directly to the `ADR` files in `.foundry/archive/docs/adrs/`. This script would parse the codebase (using tools like `eslint-plugin-local-rules`, `biome`, or AST traversal) to flag concrete violations of ADRs *before* reaching the QA persona.

## Value Proposition
This significantly reduces the LLM context token consumption and offloads static architectural compliance enforcement to faster, deterministic CI checks. This frees up the QA persona to focus exclusively on complex behavioral verification rather than basic linting rules.

## Acceptance Criteria
- [ ] Product Manager: Draft a PRD defining the specific ADRs to be automatically enforced and the AST tooling to be used.
