# The Foundry — Master Schema & System Rules

> **Authority:** This document is the single source of truth for all Foundry agents and automation scripts.
> **Owner:** `tech_lead` — any structural change to this document requires a PR authored by the Tech Lead persona.
> **Last Updated:** 2026-04-20

---

## 1. System Overview

The Foundry is an autonomous software factory layered on this repository. The **repository itself is the database**: every concept in the product lifecycle — from a raw CEO thought through to a shipped task — lives as a markdown file with YAML frontmatter under the `.foundry/` directory at the repository root.

The workflow is a directed acyclic graph (DAG):

```
IDEA → PRD → EPIC → STORY → TASK
```

A custom orchestrator (`.github/scripts/foundry-orchestrator.ts`) parses the `depends_on` field across all files to find nodes with an **in-degree of zero** (all dependencies satisfied). These unblocked nodes are dispatched in parallel to Jules agent sessions via a GitHub Actions matrix. All PR transitions require explicit **CEO approval** — automerge is disabled.

---

## 2. Directory Conventions

| Directory | Node Type | Owning Persona | Description |
|---|---|---|---|
| `.foundry/ideas/` | `IDEA` | `product_manager` | Raw CEO thoughts, intake queue. |
| `.foundry/prds/` | `PRD` | `product_manager` | Structured Product Requirements Documents. |
| `.foundry/epics/` | `EPIC` | `epic_planner` | Macroscopic functional chunks derived from PRDs. |
| `.foundry/stories/` | `STORY` | `story_owner` | Incremental, sequentially-planned delivery steps. Stories are late-binding: Story N+1 is only written after Story N completes so lessons are incorporated. |
| `.foundry/tasks/` | `TASK` | `coder` | Concrete engineering blueprints. The Tech Lead or Architect writes them; the Coder implements; QA validates. |
| `.foundry/journals/` | — | `tpm` | Persistent agent learning logs. Each persona decides its own structure (single file, subdirectory, multiple files by domain, etc.). The `tpm` is responsible for archiving stale journal content. |
| `.foundry/docs/adrs/` | ADR | `tech_lead` | Architecture Decision Records. The Tech Lead reads these before writing any Task to ensure consistency. |
| `.foundry/docs/style_guides/` | Style Guide | `designer` | Global UX/UI constraints injected into designer tasks. |

### File Naming Convention

Files are named after their `id` field:

```
<type>-<parent_NNN>-<NNN>-<slug>.md
```
*(Note: `IDEA` nodes do not have a parent and omit the `<parent_NNN>` segment.)*

Examples:
- `.foundry/ideas/idea-001-auth-overhaul.md` (Idea, no parent)
- `.foundry/prds/prd-001-002-auth-spec.md` (PRD spawned from Idea 001)
- `.foundry/tasks/task-010-042-parse-daycare-offsets.md` (Task spawned from Story 010)

- `<type>` is lowercase (idea, prd, epic, story, task).
- `<parent_NNN>` is the zero-padded three-digit sequence number of the parent node (use `000` if a non-IDEA node is orphaned).
- `<NNN>` is a zero-padded three-digit sequence number. This number must be uniquely incremented on a best-effort basis globally per node directory (e.g., all tasks share the same increment pool), not reset per parent.
- `<slug>` is a short, kebab-case descriptor.

---

## 3. YAML Frontmatter Schema

Every node file (idea, PRD, epic, story, task) **must** begin with a YAML frontmatter block. Fields marked **Required** will cause the orchestrator to skip or error on the node if absent.

