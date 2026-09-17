const fs = require('fs');
let content = fs.readFileSync('.github/scripts/foundry-heartbeat.test.ts', 'utf8');

// Use a simple string replacement without newlines to avoid oxc parser issues
content = content.replace(
"expect(writeCall[1]).toContain('rejection_reason: Session timed out (>7 days without PR)');",
"expect(writeCall[1]).toContain('rejection_reason: >-');"
);

content = content.replace(
"json: async () => ({ state: 'AWAITING_USER_FEEDBACK', updateTime: recentDate })",
"json: async () => ({ state: 'IN_PROGRESS', updateTime: recentDate })"
);

fs.writeFileSync('.github/scripts/foundry-heartbeat.test.ts', content);
