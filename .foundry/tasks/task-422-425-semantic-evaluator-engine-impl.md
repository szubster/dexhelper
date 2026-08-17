---
id: task-422-425-semantic-evaluator-engine-impl
type: TASK
title: Implement Semantic Evaluator Engine Logic
status: FAILED
owner_persona: coder
created_at: '2026-08-14'
updated_at: '2026-08-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-417-422-implement-semantic-evaluator-engine
tags: []
research_references: []
rejection_count: 1
rejection_reason: 'Integration test fails due to unhandled markdown in LLM JSON response.'
notes: ''
---

# Implement Semantic Evaluator Engine Logic

Implement the core engine that leverages an LLM to perform semantic evaluations. This includes setting up the API client, defining the prompt template for the evaluator, and creating the function signature for asserting semantic equivalence. Must implement a generic function taking a condition and a prompt.
