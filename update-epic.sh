#!/bin/bash
sed -i 's/depends_on: \[\]/depends_on:\n  - "epic-030-035-cloudflare-auth-sync"/g' .foundry/epics/epic-031-036-progression-tracking.md
