import { describe, it, expect, vi, beforeEach } from 'vitest';
import fs from 'node:fs';
import { chromium } from 'playwright';
import { arePlaywrightBrowsersInstalled } from './check-playwright-browsers';

vi.mock('node:fs', () => ({
    default: {
        existsSync: vi.fn<(path: fs.PathLike) => boolean>(),
    },
}));

vi.mock('playwright', () => ({
    chromium: {
        executablePath: vi.fn<() => string>(),
    },
}));

describe('arePlaywrightBrowsersInstalled', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return true if the executable path exists', () => {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const mockExecutablePath = vi.mocked(chromium.executablePath);
        mockExecutablePath.mockReturnValue('/path/to/chromium');

        // eslint-disable-next-line @typescript-eslint/unbound-method
        const mockExistsSync = vi.mocked(fs.existsSync);
        mockExistsSync.mockReturnValue(true);

        const result = arePlaywrightBrowsersInstalled();

        expect(result).toBe(true);
        expect(mockExecutablePath).toHaveBeenCalledOnce();
        expect(mockExistsSync).toHaveBeenCalledWith('/path/to/chromium');
    });

    it('should return false if the executable path does not exist', () => {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const mockExecutablePath = vi.mocked(chromium.executablePath);
        mockExecutablePath.mockReturnValue('/path/to/chromium');

        // eslint-disable-next-line @typescript-eslint/unbound-method
        const mockExistsSync = vi.mocked(fs.existsSync);
        mockExistsSync.mockReturnValue(false);

        const result = arePlaywrightBrowsersInstalled();

        expect(result).toBe(false);
        expect(mockExecutablePath).toHaveBeenCalledOnce();
        expect(mockExistsSync).toHaveBeenCalledWith('/path/to/chromium');
    });

    it('should return false if executablePath throws an error', () => {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const mockExecutablePath = vi.mocked(chromium.executablePath);
        mockExecutablePath.mockImplementation(() => {
            throw new Error('Executable not found');
        });

        // eslint-disable-next-line @typescript-eslint/unbound-method
        const mockExistsSync = vi.mocked(fs.existsSync);

        const result = arePlaywrightBrowsersInstalled();

        expect(result).toBe(false);
        expect(mockExecutablePath).toHaveBeenCalledOnce();
        expect(mockExistsSync).not.toHaveBeenCalled();
    });
});
