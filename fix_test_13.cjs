const fs = require('fs');
let content = fs.readFileSync('.github/scripts/foundry-heartbeat.test.ts', 'utf8');

// The original file uses double quotes or backticks to spread across lines maybe?
// Let's replace the whole block by finding the start of the `it`
const testStart = "it('should transition a node to FAILED if its Jules session is in AWAITING_USER_FEEDBACK without a PR and older than 7 days'";

const newTest = `it('should transition a node to FAILED if its Jules session is in AWAITING_USER_FEEDBACK without a PR and older than 7 days', async () => {
    const pastDate = new Date(Date.now() - 170 * 60 * 60 * 1000).toISOString();
    const mockNode = {
      filePath: '/mock/repo/.foundry/tasks/task-awaiting.md',
      repoPath: '.foundry/tasks/task-awaiting.md',
      frontmatter: {
        id: 'task-awaiting',
        type: 'TASK',
        status: 'ACTIVE',
        jules_session_id: 'session-awaiting',
        updated_at: pastDate
      },
      rawContent: '---\\nstatus: ACTIVE\\njules_session_id: "session-awaiting"\\nupdated_at: "' + pastDate + '"\\n---\\nBody'
    };

    vi.mocked(orchestrator.discoverNodeFiles).mockReturnValue(['/mock/repo/.foundry/tasks/task-awaiting.md']);
    vi.mocked(orchestrator.parseNodeFile).mockReturnValue(mockNode as any);

    globalFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ state: 'AWAITING_USER_FEEDBACK', updateTime: pastDate })
    } as unknown as Response);

    await main();

    expect(fs.writeFileSync).toHaveBeenCalled();
    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
    expect(writeCall[0]).toBe(mockNode.filePath);
    expect(writeCall[1]).toContain('status: FAILED');
    expect(writeCall[1]).toContain('Session violated Autonomous No-Ask Policy by entering AWAITING_USER_FEEDBACK');
  });`;

content = content.substring(0, content.indexOf(testStart)) + newTest + content.substring(content.indexOf("it('should NOT transition a node if its Jules session is IN_PROGRESS and under 7 days old'"));

// We still need to fix the next test
content = content.replace(
"json: async () => ({ state: 'AWAITING_USER_FEEDBACK', updateTime: recentDate })",
"json: async () => ({ state: 'IN_PROGRESS', updateTime: recentDate })"
);


fs.writeFileSync('.github/scripts/foundry-heartbeat.test.ts', content);
