import { describe, it, expect } from 'vitest';
import { compileAntigravityPrompt } from './prompt-compiler.ts';
import type { NodeData } from './types.ts';

describe('Prompt Compiler', () => {
  const mockNode: NodeData = {
    id: 'task-101-example-feature',
    type: 'TASK',
    title: 'Implement Example Feature',
    status: 'READY',
    owner_persona: 'coder',
    filePath: '/repo/.foundry/tasks/task-101-example-feature.md',
    repoPath: '.foundry/tasks/task-101-example-feature.md',
    rawContent: '',
    frontmatter: {},
    body: '## Acceptance Criteria\n- [ ] Implement the feature\n- [ ] Add unit tests\n',
  };

  it('generates branch antigravity/<node-id> and title [<node-id>] <title>', () => {
    const prompt = compileAntigravityPrompt(mockNode);
    expect(prompt).toContain('antigravity/task-101-example-feature');
    expect(prompt).toContain('[task-101-example-feature] Implement Example Feature');
  });

  it('includes strict No-Ask policy directive and testing requirements', () => {
    const prompt = compileAntigravityPrompt(mockNode);
    expect(prompt).toContain('Strict No-Ask Policy');
    expect(prompt).toContain('pnpm test');
    expect(prompt).toContain('pnpm lint');
    expect(prompt).toContain('@testing-library/*');
  });

  it('includes node body specification', () => {
    const prompt = compileAntigravityPrompt(mockNode);
    expect(prompt).toContain('## Acceptance Criteria');
    expect(prompt).toContain('- [ ] Implement the feature');
  });
});
