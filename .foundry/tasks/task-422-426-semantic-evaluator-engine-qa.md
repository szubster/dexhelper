---
id: task-422-426-semantic-evaluator-engine-qa
type: TASK
title: QA Semantic Evaluator Engine Logic
status: ACTIVE
owner_persona: qa
created_at: '2026-08-14'
updated_at: '2026-08-17'
depends_on:
  - task-422-425-semantic-evaluator-engine-impl
jules_session_id: '2708413066677494221'
pr_number: null
parent: story-417-422-implement-semantic-evaluator-engine
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Semantic Evaluator Engine Logic

Review and verify the implementation of the semantic evaluator engine. Ensure tests are written correctly, prompt templates are correct, API setup is correct.

### QA Rejection
The implementation failed validation:
1. Files were placed in `.github/scripts/semantic/` instead of `src/engine/semantic/` as mandated by `.foundry/docs/knowledge_base/testing/semantic_evaluator_api.md`.
2. The integration test (`RUN_LLM_INTEGRATION_TESTS=true`) fails because the LLM returns JSON wrapped in markdown tags (e.g., \`\`\`json) which causes `JSON.parse` to throw an error. The implementation needs to strip these markdown code blocks.