```yaml
---
id: ""                  # Required. Globally unique slug. Convention: <type>-<parent_NNN>-<NNN>-<slug>
type: ""                # Required. Enum: IDEA | PRD | EPIC | STORY | TASK | RESEARCH | ADR | EXPERIMENT
title: ""               # Required. Human-readable short title.
status: ""              # Required. Enum: see Status Lifecycle section.
owner_persona: "coder"  # Required. Enum: see Owner Persona section.
created_at: ""          # Required. ISO-8601 date (YYYY-MM-DD). Set once, never edited.
updated_at: ""          # Required. ISO-8601 date. Updated by any persona that edits the node.
depends_on: []          # Required. Array of repo-relative file paths. Empty [] = unblocked.
jules_session_id: null  # Required. Active Jules session ID string, or null when idle.
locks: []               # Optional. Array of strings for resource identifiers the node needs exclusive access to.
pr_number: null         # Optional. PR number for human-in-the-loop tasks, or null.
parent: null            # Required if node is derived from another node (e.g. PRD from IDEA, EPIC from PRD). The ID (preferred) or repo-relative path to the logical parent node. Blocks the parent from completion if this node is incomplete.
tags: []                # Optional. Free-form string labels for filtering and context injection.
research_references: [] # Optional. Array of repo-relative paths to research nodes.
experiment_variants: [] # Optional. Tracks variant configurations for A/B experiments.
rejection_count: 0      # Optional. Incremented by the Resurrection Loop on each CEO veto. Omit for IDEA nodes. Broadcasted to UI for permanent failure tracking (ADR 017).
rejection_reason: ""    # Optional. Used when transitioning a node to FAILED because it is fundamentally impossible to complete.
notes: ""               # Optional. Free-form Markdown remarks.
---
```

