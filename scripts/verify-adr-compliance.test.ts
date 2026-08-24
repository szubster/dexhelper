import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { findViolationsInFile } from './verify-adr-compliance.ts';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tempDir = path.join(__dirname, 'temp-test-files');

describe('verify-adr-compliance', () => {
    beforeAll(() => {
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }
    });

    afterAll(() => {
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    });

    it('should identify forbidden classes in string literals', () => {
        const filePath = path.join(tempDir, 'forbidden.tsx');
        fs.writeFileSync(filePath, `
            const className = "rounded-t bg-red-500";
        `);
        const violations = findViolationsInFile(filePath);
        expect(violations).toHaveLength(1);
        expect((violations[0] || {}).class).toBe('rounded-t');
    });

    it('should identify forbidden classes in template literals', () => {
        const filePath = path.join(tempDir, 'template.tsx');
        fs.writeFileSync(filePath, `
            const className = \`rounded-lg \${"var"} rounded-full\`;
        `);
        const violations = findViolationsInFile(filePath);
        expect(violations).toHaveLength(2);
        expect((violations[0] || {}).class).toBe('rounded-lg');
        expect((violations[1] || {}).class).toBe('rounded-full');
    });

    it('should pass compliant classes without errors', () => {
        const filePath = path.join(tempDir, 'compliant.tsx');
        fs.writeFileSync(filePath, `
            const className = "rounded-none border-dashed bg-black";
        `);
        const violations = findViolationsInFile(filePath);
        expect(violations).toHaveLength(0);
    });
});
