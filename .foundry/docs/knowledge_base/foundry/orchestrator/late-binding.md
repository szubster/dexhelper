# Foundry Late-Binding Engine Architecture

Late-binding in the Foundry DAG allows macro nodes (`IDEA`, `PRD`, `EPIC`, `STORY`) to dynamically spawn child nodes (`STORY`, `TASK`) without causing circular dependency deadlocks.

---

## 1. The Core Problem

If a child node explicitly lists its parent in `depends_on`, or if a parent lists its child in `depends_on`, a circular dependency deadlock is formed:
1. Parent waits for Child to finish (`depends_on: [child]`).
2. Child waits for Parent to be `ACTIVE` or `COMPLETED` (`depends_on: [parent]`).
3. Neither can make progress → DAG Deadlock.

---

## 2. The Native Solution

Late-binding is implemented natively in `.github/scripts/foundry-orchestrator.ts` and `.github/scripts/foundry-heartbeat.ts` through status-based suspension and completion phases, without mutating `depends_on` arrays.

### A. Dynamic Child Linking
When a persona (e.g. `tech_lead` or `story_owner`) processes a macro node:
* The persona appends markdown checkboxes referencing newly generated child nodes directly into the parent's **Acceptance Criteria** section:
  ```markdown
  ## Acceptance Criteria
  - [ ] .foundry/stories/story-001-scaffold.md
  - [ ] task-002-implement-api
  ```
* The child node references its parent via the frontmatter field `parent: <parent_id_or_path>`.

### B. Heartbeat PR Merge Transition (`foundry-heartbeat.ts`)
* When an `ACTIVE` parent node submits a PR that gets merged:
* Heartbeat checks the parent node's markdown body for unchecked criteria (`- [ ]`).
* If unchecked criteria exist and the node is a parent or macro node (`IDEA`, `PRD`, `EPIC`, `STORY`), Heartbeat transitions `ACTIVE` → `PENDING` instead of `COMPLETED`.
* This safely places the parent node into a **Late-Binding Wait State**.

### C. Orchestrator Suspension (`foundry-orchestrator.ts` Phase 3.5)
* If an `ACTIVE`, `VERIFYING`, or `READY` parent node has incomplete children or dependencies, the orchestrator suspends it to `PENDING`.

### D. Child Dispatch Waiver (`foundry-orchestrator.ts` Phase 4)
* Ordinarily, a `PENDING` parent blocks its children.
* **Waiver**: If a `PENDING` parent node has registered children (`children.length > 0`), the orchestrator recognizes that the parent is waiting for child execution, and **does not block the child nodes**.

### E. Late-Binding Completion & Auto-Remediation (`foundry-orchestrator.ts` Phase 4.1)
* Phase 4.1 scans `PENDING` parent nodes whose children have all reached terminal states (`COMPLETED` or `CANCELLED`).
* **Auto-Check Child Checkboxes**: Auto-checks checkboxes in the parent body corresponding to completed or cancelled children (`- [ ]` → `- [x]`).
* **Auto-Remediation**: Auto-checks any remaining unchecked acceptance criteria in the parent node since all child tasks created to fulfill this parent are done.
* **E2E Story Verification for EPICs**: If the parent is an `EPIC`, Phase 4.1 verifies that at least one child `STORY` has an `e2e` or `integration` tag. If missing, the EPIC transitions to `FAILED` with reason `"Merged with unfulfilled acceptance criteria: Missing E2E/integration story"`.
* **Direct Promotion**: Promotes the satisfied parent node directly from `PENDING` → `COMPLETED`.

---

## 3. Handling Cancelled Children

* Permanently `CANCELLED` child nodes behave as completed from the parent's perspective.
* If a child is cancelled due to max rejection threshold or explicit retirement, it does NOT deadlock the parent.
* Phase 4.1 treats `COMPLETED` and `CANCELLED` children equally when evaluating parent completion.

---

## 4. Key Rules for Agents

1. **Never list child nodes in a parent's `depends_on` array.**
2. **Always append generated child references as unchecked checkboxes (`- [ ]`) in the parent's Acceptance Criteria section.**
3. **Child nodes must include `parent: <parent_id>` in YAML frontmatter.**
4. **Do NOT set parent status to `FAILED` when using late binding.** Nodes remain active, append the spawned node reference as an unchecked task (`- [ ] <spawned_node_id>`) in the markdown body, leave frontmatter as `status: ACTIVE` or `READY`, and submit a PR via the `submit` tool. Heartbeat will automatically demote the node to `PENDING` upon PR merge.
5. **Encourage Creative Spawning of Upstream Nodes:** Late binding is not restricted to standard decomposition or `RESEARCH` nodes. Agents are encouraged to spawn upstream/mid-stream nodes (`IDEA`, `ADR`, `PRD`, `EPIC`, `RESEARCH`, `TASK`) based on discoveries.
