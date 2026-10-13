import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'node:child_process';
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const tempFoundryDir = join(__dirname, '.foundry');
const tempTasksDir = join(tempFoundryDir, 'tasks');

const getFrontmatter = (id: string) => `---
id: ${id}
type: TASK
title: Test Node
status: READY
owner_persona: coder
created_at: '2026-09-12'
updated_at: '2026-09-20'
depends_on: []
jules_session_id: null
rejection_reason: ''
---
`;

describe('validate-foundry-schema - Checkbox formatting', () => {
    beforeAll(() => {
        if (!existsSync(tempTasksDir)) {
            mkdirSync(tempTasksDir, { recursive: true });
        }
    });

    afterAll(() => {
        if (existsSync(tempFoundryDir)) {
            rmSync(tempFoundryDir, { recursive: true, force: true });
        }
    });

    const runValidation = (filePath: string) => {
        return execSync(`node --experimental-strip-types scripts/validate-foundry-schema.ts ${filePath}`, { encoding: 'utf-8' });
    };

    it('should pass with valid checkbox syntax', () => {
        expect.hasAssertions();
        const id = 'task-000-111-valid-checkbox';
        const filePath = join(tempTasksDir, `${id}.md`);
        writeFileSync(filePath, `${getFrontmatter(id)}\n- [ ] Unchecked\n- [x] Checked\n- [ ] `);

        let output = '';
        let error: Error | null = null;
        try {
            output = runValidation(filePath);
        } catch (e: any) {
            error = e;
        }

        expect(error).toBeNull();
        expect(output).toContain('All Foundry nodes passed schema validation.');
    });

    it('should fail with invalid checkbox syntax missing space', () => {
        expect.hasAssertions();
        const id = 'task-000-112-invalid-no-space';
        const filePath = join(tempTasksDir, `${id}.md`);
        writeFileSync(filePath, `${getFrontmatter(id)}\n-[] Invalid`);

        let errorOutput = '';
        let hasThrown = false;
        try {
            runValidation(filePath);
        } catch (e: any) {
            hasThrown = true;
            errorOutput = e.stdout || e.stderr || e.message;
        }

        expect(hasThrown).toBe(true);
        expect(errorOutput).toContain('Error: Invalid checkbox syntax in file');
    });

    it('should fail with invalid checkbox syntax using asterisk', () => {
        expect.hasAssertions();
        const id = 'task-000-113-invalid-asterisk';
        const filePath = join(tempTasksDir, `${id}.md`);
        writeFileSync(filePath, `${getFrontmatter(id)}\n* [ ] Invalid`);

        let errorOutput = '';
        let hasThrown = false;
        try {
            runValidation(filePath);
        } catch (e: any) {
            hasThrown = true;
            errorOutput = e.stdout || e.stderr || e.message;
        }

        expect(hasThrown).toBe(true);
        expect(errorOutput).toContain('Error: Invalid checkbox syntax in file');
    });

    it('should fail with invalid checkbox syntax using uppercase X', () => {
        expect.hasAssertions();
        const id = 'task-000-114-invalid-uppercase-x';
        const filePath = join(tempTasksDir, `${id}.md`);
        writeFileSync(filePath, `${getFrontmatter(id)}\n- [X] Invalid`);

        let errorOutput = '';
        let hasThrown = false;
        try {
            runValidation(filePath);
        } catch (e: any) {
            hasThrown = true;
            errorOutput = e.stdout || e.stderr || e.message;
        }

        expect(hasThrown).toBe(true);
        expect(errorOutput).toContain('Error: Invalid checkbox syntax in file');
    });

    it('should fail with missing trailing space after bracket', () => {
        expect.hasAssertions();
        const id = 'task-000-115-invalid-missing-trailing-space';
        const filePath = join(tempTasksDir, `${id}.md`);
        writeFileSync(filePath, `${getFrontmatter(id)}\n- [ ]Invalid`);

        let errorOutput = '';
        let hasThrown = false;
        try {
            runValidation(filePath);
        } catch (e: any) {
            hasThrown = true;
            errorOutput = e.stdout || e.stderr || e.message;
        }

        expect(hasThrown).toBe(true);
        expect(errorOutput).toContain('Error: Invalid checkbox syntax in file');
    });
});


