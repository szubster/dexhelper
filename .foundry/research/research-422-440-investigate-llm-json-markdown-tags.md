---
id: research-422-440-investigate-llm-json-markdown-tags
type: RESEARCH
title: Investigate LLM JSON Markdown Tags Failure
status: COMPLETED
owner_persona: researcher
created_at: '2026-08-18'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-417-422-implement-semantic-evaluator-engine
tags: []
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Investigate LLM JSON Markdown Tags Failure

Investigate the integration test failure where the LLM returns JSON wrapped in markdown tags causing `JSON.parse` to throw an error. Find a robust solution to strip these markdown code blocks.

## Acceptance Criteria
- [x] Strip markdown wrappers off JSON returned by evaluateSemanticCondition
