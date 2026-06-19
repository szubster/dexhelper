---
id: idea-085-enforce-qa-task-pairing
type: IDEA
title: Enforce QA Task Pairing
status: PENDING
owner_persona: product_manager
created_at: '2026-06-19'
updated_at: '2026-06-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - architecture
  - tooling
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Enforce QA Task Pairing

## Context
During the audit of `epic-071-074-define-tailwind-v4-utilities`, it was discovered that `story-074-114-define-tactical-button-and-focus` lacked a corresponding QA verification task (`task-114-166-qa-tactical-button-focus` was completely missing). This meant the implementation task bypassed the crucial isolated testing phase intended for the QA persona, placing the entire burden of verification onto the Auditor.

## Proposal
Implement an automated rule, gray-matter linter check, or architectural constraint (e.g. within `foundry-orchestrator.ts` or as a Git hook) that ensures every `TASK` node assigned to a `coder` is reliably paired with a subsequent `TASK` node assigned to `qa` before the parent story can be considered structurally valid or complete.

## Acceptance Criteria
- [ ] Investigate mechanisms to enforce QA task pairing for all implementation tasks.
- [ ] Implement a validation rule or linter check to prevent missing QA tasks in the DAG.
