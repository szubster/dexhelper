---
id: research-030-004-cloudflare-storage-evaluation
type: RESEARCH
title: Cloudflare Storage Evaluation for Save Syncing
status: COMPLETED
owner_persona: researcher
created_at: '2026-05-20'
updated_at: '2026-05-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-055-030-cloudflare-auth-sync
tags:
  - backend
  - sync
  - cloudflare
  - research
research_references: []
rejection_reason: ''
notes: ''
---

# Research: Cloudflare Storage Evaluation for Save Syncing

## Objective
Evaluate which Cloudflare product is the best fit for our offline-first save syncing requirement with a "no cost" initial setup.

## Context
We are implementing Phase 1 of backend sync. We need to store user save files in the Cloudflare stack. We want to evaluate the following options based on the constraint of starting with "no cost" (free tier) and supporting an offline-first browser architecture.

## Options to Evaluate
1. **Cloudflare Workers KV**
   - Pros/Cons?
   - Eventual consistency limitations?
2. **Cloudflare R2**
   - Object storage. Cost for operations?
3. **Cloudflare D1**
   - Relational DB. Is it overkill or necessary for file blobs?

## Questions to Answer
- Which product provides the best free tier limits for our use case (frequent save states)?
- How does each option integrate with offline-first synchronization logic (e.g. handling conflicts)?
- Provide a recommendation for the MVP implementation.

## Findings
### Free Tier Limits
- **Cloudflare Workers KV**: 100,000 keys read/day, 1,000 keys written/day, 1,000 keys deleted/day, 1,000 list requests/day, 1 GB stored data. The write limits are very low for frequent save state syncing.
- **Cloudflare R2**: 10 GB-month/month storage, 1 million Class A Operations (writes)/month, 10 million Class B Operations (reads)/month. Egress is free. Provides the highest write capacity and storage limits.
- **Cloudflare D1**: 5 million rows read/day, 100,000 rows written/day, 5 GB storage.

### Sync Logic & Suitability
- **Cloudflare Workers KV**: Its eventual consistency model is a significant liability for immediate cross-device sync, potentially leading to stale reads and conflict issues.
- **Cloudflare R2**: Offers strong read-after-write consistency, which is crucial for reliably syncing save states across devices without stale reads. It is designed specifically for object/file storage, making it the native fit for save blobs.
- **Cloudflare D1**: Being a relational SQL database, it is unnecessary and overkill for simply storing and retrieving file blobs.

### Recommendation
**Cloudflare R2** is the recommended solution for the MVP. It offers the highest free tier limits for write operations (Class A), provides strong consistency required for offline-first sync logic, and is natively suited for storing binary file blobs like save files.

## Acceptance Criteria
- [x] Researcher: Update this markdown body with findings and a clear technical recommendation.
