---
id: task-494-473-migrate-core-test-semantic-validation-qa
type: TASK
title: 'QA: Core Agent Test Migration to Semantic Validation'
status: PENDING
owner_persona: qa
created_at: '2026-09-02'
updated_at: '2026-09-05'
depends_on:
  - task-494-472-migrate-core-test-semantic-validation-impl
jules_session_id: null
pr_number: null
parent: story-418-494-agent-test-migration-core
tags:
  - testing
  - qa
research_references: []
notes: ''
locks: []
rejection_reason: ''
---

# Task: QA: Core Agent Test Migration to Semantic Validation

## Objective
Verify that the core test suites for agent process rules have been successfully migrated to use the semantic validation utility and that they correctly assert the rules.

## QA Verification Steps
1. **Review Migrated Tests**: Review the changes made in the migration PR to ensure that exact string matching has been replaced with the semantic validation utility.
2. **Execute Tests**: Run the migrated test suites to ensure they pass.
3. **Resilience Check**: Make a minor phrasing change to a prompt or rule being tested to verify that the semantic validation correctly ignores superficial changes while still enforcing the core rule.
4. **Code Quality**: Ensure the usage of the semantic validation utility is correct and follows any established patterns.

## Acceptance Criteria
- [ ] The migration PR is reviewed and approved.
- [ ] The test suites pass successfully.
- [ ] Tests demonstrate resilience to non-semantic phrasing changes.
