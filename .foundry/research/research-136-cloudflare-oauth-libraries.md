---
id: research-136-cloudflare-oauth-libraries
type: RESEARCH
title: Evaluate Cloudflare Native OAuth Libraries
status: ACTIVE
owner_persona: researcher
created_at: '2026-05-28'
updated_at: '2026-05-31'
depends_on: []
jules_session_id: '12945515588812393289'
pr_number: null
parent: story-038-075-google-sso-integration
tags:
  - backend
  - authentication
  - sso
  - cloudflare
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Evaluate Cloudflare Native OAuth Libraries

## Context
We need to implement a Google SSO flow for our application. Rather than implementing the OAuth flow from scratch or relying on generic Node libraries that might not play well with Cloudflare Pages/Workers, we need to identify the most robust, "Cloudflare-native" approach.

## Objectives
- Evaluate `cloudflare-access` policies for protecting Pages routes.
- Evaluate `@cloudflare/pages-plugin-cloudflare-access` (if applicable/existing).
- Evaluate lightweight, Worker-compatible OAuth libraries (e.g., specific to Cloudflare or Edge environments).
- Document how to implement a single-user restriction using Cloudflare Access or the selected library (rather than custom application logic).

## Expected Output
A new ADR documenting the chosen Cloudflare-native authentication approach and a technical plan for implementation.
