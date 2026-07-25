---
id: idea-120-conflictless-agent-journals
type: IDEA
title: Research and Implement Conflict-less Agent Journals
status: PENDING
owner_persona: auditor
created_at: '2026-07-20'
updated_at: '2026-07-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - journals
  - workflow
  - DX
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Research and Implement Conflict-less Agent Journals

## Context
Having journals in Foundry is beneficial for capturing insights, decisions, and system constraints across different agent executions. However, the current workflow causes frequent git merge conflicts on `.foundry/journals/*.md` files because multiple parallel or sequential agent runs append entries to the same set of files. These conflicts must be manually resolved in GitHub, slowing down development and disrupting automated pipelines.

Furthermore, many journal entries contain redundant, non-beneficial, or overly verbose notes that do not add value to future executions, cluttering the journals and increasing the probability of conflicts.

## Proposal
Research and implement a solution to streamline agent journaling and eliminate merge conflict overhead.

Potential pathways:
1. **Reduce Journaling Frequency**: Standardize and limit agent journaling requirements. Instruct agents to journal only for critical architectural decisions, long-term context, or notable anomalies, rather than routine session summaries.
2. **Conflict-less Journal Formats**: Move away from monolithic markdown files per persona (e.g., `coder.md`, `qa.md`) and adopt a conflict-less storage pattern. For example, store journal entries as individual timestamped or session-unique markdown files in persona-specific subdirectories (e.g., `.foundry/journals/coder/2026-07-20-session-abc.md`). The dashboard or any log viewer can then dynamically aggregate these files.
3. **Automated GitHub Merge Resolution**: Configure custom git merge drivers or GitHub Actions workflows (such as a custom union merge strategy for journals, or automated conflict-resolution scripts) to automatically resolve concurrent modifications to journal files.

## Value Proposition
This will drastically improve developer experience (DX) and pipeline efficiency by preventing manual merge blockages, keeping journals clean and high-signal, and avoiding zombie sessions caused by unresolved git conflicts.

## Acceptance Criteria
- [x] prd-120-335-conflictless-agent-journals