### 3.1 Field Reference

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | ✅ | Globally unique. Convention: `<type>-<parent_NNN>-<NNN>-<slug>` (IDEA nodes omit parent NNN). Used by humans and search; the DAG uses file paths. |
| `type` | `enum` | ✅ | `IDEA \| PRD \| EPIC \| STORY \| TASK \| RESEARCH \| ADR \| EXPERIMENT` |
| `title` | `string` | ✅ | Short, human-readable description. |
| `status` | `enum` | ✅ | Current lifecycle state. See §4. |
| `owner_persona` | `enum` | ✅ | Persona responsible for progressing this node. Must be exactly one assigned persona (no arrays or multiple personas). See §5. |
| `created_at` | `date` | ✅ | ISO-8601 (YYYY-MM-DD). Immutable after creation. |
| `updated_at` | `date` | ✅ | ISO-8601 (YYYY-MM-DD). Must be updated whenever the file is edited. |
| `depends_on` | `string[]` | ✅ | Repo-relative paths to blocking nodes (e.g., `.foundry/stories/story-001-scaffold.md`). **Empty array `[]` means the node has in-degree zero and is eligible for dispatch once all other preconditions are met.** |
| `jules_session_id` | `string \| null` | ✅ | Jules session ID while `ACTIVE`. Always present; `null` when the node is not being processed. Monitored by the heartbeat workflow. |
| `locks` | `string[]` | optional | Resource identifiers (e.g., persona names, application areas) that the node requires exclusive access to during execution to prevent git merge conflicts. |
| `pr_number` | `integer \| null` | optional | PR number for human-in-the-loop tasks, or `null`. |
| `parent` | `string \| null` | optional | The ID (preferred) or repo-relative path to logical parent (e.g., a story's parent epic). Used for context hydration when spawning Jules — concatenates reading graphs upward. Does **not** affect DAG blocking. |
| `tags` | `string[]` | optional | Labels for filtering and selective context injection (e.g. `["gen2", "save-engine"]`). |
| `research_references` | `string[]` | optional | Array of repo-relative paths to research nodes. |
| `experiment_variants` | `string[]` | optional | Tracks variant configurations for A/B experiments. |
| `rejection_count` | `integer` | optional | Tracks CEO vetoes. Incremented by the Resurrection Loop. The `agile_coach` monitors high values as signals of chronic failure areas. Omit for `IDEA` and `PRD` nodes. Also broadcasted to the Permanent Failure Dashboard UI for visibility (ADR 017). |
| `rejection_reason` | `string` | optional | Used when transitioning a node to `FAILED` because it is fundamentally impossible to complete. |
| `notes` | `string` | optional | Free-form Markdown for human remarks, caveats, or inline research. |

---

## 4. Status Lifecycle

### 4.1 Status Enum

| Status | Gen 1 Mapping | Description |
|---|---|---|
| `PENDING` | Pokémon Egg | Node exists but has unresolved `depends_on` entries — not yet eligible for dispatch. |
| `READY` | Hatched Pokémon | **Orchestrator-written only.** All `depends_on` nodes are `COMPLETED`. Node is queued for the next dispatch cycle. |
| `ACTIVE` | In Battle / Training | A Jules session (`jules_session_id`) is currently working on this node. This status persists if a PR is open for review. |
| `VERIFYING` | Gym Leader Evaluation | A PR was merged, and the `auditor` is currently verifying the outcome. |
| `COMPLETED` | Fully Evolved / Hall of Fame | PR merged (or auditor verification passed). TPM archives the node. |
| `FAILED` | Fainted / Blacked Out | Session crashed silently or PR was rejected/closed without merge. Resurrection Loop re-spawns a fresh session. |
| `BLOCKED` | Sleeping (Snorlax) | DAG deadlock or explicit TPM hold. Requires CEO or TPM intervention to resolve. |
| `CANCELLED` | Released | Node retired by CEO decision or permanently failed. TPM archives the node. |

### 4.2 Valid State Transitions

```mermaid
stateDiagram-v2
    [*] --> PENDING : Node created
    PENDING --> READY : Orchestrator confirms all depends_on = COMPLETED
    READY --> ACTIVE : Orchestrator dispatches Jules session
    ACTIVE --> VERIFYING : Work submitted by owner / PR merged
    VERIFYING --> COMPLETED : Auditor approves verification
    VERIFYING --> FAILED : Auditor rejects verification (triggers resurrection loop or cancellation)
    ACTIVE --> FAILED : Heartbeat detects crashed session or rejected PR
    FAILED --> READY : Resurrection Loop spawns fresh session (rejection feedback injected)
    PENDING --> BLOCKED : TPM detects deadlock
    READY --> BLOCKED : TPM places explicit hold
    ACTIVE --> BLOCKED : TPM places explicit hold
    BLOCKED --> PENDING : CEO / TPM resolves hold
    ACTIVE --> CANCELLED : CEO decides to retire node
    PENDING --> CANCELLED : CEO decides to retire node
    COMPLETED --> [*]
    CANCELLED --> [*]
```

### 4.3 `READY` Is Orchestrator-Authored — Never Set Manually

No persona should ever manually set `status: READY`. The orchestrator calculates in-degree across the full graph and writes `READY` only when it has confirmed all dependencies are `COMPLETED`. Manual `READY` edits will be overwritten by the next orchestrator run.

---

## 5. Owner Persona Enum

| Value | Role | Pokémon (Gen 1) |
|---|---|---|
| `canvas` | Master of interactive layouts, canvases, visual rendering and UI diff structures. | Porygon |
| `palette` | Master of Tailwind and styling ecosystem. Maintains `src/index.css` and custom tactical `@utility` primitives as per ADR 024. | Starmie |
| `product_manager` | Transforms `IDEA` → `PRD`. | Dragonite |
| `epic_planner` | Transforms `PRD` → `EPIC` breakdown. | Alakazam |
| `story_owner` | Monitors active epics; writes `STORY` nodes dynamically (late-binding). | Lapras |
| `architect` | Master of the Blueprint. Maintains ADRs, schemas, and defines global App/Foundry architecture. Cannot own `PRD` nodes; if an ADR is needed, the `product_manager` spawns a `TASK` for the `architect` alongside a `PRD` for the `epic_planner`. | Rhydon |
| `tech_lead` | Transforms `STORY` → `TASK` (technical implementation plans). | Mewtwo |
| `coder` | Implements individual `TASK` nodes. | Machamp |
| `qa` | Validates `TASK` implementation against technical contracts. | Mr. Mime |
| `human` | A human contributor. Bypasses Jules dispatch and heartbeat timeouts. | Pikachu |
| `tpm` | Runs hourly. Archives `COMPLETED` nodes, resolves minor graph deadlocks, manages journals. | Chansey |
| `agile_coach` | Master of the Process. Evolves persona prompts, monitors learning logs, and optimizes system-wide workflows. | Eevee |
| `mechanic` | Ensures the Foundry is working as intended. Analyzes history and nodes to resolve deadlocks and loops. | Magnemite |
| `researcher` | Responsible for exploratory tasks. Late-bound research nodes can be dynamically created by active nodes. Multiple researchers can be assigned to different sibling research nodes. | Omanyte |
| `auditor` | Verifies artifacts against original intent, extracts learnings, and dynamically spawns follow-up nodes before archiving. | Pidgeot |
| `librarian` | Mapped to Snorlax (#143). Responsible for context token optimization by digesting historical data and pruning stale entries. | Snorlax |

---

## 6. Journal Convention

> Journals live under `.foundry/journals/`. Beyond that, **structure is entirely up to each persona.**

A persona may use:
- A single file: `journals/coder.md`
- A subdirectory: `journals/coder/frontend.md` + `journals/coder/backend.md`
- Dated entries, topic-based files, or any other structure that serves their learning needs.

The `tpm` persona is responsible for archiving stale journal content. The only invariant is that journal files **do not use YAML frontmatter** — they are plain Markdown and are not parsed by the orchestrator.

---

## 7. System Invariants

These are the hard rules the orchestrator, heartbeat, and resurrection loop rely on. Violating them produces undefined behaviour.

1. **`created_at` is immutable.** Set it once on node creation. Never edit it.
2. **`updated_at` must be refreshed on every edit.** Any persona that modifies a node must bump this field.
3. **`depends_on` uses repo-relative file paths.** Do not use `id` slugs or short names — the orchestrator resolves paths with `fs.readFile`, not a lookup table.
4. **A node in `ACTIVE` status must have a non-null `jules_session_id`.** If it doesn't, the heartbeat will flip it to `FAILED`.
5. **Only the orchestrator writes `READY`.** Personas must never set this status manually.
6. **Implementers (Coder/QA) must NOT modify node frontmatter**, EXCEPT for the `status` field if they need to mark the task as `FAILED`, and the `rejection_reason` field. They are strictly forbidden from setting the status to `COMPLETED` or `DONE`. They should primarily update the Markdown body.
7. **`COMPLETED` nodes are read-only.** Once a PR is merged, the node transitions to `VERIFYING`. Once verified, it becomes `COMPLETED` and must not be edited. The TPM archives it.
8. **`depends_on` paths must be resolvable.** The orchestrator will treat an unresolvable path as a permanent block (equivalent to `BLOCKED`). Always verify paths exist before committing.
9. **Every `.foundry/**/*.md` file that is not a journal or doc must have valid YAML frontmatter.** The orchestrator will skip malformed files and log a warning — they will never be dispatched.
10. **The `id` field must be globally unique across all `.foundry/` directories.** Duplicate IDs are undefined behaviour in the orchestrator.
11. **`owner_persona` must be exactly one persona.** The system enforces a single-owner invariant per node for atomic handoffs; arrays or multiple personas are invalid.
12. **`human` persona bypasses Jules dispatch and heartbeat timeouts.** The orchestrator will not dispatch Jules for nodes owned by `human`, and the heartbeat will not fail them.
13. **Composite Nodes are an anti-pattern.** Do not create "Composite Nodes". They bundle multiple lifecycle states or responsibilities that conflict with the strict Directed Acyclic Graph orchestrator. This leads to circular dependencies or unresolved `depends_on` chains, causing DAG deadlocks.
14. **Sibling Dependency Recommendations.** If multiple sibling nodes (e.g. TASK nodes from the same STORY) are created with sequential implementation dependencies, their `depends_on` field SHOULD explicitly point to the prerequisite task to prevent DAG deadlocks. This is the responsibility of the tech lead and is not enforced by the orchestrator.
15. **Macro nodes (`IDEA`, `PRD`, `EPIC`, `STORY`) cannot complete until all of their descendant nodes are `COMPLETED`.**
    - When creating downstream/child nodes, personas MUST append references to newly generated child nodes as unchecked tasks (`- [ ]`) directly into the markdown body of the parent node.
    - You must check off your specific acceptance criteria checkboxes in the parent node WITHOUT modifying its YAML frontmatter.
    - Do NOT submit an Empty PR to transition a parent node to VERIFYING (by checking off its own acceptance criteria) until ALL of its generated child nodes have transitioned to COMPLETED.
    - If a parent node has incomplete children, you must leave its own acceptance criteria checkboxes unchecked to keep it in PENDING status.
16. **Orchestrator Safeguard (E2E/Integration Requirement)**: When breaking down Epics, generative personas must ensure every EPIC generates a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`), even for documentation-focused Epics. An EPIC cannot be COMPLETED without it.

---

## 8. New Node Template

Copy-paste this block to start any new node. Fill in all required fields before committing.

```yaml
---
id: <type>-<parent_NNN>-<NNN>-<slug> # e.g. task-001-002-implement-feature
type: # Enum: IDEA | PRD | EPIC | STORY | TASK | RESEARCH | ADR | EXPERIMENT
title: ""
status: PENDING
owner_persona: "coder"
created_at: "YYYY-MM-DD"
updated_at: "YYYY-MM-DD"
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: null
tags: []
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# <Title>

<!-- Node body: write your description, acceptance criteria, technical spec, etc. below -->
```

---

## 9. `depends_on` Reference Examples

```yaml
# A story that is blocked by its parent epic being approved:
depends_on:
  - .foundry/epics/epic-001-auth-overhaul.md

# A task blocked by two stories:
depends_on:
  - .foundry/stories/story-002-db-schema.md
  - .foundry/stories/story-003-api-contract.md

# An unblocked node (eligible for dispatch as soon as status = READY):
depends_on: []
```

Paths are **always relative to the repository root**, starting with `.foundry/`.

---

*This document is the bedrock of the Foundry. Before modifying it, open a PR authored by the `tech_lead` persona and obtain CEO approval.*


## 11. EMPTY PR POLICY
If a target artifact already exists and matches the required state, personas must submit an empty PR (0 files changed). The system will automatically merge these PRs to progress the node to `COMPLETED`. Personas should document the reasoning in their journals.

---

## 12. PokeData Property Naming Schema (Application Data)

As defined in ADR 015, with the transition to MsgPack (`msgpackr`) and the configuration of `useRecords: true`, the application's runtime data structures (`PokeData`) now use full, readable property names rather than minified strings. This improves Developer Experience (DX) without significantly increasing payload sizes, because the serialization library deduplicates structural keys.

*   `name` (formerly `n`)
*   `captureRate` (formerly `cr`)
*   `genderRate` (formerly `gr`)
*   `evolvesTo` (formerly `eto`)
*   `evolvesFrom` (formerly `efrm`)
*   `evolutionDetails` (formerly `det`)
*   `chance` (formerly `c`)
*   `method` (formerly `m`)
*   `minLevel` (formerly `min` or `ml`)
*   `maxLevel` (formerly `max`)
*   `timeOfDay` (formerly `t` or `time`)
*   `areaId` (formerly `aid`)
*   `versionId` (formerly `v`)
*   `details` (formerly `d`)
*   `pokemonId` (formerly `pid`)
*   `encounters` (formerly `enc`)
*   `parentId` (formerly `prnt`)
*   `connections` (formerly `conn`)
*   `pokemonIds` (formerly `pids`)
*   `distances` (formerly `dist`)
*   `trigger` (formerly `tr`)
*   `minHappiness` (formerly `mh`)
*   `itemId` (formerly `item`)
*   `heldItemId` (formerly `held`)
*   `relativePhysicalStats` (formerly `rps`)
*   `evolvesFromId` (formerly `ef`)
*   `pokemon` (formerly `poke`)
*   `locations` (formerly `loc`)
*   `hash` (remains `hash`)
*   `power` (formerly `p`)
*   `accuracy` (formerly `acc`)
*   `damageClass` (formerly `dmg_class`)
*   `flingPower` (formerly `fling_p`)
*   `sprite` (formerly `spr`)

Enum-to-number optimizations (e.g., mapping encounter methods or string triggers to integer values) are preserved.

---

## 13. Save File Parsing & Extraction Guidelines

To ensure maintainability and readability within the save parsing engine, the following rules apply when parsing or extracting save file blocks:
*   **Module-Level Constants:** All memory offsets, lengths, bit locations, shifts, and array bounds checking limits must be explicitly defined as reusable constants at the module level.
*   **No Magic Numbers:** The use of inline magic numbers (e.g., `0x2dd6`, `>> 4`) directly in parsing functions is strictly forbidden.
*   **Relative Offsets (Gen 3):** When extracting Gen 3 save blocks, you must pass and utilize the resolved section offset (e.g., `section1Offset` or `section2Offset`) to calculate relative memory offsets rather than absolute hardcoded offsets, supporting the A/B bank flash memory architecture.
*   **Bitwise Mapping:** When parsing bitwise blocks (e.g., event flags) using the `DataView` API, you must explicitly map the specific bit offsets corresponding to target events. Just extracting the raw array is insufficient.
*   **RangeError Handling:** When using the `DataView` API, you MUST catch `RangeError` for out-of-bounds reads and throw a new error with the message "The save file is corrupted or incomplete." to prevent application crashes.
*   **WASM Emulator Integration & Memory Extraction (ADR 032):** The system supports a multi-emulator architecture (`binjgb` for Gen 1 & Gen 2; `mGBA` for Gen 3). Emulator state synchronization MUST extract SRAM/Save data directly from the emulator's memory space via Javascript bindings during active gameplay. This live memory buffer is directly passed to the DexHelper parsing engine, bypassing the need for manual file-based exports.

---

## 14. SaveHistoryDB IndexedDB Schema

The `SaveHistoryDB` database is used to track and store user save states and diffing history.

*   **Database Name:** `SaveHistoryDB`
*   **Version:** 1

### Object Stores

*   `saves`:
    *   **Key Type:** `string`
    *   **Value Type:** `Uint8Array`
*   `metadata`:
    *   **Key Type:** `string`
    *   **Value Type:** `Record<string, unknown>`
*   `indexes`:
    *   **Key Type:** `string`
    *   **Value Type:** `Record<string, unknown>`

---

## 15. Changelog & Continuous Release Guidelines

To ensure accurate historical tracking and continuous release notes across both Dexhelper and The Foundry:

1. **Dual Changelogs**:
   - `CHANGELOG-dexhelper.md`: Tracks application changes, UI features, save file parsing, game trackers, and user-facing capabilities.
   - `CHANGELOG-foundry.md`: Tracks Foundry engine automation, DAG orchestrator updates, heartbeat routines, personas, and system tooling.

2. **Ad-Hoc Changes Without IDEA Nodes**:
   - Any contributor or persona submitting ad-hoc changes (without an associated IDEA node completion) MUST evaluate whether the change introduces significant new functionality, bug fixes, or system behaviors.
   - If significant, an appropriate entry under `## [Unreleased]` must be included in `CHANGELOG-dexhelper.md` or `CHANGELOG-foundry.md` within the PR.
