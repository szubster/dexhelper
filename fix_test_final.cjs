const fs = require('fs');
let content = fs.readFileSync('.github/scripts/foundry-heartbeat.test.ts', 'utf8');

// Use precise substring replacements to avoid escaping nightmares
const originalAssertion = "expect(writeCall[1]).toContain('rejection_reason: Session timed out (>7 days without PR)');";
const newAssertion = "expect(writeCall[1]).toContain('rejection_reason: >-');\n    expect(writeCall[1]).toContain('Session violated Autonomous No-Ask Policy');";
content = content.replace(originalAssertion, newAssertion);

const originalMock = "json: async () => ({ state: 'AWAITING_USER_FEEDBACK', updateTime: recentDate })";
const newMock = "json: async () => ({ state: 'IN_PROGRESS', updateTime: recentDate })";
content = content.replace(originalMock, newMock);

fs.writeFileSync('.github/scripts/foundry-heartbeat.test.ts', content);
