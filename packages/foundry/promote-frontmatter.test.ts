import * as fs from 'node:fs';
import * as path from 'node:path';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { execSync } from 'node:child_process';
import { WIP_DRAFT_BANNER } from './utils/banner.ts';

describe('promote-frontmatter.ts CLI script', () => {
  const tempFilePath = path.join(__dirname, 'temp-test-file.md');

  beforeEach(() => {
    fs.writeFileSync(tempFilePath, `---\nid: my-node\nstatus: DRAFT\ntype: PRD\n---\n# Content`, 'utf-8');
  });

  afterEach(() => {
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  });

  it('updates the frontmatter status when given valid arguments', () => {
    execSync(`node --experimental-strip-types promote-frontmatter.ts ${tempFilePath} STABLE`, { cwd: __dirname });
    const content = fs.readFileSync(tempFilePath, 'utf-8');
    expect(content).toContain('status: STABLE');
  });

  it('exits with error if arguments are missing', () => {
      let err;
      try {
          execSync(`node --experimental-strip-types promote-frontmatter.ts`, { cwd: __dirname, stdio: 'pipe' });
      } catch (e: any) {
          err = e;
      }
      expect(err).toBeDefined();
      expect(err.status).toBe(1);
      expect(err.stderr.toString()).toContain('Usage:');
  });

  it('exits with error if file does not exist', () => {
      let err;
      try {
          execSync(`node --experimental-strip-types promote-frontmatter.ts non-existent-file.md STABLE`, { cwd: __dirname, stdio: 'pipe' });
      } catch (e: any) {
          err = e;
      }
      expect(err).toBeDefined();
      expect(err.status).toBe(1);
      expect(err.stderr.toString()).toContain('File not found');
  });

  it('handles files with missing status frontmatter field', () => {
    fs.writeFileSync(tempFilePath, `---\nid: my-node\ntype: PRD\n---\n# Content`, 'utf-8');
    execSync(`node --experimental-strip-types promote-frontmatter.ts ${tempFilePath} STABLE`, { cwd: __dirname });
    const content = fs.readFileSync(tempFilePath, 'utf-8');
    // As implemented, replaceFrontmatterStatus just returns the original if not found.
    // So the content should remain unchanged, script succeeds.
    expect(content).not.toContain('status: STABLE');
    expect(content).toContain('type: PRD');
  });

  it('adds WIP banner when promoting to WIP or DRAFT', () => {
    fs.writeFileSync(tempFilePath, `---\nid: my-node\nstatus: READY\ntype: PRD\n---\n# Content`, 'utf-8');
    execSync(`node --experimental-strip-types promote-frontmatter.ts ${tempFilePath} DRAFT`, { cwd: __dirname });
    const content = fs.readFileSync(tempFilePath, 'utf-8');
    expect(content).toContain('status: DRAFT');
    expect(content).toContain(WIP_DRAFT_BANNER);
  });

  it('removes WIP banner when promoting to STABLE or READY', () => {
    fs.writeFileSync(tempFilePath, `---\nid: my-node\nstatus: DRAFT\ntype: PRD\n---\n${WIP_DRAFT_BANNER}\n\n# Content`, 'utf-8');
    execSync(`node --experimental-strip-types promote-frontmatter.ts ${tempFilePath} STABLE`, { cwd: __dirname });
    const content = fs.readFileSync(tempFilePath, 'utf-8');
    expect(content).toContain('status: STABLE');
    expect(content).not.toContain(WIP_DRAFT_BANNER);
    expect(content).toContain('# Content');
  });
});
