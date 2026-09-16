import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Feature Flag CLI Tool', () => {
    let tempDir: string;

    beforeEach(() => {
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ff-cli-test-'));
    });

    afterEach(() => {
        fs.rmSync(tempDir, { recursive: true, force: true });
    });

    const runCli = (args: string[]) => {
        return execSync(`node --experimental-strip-types scripts/feature-flags/cli.ts ${args.join(' ')}`, {
            encoding: 'utf-8',
            cwd: process.cwd()
        });
    };

    it('should list feature flags', () => {
        const filePath = path.join(tempDir, 'test1.ts');
        fs.writeFileSync(filePath, `
            if (flags.TEST_FLAG_1) { console.log('1'); }
            if (flags.TEST_FLAG_2) { console.log('2'); }
        `);

        const output = runCli(['list', filePath]);

        expect(output).toContain('TEST_FLAG_1');
        expect(output).toContain('TEST_FLAG_2');
    });

    it('should graduate a feature flag', () => {
        const filePath = path.join(tempDir, 'test2.ts');
        fs.writeFileSync(filePath, `
            if (flags.TEST_FLAG_TO_GRADUATE) {
                console.log('graduated');
            } else {
                console.log('removed');
            }
        `);

        const output = runCli(['graduate', 'TEST_FLAG_TO_GRADUATE', filePath]);

        expect(output).toContain(`Graduated flag "TEST_FLAG_TO_GRADUATE"`);

        const modifiedContent = fs.readFileSync(filePath, 'utf-8');
        expect(modifiedContent).toContain("console.log('graduated');");
        expect(modifiedContent).not.toContain("console.log('removed');");
        expect(modifiedContent).not.toContain("flags.TEST_FLAG_TO_GRADUATE");
    });
});
