# Jules Private memorying Policy — Current Session Workflow

To maintain continuity without cross-session memory, specific Jules agents (currently **Canvas** and **Strategist**) use a memory system in `.jules/*.md`.

## Policy

Each individual PR is responsible for its own session's private_memory entry. **Past history is handled by the past**; agents should NOT attempt to back-fill "unrecorded past outcomes" from PR history.

### Workflow

1. **Initial PR**: Must include a new private_memory entry for the current change, labeled as **Accepted**.
2. **On Merge**: The optimistic entry is persisted.
3. **On Rejection**:
   - The agent reverts all code changes.
   - Updates the private_memory entry to **Rejected**.
   - Documents the maintainer's feedback ("Why") and lessons learned ("Pattern").
   - Pushes the private_memory-only result to the same PR for merging.

### Affected Agents

- **Canvas**: High-stakes UI changes.
- **Strategist**: Agent roster & prompt quality.

Other agents (Bolt, Palette, etc.) follow a lighter memory requirement, logging only critical learnings.
