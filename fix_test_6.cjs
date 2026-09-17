const fs = require('fs');
let content = fs.readFileSync('.github/scripts/foundry-heartbeat.test.ts', 'utf8');

content = content.replace(
"expect(writeCall[1]).toContain('rejection_reason: >-\\n      Session violated Autonomous No-Ask Policy by entering AWAITING_USER_FEEDBACK\\n      state');",
"expect(writeCall[1]).toContain('rejection_reason: >-\\n  Session violated Autonomous No-Ask Policy by entering AWAITING_USER_FEEDBACK\\n  state');"
);

fs.writeFileSync('.github/scripts/foundry-heartbeat.test.ts', content);
