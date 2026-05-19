# Agent Failure Reporting

## Decision
Agents (Coder/QA) are allowed to modify the YAML frontmatter of Foundry nodes specifically to mark them as `FAILED` and provide a `rejection_reason`.

## Context
Previously, a strict rule forbade agents from touching the frontmatter at all. This led to agents documenting failures only in the markdown body, which the Foundry Engine could not automatically parse. By allowing agents to set `status: FAILED`, we enable the "Resurrection Loop" (resetting to `READY`) and "Impossible Loop" (waking up the parent node) logic.

## Rules
- Agents MUST NOT set `status: COMPLETED` or `status: DONE`.
- Agents MUST provide a `rejection_reason` when setting `status: FAILED`.
- Other metadata fields (id, type, owner_persona, etc.) remain strictly read-only for agents.

## Implementation
- Updated `.foundry/docs/schema.md` (Invariant 6).
- Updated prompt in `.github/workflows/foundry-engine.yml`.
