# Gastown-Inspired Autonomous Software Factory Architecture

## Vision
A "CEO-Level" orchestration system where the human provides high-level ideas and micromanages via PR reviews. The multi-agent pipeline autonomously breaks ideas down into atomic tasks and executes them with massive parallelism using Jules asynchronous agents.

## Core Directives
- **Direct Commits**: Agents propose ideas by making actual file changes to their own branches (no PR description-only proposals).
- **CEO Checkpoints**: ALL PR transitions (from PRDs to Code) require explicit CEO approval. Automerge is strictly disabled.
- **The Journal & Veto Power**: The CEO says "No" by closing a PR without merging. System personas (like Agile Coach and Strategist) use a persistent journal to log closed PRs and extract lessons for future cycles.

## 1. State Store (`.gastown/` Monofolder)
The repository acts as the database for the entire product lifecycle, containing markdown files representing nodes.
- **`.gastown/ideas/`**: CEO thoughts.
- **`.gastown/prds/`**: Product Requirements.
- **`.gastown/epics/`**: Macroscopic functional chunks.
- **`.gastown/stories/`**: Incremental unblocking steps (Story 2 is only written after Story 1 finishes, incorporating lessons).
- **`.gastown/tasks/`**: Specific engineering implementations with attached technical specs.

## 2. DAG Orchestrator & Massive Concurrency
- Workflows are defined by `depends_on` arrays within the YAML frontmatter of the markdown files. Dependencies are universal across directories.
- A custom Node.js orchestrator script (`.github/scripts/gastown-orchestrator.mjs`) parses frontmatter across all items to calculate an in-degree of `0` globally.
- It passes a JSON array of all unblocked nodes to a GitHub Action, which utilizes a `matrix` strategy to spawn dozens of Jules instances concurrently for parallel execution of all independent epics/stories/tasks.

## 3. The Resurrection Loop & Self-Healing
- **No Git Rebasing**: Since Jules struggles with rebases, we treat sessions as highly disposable.
- If the CEO closes an active Gastown PR without merging, the orchestrator triggers and marks the old session dead. It grabs the CEO's review comments from the closed PR and spawns a completely fresh, new Jules session on a new branch with the precise rejection feedback injected as context.
- **Heartbeat & Zombie Prevention**: A scheduled action reads `jules_session_id` inside `.gastown/` files marked `ACTIVE`. It queries the Jules API. If a session crashed silently, it flips the node to `FAILED` or `BLOCKED` for CEO review.
- **Context Hydration**: The script concatenates the vertical "read graph". For example, Tasks are injected with context from their parent Story and PRD.

## 4. Personas Pipeline (`.github/agents/`)
**Product Team:**
- `product_manager.md`: Ideas -> PRDs
- `epic_planner.md`: PRDs -> Epics
- `story_owner.md`: Epics -> Stories (The dynamic, late-binding planner that monitors active work).

**Engineering Team:**
- `tech_lead.md` (replaces Architect): Stories -> Tasks (creates technical contracts/blueprints)
- `coder.md`: Implementation
- `qa.md`: Validation against specs

**Organization Team:**
- `tpm.md`: Runs hourly. Archives `COMPLETED` nodes. Resolves minor graph deadlocks, file organization.
- `agile_coach.md`: Runs daily/weekly. The meta-agent. Modifies `AGENTS.md`, scheduled agents, and persona prompts based on what the CEO rejects. Uses the strict journal-rejection loop.

## 5. Next Steps for Implementation (Execution Phase)
When returning to implement this system, the agent should:
1. Initialize the `.gastown` directory structure and base YAML frontmatter schema templates.
2. Develop `.github/scripts/gastown-orchestrator.mjs` (the DAG matrix calculator in Node).
3. Draft `.github/workflows/gastown-engine.yml` and the `gastown-heartbeat.yml`.
4. Draft initial Persona `.md` frameworks inside `.github/agents/`.