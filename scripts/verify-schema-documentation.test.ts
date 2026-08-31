import { describe, it, expect, vi } from 'vitest';
import * as fs from 'node:fs';
import { checkSchemaDocumentation } from './verify-schema-documentation.js';

vi.mock('node:fs');

describe('verify-schema-documentation', () => {
    it('should return true when all required patterns are found', () => {
        vi.spyOn(fs, 'readFileSync').mockReturnValue(`
            Some content.
            16. Orchestrator Safeguard (E2E/Integration Requirement): When breaking down Epics, generative personas must ensure every EPIC generates a final STORY dedicated exclusively to Integration and E2E Verification (tagged with \`e2e\` or \`integration\`), even for documentation-focused Epics. An EPIC cannot be COMPLETED without it.
            More content.
        `);

        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        expect(checkSchemaDocumentation()).toBe(true);
        expect(consoleErrorSpy).not.toHaveBeenCalled();

        consoleErrorSpy.mockRestore();
    });

    it('should return false and log error when a pattern is missing', () => {
        vi.spyOn(fs, 'readFileSync').mockReturnValue(`
            Some content.
            16. Orchestrator Safeguard (E2E/Integration Requirement): When breaking down Epics.
            More content.
        `);

        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        expect(checkSchemaDocumentation()).toBe(false);
        expect(consoleErrorSpy).toHaveBeenCalled();

        consoleErrorSpy.mockRestore();
    });
});
