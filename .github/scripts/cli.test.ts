import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import { processFiles, main } from './cli.js';

// Setup mock
vi.mock('node:fs', () => {
  return {
    default: {
      readdirSync: vi.fn<any>(),
      statSync: vi.fn<any>(),
      readFileSync: vi.fn<any>(),
      writeFileSync: vi.fn<any>(),
      existsSync: vi.fn<any>(),
    },
  };
});

describe('CLI Implementation', () => {
  let mockExit: any;
  let mockConsoleError: any;
  let mockConsoleLog: any;

  beforeEach(() => {
    // We isolate process.argv and exits for testing main() flow
    mockExit = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);
    mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('main: should log error and exit if no directory provided', () => {
    main(['node', 'cli.ts']);
    expect(mockConsoleError).toHaveBeenCalledWith('Usage: tsx cli.ts <directory>');
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('main: should log error and exit if directory does not exist', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);
    main(['node', 'cli.ts', 'fake-dir']);
    expect(mockConsoleError).toHaveBeenCalledWith(expect.stringContaining('Directory not found:'));
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('main: should call processFiles if directory exists', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readdirSync).mockReturnValue([]);
    main(['node', 'cli.ts', 'real-dir']);
    expect(fs.readdirSync).toHaveBeenCalled();
  });

  it('processFiles: should process files and remove banner', () => {
    vi.mocked(fs.readdirSync).mockReturnValue(['test.md' as any, 'other.txt' as any]);
    vi.mocked(fs.statSync).mockImplementation(() => ({
      isDirectory: () => false,
    } as any));

    vi.mocked(fs.readFileSync).mockImplementation((filePath: any) => {
      if (filePath.endsWith('test.md')) {
        return '> ⚠️ **WORK IN PROGRESS / DRAFT**\n# Hello';
      }
      return '';
    });

    processFiles('some-dir');

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining('test.md'),
      '# Hello',
      'utf-8'
    );
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Updated'));
  });

  it('processFiles: should not overwrite if no banner present', () => {
    vi.mocked(fs.readdirSync).mockReturnValue(['clean.md' as any]);
    vi.mocked(fs.statSync).mockImplementation(() => ({
      isDirectory: () => false,
    } as any));

    vi.mocked(fs.readFileSync).mockReturnValue('# Hello');

    processFiles('some-dir');

    expect(fs.writeFileSync).not.toHaveBeenCalled();
    expect(mockConsoleLog).not.toHaveBeenCalled();
  });

  it('processFiles: should recurse into subdirectories', () => {
    vi.mocked(fs.readdirSync).mockImplementation((dirPath: any) => {
      if (dirPath === 'root-dir') return ['sub-dir' as any];
      if (dirPath.endsWith('sub-dir')) return ['file.md' as any];
      return [];
    });
    vi.mocked(fs.statSync).mockImplementation((filePath: any) => ({
      isDirectory: () => filePath.endsWith('sub-dir'),
    } as any));

    vi.mocked(fs.readFileSync).mockReturnValue('# Hello');

    processFiles('root-dir');

    expect(fs.readdirSync).toHaveBeenCalledTimes(2);
    expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining('file.md'), 'utf-8');
  });
});
