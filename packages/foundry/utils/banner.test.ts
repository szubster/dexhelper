import { describe, it, expect } from 'vitest';
import { WIP_DRAFT_BANNER, removeWipBanner } from './banner';

describe('WIP_DRAFT_BANNER', () => {
  it('should be the correct string', () => {
    expect(WIP_DRAFT_BANNER).toBe('> ⚠️ **WORK IN PROGRESS / DRAFT**');
  });
});

describe('removeWipBanner', () => {
  it('should remove the WIP banner from the content', () => {
    const content = `> ⚠️ **WORK IN PROGRESS / DRAFT**\n\n# Document Title\nSome content.`;
    const result = removeWipBanner(content);
    expect(result).toBe(`# Document Title\nSome content.`);
  });

  it('should remove the WIP banner with extra spaces', () => {
    const content = `>   ⚠️ **WORK IN PROGRESS / DRAFT**  \n# Title`;
    const result = removeWipBanner(content);
    expect(result).toBe(`# Title`);
  });

  it('should return original content if no banner is present', () => {
    const content = `# Document Title\nSome content.`;
    const result = removeWipBanner(content);
    expect(result).toBe(content);
  });
});
