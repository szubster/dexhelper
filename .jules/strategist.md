## 2026-06-01 - [Accepted] - Prompt improvement - Prevent Oak from modifying Foundry DAG nodes
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** Agent PR history showed Oak repeatedly fixing `jules_session_id` and parent links in `.foundry/` DAG nodes instead of doing its actual domain tasks. Oak interpreted "Data Integrity" as applying to DAG files.
**Pattern:** When an agent's domain name (like "Data Integrity") is broad, it must explicitly exclude meta-files (like `.foundry/`) to prevent it from getting distracted by orchestrator warnings.

## 2025-04-19 - [Accepted] - New agent: Sweeper (Code Health & Tech Debt)
**Type:** New agent
**Outcome:** Accepted
**Why:** Proposal submitted to maintainer and maintainer instructed to add the agent directly.
**Pattern:** Proposing based on hints in memory (code health PR prefix). Note: The user explicitly wants to keep both `bundlemon` and Codecov Vite plugin in the project. They are used intentionally in parallel, so agents should never remove `bundlemon` as an "unused" dependency.

## 2026-04-19 - [Accepted] - New agent: Shield (Security & Cryptography)
**Type:** New agent
**Outcome:** Accepted
**Why:** Proposal submitted to maintainer and maintainer instructed to add the agent directly.
**Pattern:** Proposing based on hints in memory (CWE-209 prevention, native `node:crypto` usage, and security fix PR title format).

## 2026-04-20 - [Accepted] - prompt improvement - Add visual regression testing to Sentinel
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** Proposal submitted to maintainer and maintainer merged the changes.
**Pattern:** Proposing an improvement based on specific missing test strategies found in the ecosystem.
## 2025-04-22 - [Rejected] - Prompt improvement - Ensure Strategist properly discovers and logs unrecorded past outcomes
**Type:** Prompt improvement
**Outcome:** Rejected → journaled
**Why:** The maintainer rejected the proposal to use `git log` to retroactively discover outcomes, stating explicitly: "They should not look at past commits to figure out their memory, as journal always has them. Every PR either has code changes + journal (optionally, if useful), or journal only with rejection statement and reason for future learning."
**Pattern:** Do not propose tracking memory through past commits instead of the explicit journal mechanism defined in the "Wait and Convert" flow.

## 2025-04-23 - [Accepted] - Prompt improvement - Remove Git/PR history as memory source
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** Maintainer clarified that agents should not look at past commits to figure out their memory, as the journal always has them.
**Pattern:** Do not instruct agents to read PR history for cross-session memory.

## 2026-05-15 - [Accepted] - Prompt improvement - Update PR titles and bodies to match system memory
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The PR formatting rules in the agent prompts needed to match the explicit rules in the system memory.
**Pattern:** Proposing changes to correctly format agent output based on the project's requirements.

## 2026-06-02 - [Accepted] - Prompt improvement - Update Shield to prevent CWE-285 and fix PR title
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** The memory requires Shield to use the 🔐 emoji for PR titles, and to prevent CWE-285 vulnerabilities (using String.includes on URLs instead of startsWith).
**Pattern:** Proposing changes to update security prompts according to CI constraints (CodeQL) and project title conventions.
## 2026-06-03 - [Accepted] - Prompt improvement - Update Canvas to adhere to project aesthetic
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** System memory requires the Canvas persona to adhere to a "tactical hardware/snooping" aesthetic, but the prompt didn't mention it.
**Pattern:** Codify system memory constraints into agent prompts so they are respected.
## 2026-06-04 - [Accepted] - Prompt improvement - Ensure Strategist uses journals instead of PR history
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The maintainer explicitly instructed that agents must not use `git log` or past commits for memory, and instead rely on journals. The Strategist prompt was still instructing itself to review agent PR history instead of agent journals.
**Pattern:** Update prompts to ensure they align with the system constraint that cross-session memory is exclusively stored in `.jules/*.md` journal files, not git history.

## 2026-05-02 - [Accepted] - Prompt improvement - Update Sweeper prompt to enforce grep verification and fix PR title
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The Sweeper journal explicitly noted that knip can hallucinate unused files that are implicitly used in configs or test runners, and that agents must use grep to verify. Additionally, system memory requires the PR title format to strictly be `🧹 [description]`.
**Pattern:** Codify system memory constraints and specific tool-verification requirements into agent prompts to avoid regressions.

## 2026-06-05 - [Accepted] - Prompt improvement - Update Sentinel to prevent flaky E2E tests and Vitest lint errors
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** Sentinel's history showed recurring issues with E2E tests failing due to un-awaited IndexedDB syncs after navigation, and Vitest tests failing Biome's strict type checking (`lint/suspicious/noExplicitAny`) when creating `vi.fn()` mocks without explicit type parameters.
**Pattern:** Proposing changes to correctly configure testing tools and eliminate recurring developer friction caused by missing boundaries in agent prompts.

## 2026-06-06 - [Accepted] - New agent: TPM (Technical Program Manager)
**Type:** New agent
**Outcome:** Accepted
**Why:** System memory contains extensive rules regarding The Foundry DAG node management, orchestrator late-binding completion, circular dependencies, and archiving rules. There is a need for a dedicated agent to manage this orchestrator metadata accurately and resolve node deadlocks to prevent other agents (like Oak) from being distracted.
**Pattern:** Identifying system memory that outlines complex operational processes not covered by existing schedule prompts.
