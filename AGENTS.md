# Repository Agent Guidelines: DexHelper & The Foundry

This file defines rules and behavioral directives for AI agents (including Jules, Anti-Gravity, and automated Foundry agents) operating within this repository.

## 1. Strict No-Ask Policy & Autonomous Execution
**CRITICAL DIRECTIVE FOR ALL AGENTS:** You must **NEVER** ask the user questions, or ask for permission, input, feedback, clarification, hints, direction, or adjustments during execution in chat, unless explicitly requested in the initial prompt. Asking questions in chat/conversation is strictly blocked and forbidden. All questions directed to the user will remain unanswered.

### Prohibited Question Patterns
Under NO circumstances should an agent post conversational questions or prompts such as:
- "Before I create my final execution plan..., do you have any specific requirements or adjustments I should keep in mind?"
- "Do you have any specific requirements or adjustments before I proceed?"
- "Should I proceed?" / "Should I finalize changes?"
- "Should I open a PR?" / "Should I submit the PR?"
- "Should I request code review now?"
- "Are there any other tasks you'd like me to focus on before submitting?"
- "Is there anything else you'd like me to address before submitting?"
- "Is there anything else you need me to cover, or should I proceed with final submission?"
- "Which option do you prefer?"
- "Could you provide any hints or direct me to where I might find...?"
- "Could you explain why [node/task] failed to reach completion?"
- "Where can I find the rejection history for [node/task]?"

### Autonomous Execution Protocol
1. **Fully Autonomous Operation:** Formulate plans, make technical decisions, implement code and node updates, run tests, research git history, journals, and codebase logs, and submit PRs or complete tasks without prompting the user for confirmation, asking for hints/direction, or waiting for interactive input. Asking questions in chat is strictly blocked.
2. **Non-Interference with Interactive Systems:** Do not intervene, pause, or interrupt interactive development workflows (e.g. with Anti-Gravity or developer sessions) with conversational queries or approval requests.
3. **PRs as Communication Channels:** Pull requests and node modifications are the formal channel for review. Open and submit PRs immediately when work is ready.
4. **Late Binding & Dynamic Spawning:** If context, specifications, offsets, or rejection history are missing or ambiguous, or if you discover broader product ideas or architectural questions, do NOT ask the user and do NOT set your task status to `FAILED`. Instead, inspect the git history, search agent journals (`.foundry/journals/`), or use Late Binding to spawn appropriate child or upstream nodes (`IDEA`, `ADR`, `RESEARCH`, `PRD`, `EPIC`, `TASK`) in `.foundry/` with the appropriate `owner_persona`, append the spawned node reference as an unchecked checkbox (`- [ ] <node_id>`) in your markdown body, and submit a PR using the `submit` tool.

## 2. Codebase & Testing Standards
- **Testing Requirements:** Every feature or bug fix must be accompanied by appropriate unit or E2E tests.
- **Prohibited Libraries:** `@testing-library/react` and `@testing-library/*` are strictly forbidden. Use `vitest` for unit tests and `@playwright/test` for E2E tests.
- **UI Aesthetic (ADR 008):** Strictly maintain the tactical hardware aesthetic. Sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts (`font-mono`). Rounded corners are forbidden except `rounded-full` for reticles, screws, and LED dots.
- **Verification:** Run `pnpm lint` and `pnpm test` to verify changes before completing tasks.