describe('validate-foundry-schema - confidence_score formatting', () => {
    beforeAll(() => {
        if (!existsSync(tempTasksDir)) {
            mkdirSync(tempTasksDir, { recursive: true });
        }
    });

    afterAll(() => {
        if (existsSync(tempFoundryDir)) {
            rmSync(tempFoundryDir, { recursive: true, force: true });
        }
    });

    const runValidation = (filePath: string) => {
        return execSync(`node --experimental-strip-types scripts/validate-foundry-schema.ts ${filePath}`, { encoding: 'utf-8' });
    };

    it('should pass with valid confidence_score', () => {
        expect.hasAssertions();
        const id = 'task-000-116-valid-confidence';
        const filePath = join(tempTasksDir, `${id}.md`);
        writeFileSync(filePath, `${getFrontmatter(id).replace("rejection_reason: ''", "rejection_reason: ''\nconfidence_score: 80")}\n- [ ] Unchecked`);

        let output = '';
        let error: Error | null = null;
        try {
            output = runValidation(filePath);
        } catch (e: any) {
            error = e;
        }

        expect(error).toBeNull();
        expect(output).toContain('All Foundry nodes passed schema validation.');
    });

    it('should pass with valid confidence_score 0', () => {
        expect.hasAssertions();
        const id = 'task-000-117-valid-confidence-0';
        const filePath = join(tempTasksDir, `${id}.md`);
        writeFileSync(filePath, `${getFrontmatter(id).replace("rejection_reason: ''", "rejection_reason: ''\nconfidence_score: 0")}\n- [ ] Unchecked`);

        let output = '';
        let error: Error | null = null;
        try {
            output = runValidation(filePath);
        } catch (e: any) {
            error = e;
        }

        expect(error).toBeNull();
        expect(output).toContain('All Foundry nodes passed schema validation.');
    });

    it('should pass with valid confidence_score 100', () => {
        expect.hasAssertions();
        const id = 'task-000-118-valid-confidence-100';
        const filePath = join(tempTasksDir, `${id}.md`);
        writeFileSync(filePath, `${getFrontmatter(id).replace("rejection_reason: ''", "rejection_reason: ''\nconfidence_score: 100")}\n- [ ] Unchecked`);

        let output = '';
        let error: Error | null = null;
        try {
            output = runValidation(filePath);
        } catch (e: any) {
            error = e;
        }

        expect(error).toBeNull();
        expect(output).toContain('All Foundry nodes passed schema validation.');
    });

    it('should fail with out of bounds negative confidence_score', () => {
        expect.hasAssertions();
        const id = 'task-000-119-invalid-confidence-neg';
        const filePath = join(tempTasksDir, `${id}.md`);
        writeFileSync(filePath, `${getFrontmatter(id).replace("rejection_reason: ''", "rejection_reason: ''\nconfidence_score: -5")}\n- [ ] Unchecked`);

        let errorOutput = '';
        let hasThrown = false;
        try {
            runValidation(filePath);
        } catch (e: any) {
            hasThrown = true;
            errorOutput = e.stdout || e.stderr || e.message;
        }

        expect(hasThrown).toBe(true);
        expect(errorOutput).toContain('Error: Invalid confidence_score');
    });

    it('should fail with out of bounds > 100 confidence_score', () => {
        expect.hasAssertions();
        const id = 'task-000-120-invalid-confidence-high';
        const filePath = join(tempTasksDir, `${id}.md`);
        writeFileSync(filePath, `${getFrontmatter(id).replace("rejection_reason: ''", "rejection_reason: ''\nconfidence_score: 105")}\n- [ ] Unchecked`);

        let errorOutput = '';
        let hasThrown = false;
        try {
            runValidation(filePath);
        } catch (e: any) {
            hasThrown = true;
            errorOutput = e.stdout || e.stderr || e.message;
        }

        expect(hasThrown).toBe(true);
        expect(errorOutput).toContain('Error: Invalid confidence_score');
    });

    it('should fail with non-integer confidence_score', () => {
        expect.hasAssertions();
        const id = 'task-000-121-invalid-confidence-float';
        const filePath = join(tempTasksDir, `${id}.md`);
        writeFileSync(filePath, `${getFrontmatter(id).replace("rejection_reason: ''", "rejection_reason: ''\nconfidence_score: 85.5")}\n- [ ] Unchecked`);

        let errorOutput = '';
        let hasThrown = false;
        try {
            runValidation(filePath);
        } catch (e: any) {
            hasThrown = true;
            errorOutput = e.stdout || e.stderr || e.message;
        }

        expect(hasThrown).toBe(true);
        expect(errorOutput).toContain('Error: Invalid confidence_score');
    });
});
