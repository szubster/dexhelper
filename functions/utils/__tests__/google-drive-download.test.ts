import { describe, it, expect, vi, beforeEach } from 'vitest';
import { downloadFileFromGoogleDrive } from '../google-drive-download';
import { getGoogleDriveAccessToken } from '../google-drive-auth';
import type { Env } from '../../types/env';

vi.mock('../google-drive-auth', () => ({
  getGoogleDriveAccessToken: vi.fn<() => Promise<string>>(),
}));

describe('downloadFileFromGoogleDrive', () => {
  let mockEnv: Env;

  beforeEach(() => {
    vi.clearAllMocks();
    mockEnv = {
      ASSETS: {} as any,
      GOOGLE_DRIVE_CLIENT_ID: 'test-client-id',
      GOOGLE_DRIVE_CLIENT_SECRET: 'test-client-secret',
      GOOGLE_DRIVE_REFRESH_TOKEN: 'test-refresh-token',
      SAVES_BUCKET: {} as any, // Mock as needed
      GOOGLE_DRIVE_WEBHOOK_SECRET: 'test-secret',
    };

    global.fetch = vi.fn<typeof fetch>() as unknown as typeof fetch;
  });

  it('should download a file successfully', async () => {
    const mockToken = 'mock-access-token';
    vi.mocked(getGoogleDriveAccessToken).mockResolvedValueOnce(mockToken);

    const mockArrayBuffer = new ArrayBuffer(8);
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      arrayBuffer: async () => mockArrayBuffer,
    });

    const fileId = 'test-file-id';
    const result = await downloadFileFromGoogleDrive(mockEnv, fileId);

    expect(getGoogleDriveAccessToken).toHaveBeenCalledWith(mockEnv);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${mockToken}`,
        },
      }
    );
    expect(result).toBe(mockArrayBuffer);
  });

  it('should throw an error if the download fails', async () => {
    const mockToken = 'mock-access-token';
    vi.mocked(getGoogleDriveAccessToken).mockResolvedValueOnce(mockToken);

    const errorMessage = 'Not Found';
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 404,
      text: async () => errorMessage,
    });

    const fileId = 'test-file-id';
    await expect(downloadFileFromGoogleDrive(mockEnv, fileId)).rejects.toThrow(
      `Failed to download file from Google Drive: 404 ${errorMessage}`
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
