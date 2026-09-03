# Dynamic Node Spawning Guidelines

## Core Principles

Dynamic node spawning enables the Foundry to adapt its project roadmap without requiring upfront perfection from Product Managers or Planners. When an agent (like a Coder, Tech Lead, or QA) encounters a problem that exceeds their current context, discovers an architectural dilemma, or identifies technical debt, they should "late-bind" new work items into the DAG rather than failing their task.

By spawning downstream nodes (like `RESEARCH`, `ADR`, or `IDEA` nodes) and linking them to their current task, the system can continuously self-improve and solve missing context asynchronously.

## When to Spawn Nodes

1. **Missing Critical Context:** You encounter a hard requirement (e.g., a memory offset, formula, or API spec) that is missing from `.foundry/docs/` and cannot be derived. Spawn a `RESEARCH` node.
2. **Architectural Ambiguity:** You discover two conflicting patterns or an ambiguous system design choice. Spawn an `ADR` node to have the Architect resolve it.
3. **Feature Opportunity:** You realize a small feature would drastically improve the user experience or codebase health, but it's out of scope for your current task. Spawn an `IDEA` node.
4. **Refactoring Required:** You find significant technical debt that blocks your progress but is too large for the current task. Spawn a `TASK` or `STORY` to address it.

## How to Spawn Nodes (Late-Binding)

Do not alter the `depends_on` array to link spawned nodes, as this causes circular dependencies. Instead, follow the Late-Binding protocol:

1. **Create the Node:** Create a new markdown file in the appropriate `.foundry/` directory (`tasks/`, `adrs/`, `ideas/`, `research/`).
2. **Set Frontmatter Correctly:**
   - Follow the naming schema: `<type>-<parent_NNN>-<NNN>-<slug>`. Determine `<NNN>` by listing the directory contents and incrementing the highest sequence number. Determine `<parent_NNN>` from the parent's sequence number.
   - Set `status: PENDING`.
   - Set `parent: <current_node_id>` (Your current task).
   - Set `owner_persona: <appropriate_persona>` (e.g., `researcher` for RESEARCH, `architect` for ADR, `product_manager` for IDEA).
3. **Link to Parent (Your Task):**
   - In your *current* task's Markdown body (not the frontmatter), append the newly spawned node ID as an unchecked checkbox (`- [ ] <spawned_node_id>`) in the `## Acceptance Criteria` section. If this section doesn't exist, create it.
4. **Submit an Empty PR:**
   - Do NOT set your task's status to `FAILED`.
   - Leave your task's frontmatter as `status: ACTIVE` (or `READY`).
   - Leave the appended checkbox unchecked (`- [ ]`).
   - Use the `submit` tool to open a Pull Request.
   - **Result:** The Orchestrator's heartbeat will detect the unchecked checkbox upon PR merge and automatically demote your task to `PENDING` (Wait State) until the spawned node completes.

## Examples

### Example 1: Spawning a RESEARCH Node for Missing Offsets

**Scenario:** A Coder is implementing a save file parser but cannot find the Gen 3 Secret Base memory offsets.

**Action:**
1. Determine the next sequence number for a RESEARCH node (e.g., `042`).
2. Create `.foundry/research/research-123-042-find-secret-base-offsets.md`.
3. Set frontmatter:
   ```yaml
   ---
   id: research-123-042-find-secret-base-offsets
   type: RESEARCH
   title: Find Gen 3 Secret Base memory offsets
   status: PENDING
   owner_persona: researcher
   parent: task-045-123-implement-secret-base-parser
   ...
   ---
   ```
4. Append to current task's (`task-045-123-implement-secret-base-parser`) markdown body:
   ```markdown
   ## Acceptance Criteria
   - [ ] research-123-042-find-secret-base-offsets
   ```
5. Submit an Empty PR.

### Example 2: Spawning an ADR for an Architectural Decision

**Scenario:** A Tech Lead discovers that a new UI feature conflicts with ADR-008 (Tactical Aesthetics).

**Action:**
1. Create `.foundry/adrs/adr-045-019-ui-aesthetic-conflict.md`.
2. Set frontmatter:
   ```yaml
   ---
   id: adr-045-019-ui-aesthetic-conflict
   type: ADR
   title: Resolve UI Aesthetic Conflict for new feature
   status: PENDING
   owner_persona: architect
   parent: task-030-045-implement-new-ui-feature
   ...
   ---
   ```
3. Append to current task's markdown body:
   ```markdown
   ## Acceptance Criteria
   - [ ] adr-045-019-ui-aesthetic-conflict
   ```
4. Submit an Empty PR.
