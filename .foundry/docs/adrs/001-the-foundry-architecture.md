# The Foundry Autonomous Software Factory Architecture

## Vision
A "CEO-Level" orchestration system where the human provides high-level ideas and micromanages via PR reviews. The multi-agent pipeline autonomously breaks ideas down into atomic tasks and executes them with massive parallelism using Jules asynchronous agents.

## Core Directives
- **Direct Commits**: Agents propose ideas by making actual file changes to their own branches (no PR description-only proposals).
- **CEO Checkpoints**: ALL PR transitions (from PRDs to Code) require explicit CEO approval. Automerge is strictly disabled.
- **The Journal & Veto Power**: The CEO says "No" by closing a PR without merging. System personas (like Agile Coach and Strategist) use a persistent journal to log closed PRs and extract lessons for future cycles. Empty PRs (0 files changed) are automatically merged to allow the DAG to progress if no work is required.

## 1. State Store (`.foundry/` Monofolder)
The repository acts as the database for the entire product lifecycle, containing markdown files representing nodes.
- **`.foundry/ideas/`**: CEO thoughts.
- **`.foundry/prds/`**: Product Requirements.
- **`.foundry/epics/`**: Macroscopic functional chunks.
- **`.foundry/stories/`**: Incremental unblocking steps (Story 2 is only written after Story 1 finishes, incorporating lessons).
- **`.foundry/tasks/`**: Specific engineering implementations with attached technical specs.

### Global System Context (Knowledge Base)
To prevent massive context bloat while keeping tasks context-aware, global system parameters are stored separately and selectively injected based on context or tags:
- **`.foundry/docs/adrs/`**: Architecture Decision Records. The `tech_lead` maintains and reads these to ensure consistency.
- **`.foundry/docs/style_guides/`**: Global UX/UI constraints for the `designer`.

## 2. DAG Orchestrator & Massive Concurrency
- Workflows are defined by `depends_on` arrays within the YAML frontmatter of the markdown files. Dependencies are universal across directories.
- A custom Node.js orchestrator script (`.github/scripts/foundry-orchestrator.ts`) parses frontmatter across all items to calculate an in-degree of `0` globally.
- It passes a JSON array of all unblocked nodes to a GitHub Action, which utilizes a `matrix` strategy to spawn dozens of Jules instances concurrently for parallel execution of all independent epics/stories/tasks.

## 3. The Resurrection Loop & Self-Healing
- **No Git Rebasing**: Since Jules struggles with rebases, we treat sessions as highly disposable.
- If the CEO closes an active Foundry PR without merging, the orchestrator triggers and marks the old session dead. It grabs the CEO's review comments from the closed PR and spawns a completely fresh, new Jules session on a new branch with the precise rejection feedback injected as context.
- **Heartbeat & Zombie Prevention**: A scheduled action reads `jules_session_id` inside `.foundry/` files marked `ACTIVE`. It queries the Jules API. If a session crashed silently, it flips the node to `FAILED` or `BLOCKED` for CEO review.
- **Context Hydration**: The script concatenates the vertical "read graph". For example, Tasks are injected with context from their parent Story and PRD.

## 4. Personas Pipeline (`.github/agents/`)

### Agent Journals
Every agent persona maintains a continuous log in **`.foundry/journals/<agent_name>.md`**. 
When the 'Resurrection Loop' runs, the returning agent updates its local journal with its mistake, ensuring the persona learns localized domain knowledge from CEO rejections.

**The Product Team:**
- `product_manager.md`: Ideas -> PRDs
- `epic_planner.md`: PRDs -> Epics
- `story_owner.md`: Epics -> Stories (The dynamic, late-binding planner that monitors active work).

**The Engineering Team:**
- `tech_lead.md` (replaces Architect): Stories -> Tasks (creates technical contracts/blueprints, reads ADRs).
- `coder.md`: Implementation
- `qa.md`: Validation against specs

**The Organization Team:**
- `tpm.md`: Runs hourly. Archives `COMPLETED` nodes. Resolves minor graph deadlocks, file organization.
- `architect.md` (NEW): Master of the Blueprint. Maintains ADRs and Schemas. Responsible for both Foundry and App architecture.
- `agile_coach.md`: Runs daily/weekly. Master of the Process. Evolves persona prompts and system config based on CEO rejection patterns and learning logs.

## 5. Ongoing Evolution & Scheduled Agents (v1.5)
- The existing fleet of standalone scheduled agents (`strategist`, `sweeper`) will remain on their current cron workflows for the immediate v1.0 release to preserve stability.
- **In v1.5**, these agents will be natively unified into the Foundry DAG: instead of creating raw PRs, they will programmatically drop `Idea` or `Task` markdown nodes directly into the `.foundry` intake folder, subjecting their automated recommendations to the exact same CEO-gatekeeping and validation pipelines as feature work.

## 6. Implementation Progress

### ✅ Epic 1, Story 1.1 — COMPLETED (2026-04-20)
The `.foundry/` monofolder has been scaffolded at the repository root. All 9 files are committed:
- `ideas/`, `prds/`, `epics/`, `stories/`, `tasks/`, `journals/` (all with `.gitkeep`)
- `docs/adrs/`, `docs/style_guides/` (both with `.gitkeep`)
- `docs/schema.md` — the master definitions document (YAML schema, status lifecycle, system invariants, node template)

**Key decisions locked in schema.md:**
- `depends_on` uses repo-relative file paths (not IDs) — orchestrator resolves via `fs.readFile`
- `status: READY` is orchestrator-authored only — never set manually by a persona
- Journals are unstructured free-form Markdown; each persona decides its own structure/layout; `tpm` is responsible for archiving them

### ✅ Epic 2, Story 2.2 — COMPLETED (2026-04-20)
**QA & State Bootstrap**
- State store bootstrapped with initial v1.0 nodes: `.foundry/ideas/idea-001`, `.foundry/epics/epic-003`, `.foundry/stories/story-001/002`.
- Verification performed: Successfully promoted `epic-003` to `READY` via `foundry-orchestrator.ts`.
- **Automated Testing**: 5/5 Vitest unit tests implemented in `.github/scripts/foundry-orchestrator.test.ts`, covering DAG resolution, blocking, resilience, and dry-run logic.
- Foundational `package.json` updated with test automation scripts.

### ✅ Story 001 — COMPLETED (2026-04-20)
**Foundry Architecture Initiation**
- **Blueprint Writing**: Story 001 transformed into concrete engineering tasks (`task-001` through `task-003`).
- **DAG State**: Story 001 transitioned to `COMPLETED`, successfully unblocking `task-001-create-engine-yaml` in the orchestrator graph.
- **Blueprint Nodes**:
    - `task-001`: Core Orchestration Engine (GitHub Actions YAML)
    - `task-002`: Heartbeat & Stale Node Detection
    - `task-003`: Resurrection & Rejection Loop

### 🔜 Next Steps
1. Technical implementation of the GitHub Actions engine (`task-001`).
2. Draft initial Persona `.md` frameworks inside `.github/agents/`.

## 7. EMPTY PR POLICY
Empty PRs (0 files changed) are submitted when a persona determines that the target artifact already exists and is complete. These PRs are automatically merged to allow the Foundry DAG to progress, while the persona documents the outcome in its journal.
