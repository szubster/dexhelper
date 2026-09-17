const fs = require('fs');
let content = fs.readFileSync('.github/scripts/foundry-heartbeat.test.ts', 'utf8');

// The previous sed created an unterminated string. Let's fix it manually.
content = content.replace(/'rejection_reason: >-\n      Session violated Autonomous No-Ask Policy by entering AWAITING_USER_FEEDBACK\n      state/,
"'rejection_reason: >-\\n  Session violated Autonomous No-Ask Policy by entering AWAITING_USER_FEEDBACK\\n  state'");

fs.writeFileSync('.github/scripts/foundry-heartbeat.test.ts', content);
