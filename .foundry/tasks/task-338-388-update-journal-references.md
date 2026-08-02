---
id: task-338-388-update-journal-references
type: TASK
title: Update Journal References in Agent Prompts and Docs
status: READY
owner_persona: coder
created_at: '2026-08-02'
updated_at: '2026-08-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-338-338-update-downstream-references
tags:
  - foundry
  - journals
  - workflow
  - DX
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Update Journal References in Agent Prompts and Docs

## Context
Various nodes, scripts, and personas (like the Agile Coach or resurrected FAILED nodes) currently reference monolithic journal files (e.g., `.foundry/journals/coder.md`). With the transition to session-unique and TPM-aggregated journals, these references must be updated.

## Requirements
- Identify all scripts, documents, and agent prompts that reference old journal paths.
- Search for `.foundry/journals/` and `.jules/` and ensure they point to directory globs (e.g., `.foundry/journals/coder/*.md`) when referring to past journals.
- Check `.github/agents/*.md`, `.foundry/docs/knowledge_base/agents/core_policies.md`, and any orchestration scripts.
- Update them to either reference the new directory structure, the TPM's aggregated master logs, or instruct them to read fragmented files dynamically.

## Acceptance Criteria
- [ ] Coder: Update all monolithic journal references (e.g. `.foundry/journals/coder.md`) to the new session-unique glob structure (`.foundry/journals/coder/*.md`) across agent prompts and documentation.
- [ ] Coder: Self-verify that no hardcoded paths to monolithic `.md` journal files exist (using `grep`).
