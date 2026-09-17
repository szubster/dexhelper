const fs = require('fs');
let content = fs.readFileSync('.github/scripts/foundry-heartbeat.test.ts', 'utf8');

content = content.replace("expect(writeCall[1]).toContain('rejection_reason: Session timed out (>7 days without PR)');", "expect(writeCall[1]).toContain('rejection_reason: Session violated Autonomous No-Ask Policy by entering AWAITING_USER_FEEDBACK state');");

// We need to also modify the second test that fails because the mock returns 'AWAITING_USER_FEEDBACK' instead of 'IN_PROGRESS'
content = content.replace(
"json: async () => ({ state: 'AWAITING_USER_FEEDBACK', updateTime: recentDate })",
"json: async () => ({ state: 'IN_PROGRESS', updateTime: recentDate })"
);

fs.writeFileSync('.github/scripts/foundry-heartbeat.test.ts', content);
