import * as fs from 'node:fs';
import * as path from 'node:path';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { execSync } from 'node:child_process';

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
});
