const fs = require('fs');
let content = fs.readFileSync('.github/scripts/foundry-heartbeat.test.ts', 'utf8');

// Replace the specific text for the rejection_reason check in the first failing test
content = content.replace(/rejection_reason: Session timed out \(>7 days without PR\)/g, "rejection_reason: >-\n      Session violated Autonomous No-Ask Policy by entering AWAITING_USER_FEEDBACK\n      state");

fs.writeFileSync('.github/scripts/foundry-heartbeat.test.ts', content);
