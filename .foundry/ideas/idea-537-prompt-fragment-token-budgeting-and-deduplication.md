---
id: idea-537-prompt-fragment-token-budgeting-and-deduplication
type: IDEA
title: "Prompt Fragment Token Budgeting and Dynamic Deduplication"
status: PENDING
owner_persona: product_manager
created_at: "2026-10-14"
updated_at: "2026-10-14"
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: null
priority: 50
confidence_score: 95
tags:
  - foundry
  - prompt-compiler
  - orchestrator
  - performance
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Prompt Fragment Token Budgeting and Dynamic Deduplication

## 1. Context & Background
The Foundry Orchestrator (`packages/foundry/foundry-orchestrator.ts`) compiles agent prompt templates dynamically at dispatch time using a 3-tier layered composition:
1. Base Persona Prompt (`.github/agents/<persona>.md`)
2. Specific Context Layers (`.github/agents/specific/<tag|layer>.md`)
3. Core System Policies (`.foundry/docs/knowledge_base/agents/core_policies.md`)

As the system evolved, persona prompts and specific context layers grew significantly. In many dispatch cycles, overlapping instructions (such as execution plan rules, save file guidelines, or empty PR procedures) are duplicated across persona baselines and core policy blocks, inflating prompt size and consuming unnecessary context window budget.

## 2. Problem Statement
1. **Context Window Token Bloat:** Unbounded prompt expansion increases token consumption per dispatch, leading to higher API costs and slower model response latency.
2. **Instruction Contradiction & Duplication:** Duplicated or slightly diverging instructions across base personas, specific layer tags, and core system policies lead to instruction conflict or degraded compliance.
3. **Lack of Budget Telemetry:** The orchestrator currently lacks token count metrics and budget caps for compiled prompts prior to dispatching agent sessions.

## 3. Proposed Solution
Implement a **Prompt Fragment Token Budgeting and Dynamic Deduplication Engine** inside `packages/foundry/foundry-orchestrator.ts`:
- **Fragment Token Counter:** Utilize a lightweight tokenizer utility to compute exact/estimated token counts during prompt compilation.
- **Dynamic Structural Deduplication:** Parse compiled prompts into AST/block fragments (e.g., Markdown headers and policy blocks) and automatically strip duplicate text blocks or redundant layer instructions before appending core policies.
- **Token Budget Threshold Enforcement:** Define maximum token thresholds per persona tier. If a compiled prompt exceeds its allocated budget, emit detailed warning logs and automatically prune low-priority optional tags/context layers.
- **Compiler Telemetry:** Log compiled token counts and reduction ratios in execution logs to monitor system prompt efficiency over time.

## 4. Expected Impact & Value
- **Token Reduction:** Estimated 20-35% reduction in prompt token size per dispatch.
- **Higher Compliance:** Eliminating redundant or conflicting prompt instructions improves LLM adherence to DAG policies and execution plan rules.
- **Cost & Latency Optimization:** Lower token overhead reduces per-session API cost and speeds up agent turn responses.

## 5. Acceptance Criteria
- [ ] Create PRD for Prompt Fragment Token Budgeting and Dynamic Deduplication Engine (`prd-537-...`).
- [ ] Design token estimation and section-based deduplication strategy in the Foundry prompt compiler architecture.
- [ ] Integrate compiled prompt token metrics logging into the DAG Orchestrator dispatch pipeline.
